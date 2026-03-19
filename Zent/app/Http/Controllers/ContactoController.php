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

        Mail::to($request->email)->send(new ContactoMail($request->email));

        return response()->json([
            'msg' => 'Correo enviado correctamente'
        ]);
    }
}
