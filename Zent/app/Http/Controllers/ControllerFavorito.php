<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControllerFavorito extends Controller
{

    public function anadir_favorito(Request $request)
    {
        var_dump($request->producto_id);
        if($request->has('producto_id')) {

            DB::beginTransaction();

            $producto_id = $request->producto_id;
            $user_id = auth()->id();

            $favorito = Favorito::where([
                'user_id' => $user_id,
                'producto_id' => $producto_id,
            ])->first();

            if ($favorito) {
                $favorito->delete();
                DB::commit();
                return response()->json([
                    'message' => 'Producto eliminado de favoritos'
                ]);
            }

            Favorito::create([
                'user_id' => $user_id,
                'producto_id' => $producto_id,
            ]);


            DB::commit();

        } else {
            return response()->json(['message' => 'ID del producto no proporcionado'], 400);
        }
    }

}
