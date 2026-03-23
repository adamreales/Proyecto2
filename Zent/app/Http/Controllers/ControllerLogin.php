<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\CarritoProducto;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\RecuperarContraseñaMail;

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

        $r->user()->tokens()->delete();
        return response()->json([
            'msg' => 'Session Cerrada'
        ],200);
    }

    function cambiar_contraseña(Request $request){

        $request->validate([
            'password_actual' => 'required',
            'password_nueva' => 'required|min:8',
            'password_confirmacion' => 'required|same:password_nueva'
        ]);

        $user = $request->user();

        if(!$user){
            return response()->json([
                'error' => 'Usuario no autenticado'
            ], 401);
        }

        if(!Hash::check($request->password_actual, $user->password)){
            return response()->json([
                'error' => 'Contraseña actual incorrecta'
            ], 401);
        }

        $user->password = Hash::make($request->password_nueva);
        $user->save();

        return response()->json([
            'msg' => 'Contraseña actualizada correctamente'
        ], 200);
    }

    function solicitar_recuperacion_contraseña(Request $request){

        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user){
            // Por seguridad no revelar si el email existe
            return response()->json([
                'msg' => 'Si el email existe, recibirás un correo de recuperación'
            ], 200);
        }

        // Generar un token único
        $token = Str::random(64);

        // Guardar el token en la tabla password_resets
        DB::table('password_resets')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($token),
                'created_at' => now()
            ]
        );

        // Enviar el correo con destinatario explicito
        try {
            Mail::to($user->email)->send(new RecuperarContraseñaMail($user->email, $token));
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al enviar el correo: ' . $e->getMessage()
            ], 500);
        }

        return response()->json([
            'msg' => 'Se ha enviado un correo con instrucciones para recuperar tu contraseña'
        ], 200);
    }

    function validar_y_reset_contraseña(Request $request){

        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password'
        ]);

        // Buscar el token
        $resetRecord = DB::table('password_resets')->where('email', $request->email)->first();

        if(!$resetRecord){
            return response()->json([
                'error' => 'Token no válido o expirado'
            ], 401);
        }

        // Verificar que el token sea correcto (máximo 1 hora)
        if(!Hash::check($request->token, $resetRecord->token)){
            return response()->json([
                'error' => 'Token no válido'
            ], 401);
        }

        // Verificar que no haya expirado (1 hora)
        $tokenAge = now()->diffInSeconds($resetRecord->created_at);
        if($tokenAge > 3600){
            DB::table('password_resets')->where('email', $request->email)->delete();
            return response()->json([
                'error' => 'El token ha expirado. Por favor solicita uno nuevo'
            ], 401);
        }

        // Encontrar el usuario y actualizar la contraseña
        $user = User::where('email', $request->email)->first();

        if(!$user){
            return response()->json([
                'error' => 'Usuario no encontrado'
            ], 401);
        }

        // Actualizar la contraseña
        $user->password = Hash::make($request->password);
        $user->save();

        // Eliminar el token de recuperación
        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json([
            'msg' => 'Contraseña actualizada correctamente. Ya puedes iniciar sesión'
        ], 200);
    }

}
