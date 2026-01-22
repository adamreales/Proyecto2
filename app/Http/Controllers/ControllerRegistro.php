<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Mail\VerificacionMail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ControllerRegistro extends Controller
{
    public function registro(){
        return view('registro');
    }

    public function doRegistro(Request $r){
        $existe = Usuario::where('correo',$r->email)->exists();
        if($existe){
            return back()->withErrors([
                'registro' => 'Ya existe este email'
            ]);
        }
        if($r->contra != $r->conf_contra){
            return back()->withErrors([
                'registro' => 'Las contraseñas no coinciden'
            ]);
        }
        if(strlen($r->nombre) <= 2){
            return back()->withErrors([
                'registro' => 'El nombre no tiene mas de 2 caracteres'
            ]);
        }
        if(strlen($r->apellido1) <= 2){
            return back()->withErrors([
                'registro' => 'El apellido 1 no tiene mas de 2 caracteres'
            ]);
        }
        if(strlen($r->apellido2) <= 2){
            return back()->withErrors([
                'registro' => 'El apellido 2 no tiene mas de 2 caracteres'
            ]);
        }
        
        $usu = [
            'nombre' => $r->nombre,
            'apellido1' => $r->apellido1,
            'apellido2' => $r->apellido2,
            'correo' => $r->email,
            'fecha_nacimiento' => $r->fecha_nacimiento,
            'contrasena' => Hash::make($r->contra),
            'validado' => 0
        ];

        Usuario::insert($usu);
        $usu_bd = Usuario::where('correo',$r->email)->first();

        Mail::to($r->email)->send(new VerificacionMail($r->nombre,$usu_bd->id));

        return back()->withErrors([
            'registro' => 'Registro enviado correctamente. Revisa tu correo'
        ]);

    }

    public function validar_usuario($id_usuario){
        $usu = Usuario::find($id_usuario);
        $usu->validado = 1;
        $usu->save();
        return redirect('/registro')->withErrors([
            'registro' => 'Usuario validado correctamente'
        ]);
    }

}
