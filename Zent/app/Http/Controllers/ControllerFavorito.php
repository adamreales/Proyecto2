<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorito;
use Illuminate\Http\Request;

class ControllerFavorito extends Controller
{

    public function anadir_favorito(Request $request)
    {
        if($request->has('producto_id')) {
            $producto_id = $request->input('producto_id');
            $user_id = auth()->id();
            $session_id = session()->getId();

            $favorito = Favorito::firstOrCreate(
                [
                    'user_id' => $user_id,
                    'session_id' => $session_id,
                    'producto_id' => $producto_id,
                ]
            );

            if ($favorito->wasRecentlyCreated) {
                return response()->json(['message' => 'Producto añadido a favoritos']);
            } else {
                $favorito->delete();
                return response()->json(['message' => 'Producto eliminado de favoritos']);
            }
        } else {
            return response()->json(['message' => 'ID del producto no proporcionado'], 400);
        }
    }

}
