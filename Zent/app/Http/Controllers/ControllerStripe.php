<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\CarritoProducto;
use App\Models\ClaveProducto;
use App\Models\Factura;
use App\Models\FacturaLinea;
use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Mail\PedidoConfirmadoMail;
use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Services\PedidoService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class ControllerStripe extends Controller
{

    public function preparar_pago(PedidoService $pedidoService){

        try{
            $pedido = $pedidoService->crearPedidoCarrito();
            return response()->json([
                'pedido_id' => $pedido->id,
                'total' => $pedido->total
            ],200);
        }catch(Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ],400);
        }

    }

    public function pagar_pedido($pedidoId){
        try{
            Stripe::setApiKey(config('services.stripe.secret'));

            $pedido = Pedido::find($pedidoId);

            if($pedido === null){
                throw new Exception("Pedido no existe");
            }

            if($pedido->estado !== 'pendiente'){
                throw new Exception("Pedido ya pagado o cancelado");
            }

            // 🔥 coger productos del carrito
            $items = CarritoProducto::with('doPlataformaProducto.doProducto')
                ->where('id_carrito', $pedido->id_carrito)
                ->get();

            if($items->isEmpty()){
                throw new Exception("Carrito vacío");
            }

            $productos = [];

            foreach($items as $item){

                $producto = $item->doPlataformaProducto?->doProducto;

                if(!$producto){
                    throw new Exception("Producto inválido");
                }

                $productos[] = [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => $producto->titulo . ' ' . $item->doPlataformaProducto?->doPlataforma?->nombre,
                        ],
                        'unit_amount' => intval($producto->precio * 100),
                    ],
                    'quantity' => $item->cantidad,
                ];
            }

            $session = Session::create([
                'mode' => 'payment',
                'payment_method_types' => ['card'],
                'line_items' => $productos, // 🔥 ahora sí
                'success_url' => env('FRONT_URL').'/aceptada',
                'cancel_url' => env('FRONT_URL').'/denegada',
                'metadata' => [
                    'pedido_id' => $pedido->id
                ]
            ]);

            $pedido->stripe_session_id = $session->id;
            $pedido->save();

            return response()->json([
                'checkout_url' => $session->url
            ]);

        }catch(Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ],400);
        }
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $signature = $request->header('Stripe-Signature');
        $secret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $signature,
                $secret
            );
        } catch (\Exception $e) {
            Log::error('Stripe signature error: ' . $e->getMessage());
            return response()->json(['error' => 'Invalid signature'], 200);
        }

        if ($event->type === 'checkout.session.completed') {

            $session = $event->data->object;

            try {

                $pedidoId = $session->metadata['pedido_id'] ?? null;

                if (!$pedidoId) {
                    Log::error('Pedido ID no encontrado en metadata', [
                        'metadata' => $session->metadata
                    ]);
                    return response()->json(['status' => 'ok'], 200);
                }

                $correoDestino = null;
                $facturaId = null;

                DB::transaction(function () use ($session, $pedidoId, &$correoDestino, &$facturaId) {

                    $pedido = Pedido::lockForUpdate()->find($pedidoId);

                    if (!$pedido || $pedido->estado !== 'pendiente') {
                        return;
                    }

                    $itemsCarrito = CarritoProducto::with('doPlataformaProducto.doProducto')
                        ->where('id_carrito', $pedido->id_carrito)
                        ->lockForUpdate()
                        ->get();

                    if ($itemsCarrito->isEmpty()) {
                        Log::error("Carrito vacío para pedido {$pedido->id}");
                        return;
                    }

                    foreach ($itemsCarrito as $itemCarrito) {

                        $plataformaProducto = $itemCarrito->doPlataformaProducto;
                        $producto = $plataformaProducto?->doProducto;

                        if (!$plataformaProducto || !$producto) {
                            Log::error("Producto inválido en carrito ID {$itemCarrito->id}");
                            continue;
                        }

                        if ($plataformaProducto->stock < $itemCarrito->cantidad) {
                            Log::error("Stock insuficiente producto {$producto->id}");
                            continue;
                        }

                        // 🔑 obtener claves disponibles
                        $claves = ClaveProducto::where('plataforma_producto_id', $plataformaProducto->id)
                            ->where('vendida', false)
                            ->lockForUpdate()
                            ->limit($itemCarrito->cantidad)
                            ->get();

                        if ($claves->count() < $itemCarrito->cantidad) {
                            Log::error("No hay suficientes claves para producto {$producto->id}");
                            throw new \Exception("No hay suficientes claves");
                        }

                        foreach ($claves as $clave) {

                            // marcar clave como vendida
                            $clave->update(['vendida' => true]);

                            // crear detalle del pedido (1 por clave)
                            PedidoDetalle::create([
                                'id_pedido' => $pedido->id,
                                'id_producto' => $producto->id,
                                'id_clave' => $clave->id,
                                'precio_unitario' => $producto->precio,
                                'cantidad' => 1,
                                'subtotal' => $producto->precio
                            ]);
                        }

                        // actualizar métricas
                        $producto->increment('ventas', $itemCarrito->cantidad);
                        $plataformaProducto->decrement('stock', $itemCarrito->cantidad);
                    }

                    // actualizar pedido
                    $pedido->estado = 'pagado';
                    $pedido->stripe_payment_intent = $session->payment_intent;
                    $pedido->save();

                    // cerrar carrito: si existe restriccion unica, no bloquea la confirmacion del pedido.
                    try {
                        Carrito::where('id', $pedido->id_carrito)
                            ->where('estado', 'Activo')
                            ->update([
                                'estado' => 'Cerrado',
                                // Evita conflicto con unique(id_usuario, activo_unico)
                                // cuando ya existe otro carrito cerrado para el usuario.
                                'id_usuario' => null,
                            ]);
                    } catch (\Throwable $e) {
                        Log::warning("No se pudo cerrar carrito {$pedido->id_carrito}: {$e->getMessage()}");

                        // Fallback: si no se puede cerrar por una restriccion de BD,
                        // vaciamos el carrito para que no siga mostrando productos ya comprados.
                        CarritoProducto::where('id_carrito', $pedido->id_carrito)->delete();
                    }

                    $correoDestino = optional($pedido->doUsuario)->email;

                    if (Schema::hasTable('facturas') && Schema::hasTable('factura_lineas')) {
                        try {
                            $pedido->loadMissing('doDetalles.doProducto');

                            $factura = Factura::where('id_pedido', $pedido->id)->lockForUpdate()->first();

                            if (!$factura) {
                                $total = (float) $pedido->total;
                                $subtotal = round($total / 1.21, 2);
                                $ivaTotal = round($total - $subtotal, 2);

                                $factura = Factura::create([
                                    'id_pedido' => $pedido->id,
                                    'numero_factura' => 'FAC-' . now()->format('Ymd') . '-' . str_pad((string) $pedido->id, 6, '0', STR_PAD_LEFT),
                                    'fecha_emision' => now(),
                                    'subtotal' => $subtotal,
                                    'iva_porcentaje' => 21,
                                    'iva_total' => $ivaTotal,
                                    'total' => $total,
                                ]);

                                foreach ($pedido->doDetalles as $detalle) {
                                    FacturaLinea::create([
                                        'id_factura' => $factura->id,
                                        'nombre_producto' => optional($detalle->doProducto)->titulo ?? 'Producto',
                                        'plataforma' => null,
                                        'cantidad' => 1,
                                        'precio_unitario' => $detalle->precio_unitario,
                                        'total_linea' => $detalle->subtotal,
                                    ]);
                                }
                            }

                            $facturaId = $factura->id;
                        } catch (\Throwable $e) {
                            Log::warning("No se pudo crear factura del pedido {$pedido->id}: {$e->getMessage()}");
                        }
                    } else {
                        Log::warning("Tablas de factura no disponibles para pedido {$pedido->id}. Ejecuta migraciones.");
                    }

                });

                if ($correoDestino) {
                    try {
                        $pedidoMail = Pedido::with([
                            'doUsuario',
                            'doDetalles.doProducto',
                            'doDetalles.doClave',
                            'doDetalles.doPlataformaProducto.doPlataforma'
                        ])->find($pedidoId);
                        if ($pedidoMail) {
                            $pdfContent = null;
                            $pdfFilename = null;

                            if ($facturaId) {
                                $factura = Factura::with(['doPedido.doUsuario', 'doLineas'])->find($facturaId);
                                if ($factura) {
                                    $pdf = $this->generarFacturaPdf($factura);
                                    if ($pdf) {
                                        $pdfContent = $pdf['content'];
                                        $pdfFilename = $pdf['filename'];
                                    }
                                }
                            }

                            Mail::to($correoDestino)->send(new PedidoConfirmadoMail($pedidoMail, $pdfContent, $pdfFilename));

                            if ($facturaId) {
                                Factura::where('id', $facturaId)->update(['enviado_por_email' => true]);
                            }
                        }
                    } catch (\Throwable $e) {
                        Log::warning("No se pudo enviar mail del pedido {$pedidoId}: {$e->getMessage()}");
                    }
                } else {
                    Log::warning("Pedido {$pedidoId} sin email de usuario. Se omite envio de correo.");
                }


            } catch (\Exception $e) {
                Log::error('Stripe webhook error: ' . $e->getMessage());
                return response()->json(['error' => 'fail'], 500);
            }
        }

        return response()->json(['status' => 'ok'], 200);
    }

    private function generarFacturaPdf(Factura $factura): ?array
    {
        try {
            $pdf = Pdf::loadView('factura', [
                'factura' => $factura,
            ]);

            $pdfContent = $pdf->output();
            $pdfFilename = 'factura-' . $factura->numero_factura . '.pdf';
            $pdfPath = 'facturas/' . $pdfFilename;

            Storage::disk('public')->put($pdfPath, $pdfContent);

            $factura->update([
                'pdf_path' => $pdfPath,
            ]);

            return [
                'content' => $pdfContent,
                'filename' => $pdfFilename,
            ];
        } catch (\Throwable $e) {
            Log::warning("No se pudo generar PDF de factura {$factura->id}: {$e->getMessage()}");
            return null;
        }
    }

}
