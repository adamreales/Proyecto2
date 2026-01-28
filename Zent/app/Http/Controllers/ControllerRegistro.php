<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\VerificacionMail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ControllerRegistro extends Controller
{

    public function registro(Request $r){
        $existe = User::where('email',$r->email)->exists();
        if($existe){
            return response()->json([
                'error' => 'Ya existe este email'
            ],409);
        }
        if($r->password != $r->conf_password){
            return response()->json([
                'error' => 'Las contraseñas no coinciden'
            ],400);
        }
        if(strlen($r->name) <= 2){
            return response()->json([
                'error' => 'El nombre no tiene mas de 2 caracteres'  
            ],400);
        }
        
        $usu = [
            'name' => $r->name,
            'email' => $r->email,
            'password' => Hash::make($r->password),
        ];

        $user = User::create($usu);
        $token = $user->createToken('usuario_registro')->plainTextToken;

        Mail::to($r->email)->send(new VerificacionMail($user->name,$user->id));

        return response()->json([
            'registro' => 'Registro enviado correctamente. Revisa tu correo',
            'token' => $token
        ],201);

    }

    public function validar_usuario($id_usuario){
        $usu = User::find($id_usuario);
        $usu->validado = 1;
        $usu->save();
        return redirect('/registro')->withErrors([
            'registro' => 'Usuario validado correctamente'
        ]);
    }

}
