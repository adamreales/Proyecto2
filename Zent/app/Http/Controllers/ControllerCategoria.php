<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Plataforma;

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
            'msg' => 'Categorias encontradas',
            'categorias' => $cats
        ]);
    }

    public function plataformas(){
        $cats = Plataforma::with('doProductos')->get();

        if($cats === null){
            return response()->json([
                'error' => 'Error al encontrar las plataformas'
            ],404);
        }

        return response()->json([
            'msg' => 'Plataformas encontradas',
            'plataformas' => $cats
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
            'msg' => 'Categoria encontrada',
            'categoria' => $cat
        ]);
    }

}
