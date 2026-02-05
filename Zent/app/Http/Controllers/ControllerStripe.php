<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class ControllerStripe extends Controller
{
    public function crear_pago(Request $r){

        try{
            if($r->precio <= 0){
                throw new \Exception('Error de precio tiene que ser superior a 0');
            }
            if (!in_array($r->moneda, ['eur', 'usd'])){
                throw new \Exception('Error de moneda no valida');
            }

            Stripe::setApiKey(config('services.stripe.secret'));

            $intento_pago = PaymentIntent::create([
                'amount' => $r->precio,
                'currency' => $r->moneda,
                'payment_method_types' => ['card'],
            ]);

            return response()->json([
                'cliente_secreto' => $intento_pago->client_secret,
                'intento_pago_id' => $intento_pago->id,
            ]);

        }catch(\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }

    }
}
