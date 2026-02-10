<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categoria;

class ControllerCategoria extends Controller
{
    public function categorias(){
        $cats = Categoria::with('doProductos')->get();

        if($cats === null){
            return response()->json([
                'error' => 'Error al encontrar las categorias'
            ],404);
        }

        return response()->json([
            'categorias' => $cats
        ]);
    }

    public function categoria($id_categoria){
        $cat = Categoria::with('doProductos')->where('id',$id_categoria)->get();

        if($cat === null){
            return response()->json([
                'error' => 'Categoria no encontrada'
            ],404);
        }

        return response()->json([
            'categoria' => $cat
        ]);
    }

}
