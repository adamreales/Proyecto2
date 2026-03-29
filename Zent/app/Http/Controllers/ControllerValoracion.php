<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PlataformaProducto;
use App\Models\User;
use App\Models\Valoracion;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ControllerValoracion extends Controller
{
    public function anadir_valoracion(Request $r){

        if(!$r->has(['id_producto','estrellas','comentario'])){
            return response()->json([
                'error' => 'Faltan campos en el envio (id_producto, estrellas y id_usuario)'
            ],400);
        }

        $pp = PlataformaProducto::find($r->id_producto);

        if(!$pp){
            return response()->json([
                'error' => 'No existe el id_producto'
            ],400);
        }

        $usu = User::find($r->id_usuario);

        if(!$usu){
            return response()->json([
                'error' => 'No existe el id_usuario'
            ],400);
        }

        if(!($r->estrellas >= 1 && $r->estrellas <= 5)){
            return response()->json([
                'error' => 'Estrellas tiene que ser entre 1-5'
            ],400);
        }

        if(!(Str::length($r->comentario) >= 0 && Str::length($r->comentario) <= 255)){
            return response()->json([
                'error' => 'Comentario tiene que tener una longitud de 0-255 caracteres'
            ],400);
        }

        $existe = Valoracion::where('id_usuario', auth()->id())
            ->where('id_producto_plataforma', $r->id_producto_plataforma)
            ->exists();

        if($existe){
            return response()->json([
                'error' => 'Ya has valorado este producto'
            ], 400);
        }

        Valoracion::create([
            'estrellas' => (int)$r->estrellas,
            'id_usuario' => auth()->id(),
            'id_producto' => $r->id_producto,
            'comentario' => $r->comentario
        ]);

        return response()->json([
            'msg' => 'Comentario anadido correctamente' 
        ],200);

    }
}
