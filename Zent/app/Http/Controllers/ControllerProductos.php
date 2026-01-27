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

        return response()->json([
            'productos' => $productos
        ]);
    }

    public function producto($id){
        $producto = Producto::find($id);

        if($producto.exists() == false){
            return response()->json([
                'error' => 'Producto no encontrado' 
            ]);
        }

        return response()->json([
            'producto' => $producto
        ]);

    }

}

