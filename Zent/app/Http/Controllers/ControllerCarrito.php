<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControllerCarrito extends Controller
{

    public function crear_carrito(Request $r){
        
        DB::beginTransaction();

        try{
            if(!$r->has(['id_usuario'])){
                throw new \Exception('Error faltan campos en el envio');
            }

            $u = User::find($r->id_usuario);
            if($u === null){
                throw new \Exception('Error usuario no encontrado');
            }

            $carritoExistente = Carrito::where('id_usuario',$r->id_usuario)->where('estado','Activo')->first();

            if($carritoExistente !== null){
                return response()->json([
                    'id_carrito' => $carritoExistente->id,
                    'carrito' => 'Carrito ya existente'
                ],200);
            }

            $c = [
                'id_usuario' => $r->id_usuario,
                'estado' => 'Activo'
            ];

            $car = Carrito::create($c);

            DB::commit();

            return response()->json([
                'id_carrito' => $car->id, 
                'carrito' => 'Carrito creado correctamente'
            ],201);

        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }


    //Creo que no esta acabado terminar en futuro
    public function anadir_carrito(Request $r){

        DB::beginTransaction();

        try{
            if(!$r->has(['id_producto','id_usuario','cantidad'])){
                throw new \Exception('Error faltan campos en el envio');
            }

            $p = Producto::find($r->id_producto);
            if($p === null){
                throw new \Exception('Error Producto no encontrado');
            }
            $u = User::find($r->id_usuario);
            if($u === null){
                throw new \Exception('Error Usuario no encontrado');
            }
            if(!($r->cantidad > 0 && $r->cantidad <= $p->stock)){
                throw new \Exception('Error Cantidad tiene que ser entre (1-' + $p->stock + ")");
            }

            $c = [
                'id_producto' =>  $r->id_producto,
                'id_usuario' => $r->id_usuario,
                'cantidad' => $r->cantidad
            ];

            Carrito::create($c);

            DB::commit();

            return response()->json([
                'carrito' => 'Anadido correctamente al carrito'
            ]);

        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }
}