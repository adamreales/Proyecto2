<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;

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
        if(strlen($r->nombre) <= 2 || strlen($r->apellido1) <= 2 || strlen($r->apellido2) <= 2){
            return back()->withErrors([
                'registro' => 'El nombre, apellido1 y apellido2 alguno de los 3 no tiene mas de 2 caracteres'
            ]);
        }
        dd($r);
    }
}
