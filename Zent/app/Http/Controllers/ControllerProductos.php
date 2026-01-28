<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;

class ControllerProductos extends Controller
{
    public function productos()
    {
        $productos = Producto::all();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'productos' => $productos
        ]);
    }

    public function producto($id){
        $producto = Producto::find($id);

        if($producto === null){
            return response()->json([
                'error' => 'Producto no encontrado' 
            ],404);
        }

        return response()->json([
            'producto' => $producto
        ]);

    }

}

