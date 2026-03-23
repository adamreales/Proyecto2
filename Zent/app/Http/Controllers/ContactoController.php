<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactoMail;
class ContactoController extends Controller
{
    public function enviar(Request $request){
        $request->validate([
            'email' => 'required|email'
        ]);

        try {
            Mail::to($request->email)->send(new ContactoMail($request->email));
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'No se pudo enviar el correo: ' . $e->getMessage()
            ], 500);
        }

        return response()->json([
            'msg' => 'Correo enviado correctamente'
        ]);
    }
}
