<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\CarritoProducto;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ControllerLogin extends Controller
{
    function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        $sessionId = $request->header('X-Session-Id');

        if ($sessionId) {

            DB::transaction(function () use ($sessionId, $user) {

                $carritoInvitado = Carrito::where('session_id', $sessionId)
                    ->where('estado','Activo')
                    ->lockForUpdate()
                    ->first();

                if (!$carritoInvitado) return;

                $carritoUsuario = Carrito::where('id_usuario', $user->id)
                    ->where('estado','Activo')
                    ->lockForUpdate()
                    ->first();

                if (!$carritoUsuario) {

                    $carritoInvitado->update([
                        'id_usuario' => $user->id,
                        'session_id' => null
                    ]);

                    return;
                }

                // si ambos tienen carrito → combinar productos
                $itemsInvitado = CarritoProducto::where('id_carrito', $carritoInvitado->id)->get();

                foreach ($itemsInvitado as $itemInv) {

                    $itemUsuario = CarritoProducto::where('id_carrito', $carritoUsuario->id)
                        ->where('id_producto', $itemInv->id_producto)
                        ->first();

                    if ($itemUsuario) {
                        $itemUsuario->cantidad += $itemInv->cantidad;
                        $itemUsuario->save();
                    } else {
                        $itemInv->id_carrito = $carritoUsuario->id;
                        $itemInv->save();
                    }
                }

                $carritoInvitado->delete();
            });
        }

        $token = $user->createToken('token_session')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    function perfil(Request $r){

        if(!$r->user()){
            return response()->json([
                'error' => 'Error al devolver el usuario'
            ],401);
        }

        return response()->json([
            'user' => $r->user()
        ]);

    }

    function cerrar_session(Request $r){

        if(!$r->user()){
            return response()->json([
                'error' => 'Error no existe el usuario'
            ],401);
        }

        $r->user()->currentAccessToken()->delete();
        return response()->json([
            'msg' => 'Session Cerrada'
        ],200);
    }

}
