<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Usuario;
use Illuminate\Http\Request;

class ControladorPrueba extends Controller
{
    public function index(){
        $productos = Producto::all();
        $usuarios = Usuario::all();
        return view('prueba',[
            'productos' => $productos,
            'usuarios' => $usuarios
        ]);
    }

    // public function visualizacion_portada()
    // {
    //     return view('/portada');
    // }
}
