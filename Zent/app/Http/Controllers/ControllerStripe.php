<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\CarritoProducto;
use App\Models\Pedido;
use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Services\PedidoService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
            $pedido = Pedido::with('doDetalles.doProducto')->find($pedidoId);

            if($pedido === null){
                throw new Exception("Pedido no existe");
            }

            if($pedido->estado !== 'pendiente'){
                throw new Exception("Pedido ya pagado o cancelado");
            }

            $productos = [];

            foreach($pedido->doDetalles as $detalle){
                $productos[] = [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => $detalle->doProducto->titulo,
                        ],
                        'unit_amount' => intval($detalle->precio_unitario * 100),
                    ],
                    'quantity' => $detalle->cantidad,
                ];
            }

            $session = Session::create([
                'mode' => 'payment',
                'payment_method_types' => ['card'],
                'line_items' => $productos,
                'success_url' => env('FRONT_URL').'/aceptada', //pago-exito?session_id={CHECKOUT_SESSION_ID}
                'cancel_url' => env('FRONT_URL').'/denegada', //carrito
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
        } catch (Exception $e) {
            Log::error('Stripe signature error: ' . $e->getMessage());

            return response()->json(['error' => 'Invalid signature'], 200);
            // 👈 IMPORTANTE: 200 SIEMPRE
        }

        if ($event->type === 'checkout.session.completed') {

            $session = $event->data->object;

            try {

                // 🔴 VALIDAR METADATA
                if (!isset($session->metadata->pedido_id)) {
                    Log::error('Pedido ID no encontrado en metadata');
                    return response()->json(['status' => 'ok'], 200);
                }

                $pedidoId = $session->metadata->pedido_id;

                DB::transaction(function () use ($session, $pedidoId) {

                    $pedido = Pedido::lockForUpdate()->find($pedidoId);

                    // 🔴 SI NO EXISTE O YA PAGADO → SALIR LIMPIO
                    if (!$pedido || $pedido->estado !== 'pendiente') {
                        return;
                    }

                    $itemsCarrito = CarritoProducto::with('doPlataformaProducto.doProducto')
                        ->where('id_carrito', $pedido->id_carrito)
                        ->lockForUpdate()
                        ->get();

                    // 🔴 NO ROMPER → SOLO LOG
                    if ($itemsCarrito->isEmpty()) {
                        Log::error("Carrito vacío para pedido {$pedido->id}");
                        return;
                    }

                    foreach ($itemsCarrito as $itemCarrito) {

                        $plataformaProducto = $itemCarrito->doPlataformaProducto;
                        $producto = $plataformaProducto?->doProducto;

                        if (!$plataformaProducto || !$producto) {
                            Log::error("Producto inválido en carrito ID {$itemCarrito->id}");
                            continue; // 👈 NO PETAR
                        }

                        if ($plataformaProducto->stock < $itemCarrito->cantidad) {
                            Log::error("Stock insuficiente producto {$producto->id}");
                            continue; // 👈 NO PETAR
                        }

                        $producto->increment('ventas', $itemCarrito->cantidad);
                        $plataformaProducto->decrement('stock', $itemCarrito->cantidad);
                    }

                    // ✅ MARCAR COMO PAGADO
                    $pedido->estado = 'pagado';
                    $pedido->stripe_payment_intent = $session->payment_intent;
                    $pedido->save();

                    // ✅ CERRAR CARRITO
                    Carrito::where('id', $pedido->id_carrito)
                        ->where('estado', 'Activo')
                        ->update(['estado' => 'Cerrado']);
                });

            } catch (Exception $e) {

                Log::error('Stripe webhook error: ' . $e->getMessage());

                // 👈 CRÍTICO: Stripe NO debe recibir 500
                return response()->json(['status' => 'ok'], 200);
            }
        }

        return response()->json(['status' => 'ok'], 200);
    }
}
