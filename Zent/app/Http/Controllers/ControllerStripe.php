<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Models\Producto;
use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Services\PedidoService;
use Illuminate\Support\Facades\DB;
use Stripe\Webhook;

class ControllerStripe extends Controller
{

    public function preparar_pago(PedidoService $pedidoSercicio){

        try{
            $pedido = $pedidoSercicio->crearPedidoCarrito();
            return response()->json([
                'pedido_id' => $pedido->id,
                'total' => $pedido->total
            ],200);
        }catch(\Exception $e){
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
                throw new \Exception("Pedido no existe");
            }

            if($pedido->estado !== 'pendiente'){
                throw new \Exception("Pedido ya pagado o cancelado");
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
                'success_url' => env('FRONT_URL').'/', //pago-exito?session_id={CHECKOUT_SESSION_ID}
                'cancel_url' => env('FRONT_URL').'/', //carrito
                'metadata' => [
                    'pedido_id' => $pedido->id
                ]
            ]);

            $pedido->stripe_session_id = $session->id;
            $pedido->save();

            return response()->json([
                'checkout_url' => $session->url
            ]);

        }catch(\Exception $e){
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
            $event = Webhook::constructEvent(
                $payload,
                $signature,
                $secret
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Webhook signature invalid'
            ], 400);
        }

        if ($event->type === 'checkout.session.completed') {

            $session = $event->data->object;

            DB::transaction(function () use ($session) {

                $pedidoId = $session->metadata->pedido_id;

                $pedido = Pedido::lockForUpdate()->find($pedidoId);

                if (!$pedido || $pedido->estado !== 'pendiente') {
                    return;
                }

                $detalles = PedidoDetalle::where('id_pedido', $pedido->id)
                    ->lockForUpdate()
                    ->get();

                foreach ($detalles as $detalle) {

                    $producto = Producto::lockForUpdate()->find($detalle->id_producto);

                    if ($producto->stock < $detalle->cantidad) {
                        throw new \Exception("Stock inconsistente");
                    }

                    $producto->ventas += $detalle->cantidad;
                    $producto->stock -= $detalle->cantidad;
                    $producto->save();
                }

                $pedido->estado = 'pagado';
                $pedido->stripe_payment_intent = $session->payment_intent;
                $pedido->save();

                Carrito::where('id', $pedido->id_carrito)
                    ->where('estado', 'Activo')
                    ->update(['estado' => 'Cerrado']);
            });

        }

        return response()->json([
            'status' => 'ok'
        ]);
    }

}
