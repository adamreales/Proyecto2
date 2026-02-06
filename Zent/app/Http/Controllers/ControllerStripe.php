<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class ControllerStripe extends Controller
{
    public function crear_pago(Request $r){

        try{
            if($r->precio <= 0){
                throw new Exception('Error de precio tiene que ser superior a 0');
            }
            if (!in_array($r->moneda, ['eur', 'usd'])){
                throw new Exception('Error de moneda no valida');
            }

            Stripe::setApiKey(config('services.stripe.secret'));

            $session = Session::create([
                'mode' => 'payment',
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => $r->moneda,
                        'product_data' => [
                            'name' => 'Producto de prueba'
                        ],
                        'unit_amount' => intval($r->precio * 100),
                    ],
                    'quantity' => 1,
                ]],
                'success_url' => 'http://localhost:5173/',
                'cancel_url'  => 'http://localhost:5173/',
            ]);

            return response()->json([
                'pago_url' => $session->url
            ]);

        }catch(Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }

    }
}
