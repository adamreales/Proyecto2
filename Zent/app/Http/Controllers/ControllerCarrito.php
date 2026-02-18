<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\CarritoProducto;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class ControllerCarrito extends Controller
{

    public function crear_carrito(Request $r){

        try{
            if(!$r->has(['id_usuario'])){
                throw new \Exception('Error faltan campos en el envio');
            }

            $u = User::find($r->id_usuario);
            if($u === null){
                throw new \Exception('Error usuario no encontrado');
            }

            $msg = "";
            try{
                $car = Carrito::create([
                    'id_usuario'=>$r->id_usuario,
                    'estado'=>'Activo'
                ]);

                $msg = 'Carrito creado correctamente';

            }catch(QueryException $e){
                $car = Carrito::where('id_usuario',$r->id_usuario)
                    ->where('estado','Activo')
                    ->first();

                $msg = 'Carrito ya existente';
            }

            return response()->json([
                'id_carrito' => $car->id, 
                'carrito' => $msg
            ],201);

        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ],400);
        }
    }

    public function anadir_carrito(Request $r){

        DB::beginTransaction();

        try{
            if(!$r->has(['id_producto','id_usuario','cantidad'])){
                throw new \Exception('Error faltan campos en el envio');
            }

            $p = Producto::lockForUpdate()->find($r->id_producto);
            if($p === null){
                throw new \Exception('Error Producto no encontrado');
            }

            $u = User::find($r->id_usuario);
            if($u === null){
                throw new \Exception('Error Usuario no encontrado');
            }

            $c = Carrito::where('id_usuario',$u->id)->where('estado','Activo')->lockForUpdate()->first();
            if($c === null){
                throw new \Exception('Carrito no encontrado');
            }

            if(!($r->cantidad > 0 && $r->cantidad <= $p->stock)){
                throw new \Exception("Error Cantidad tiene que ser entre (1-$p->stock)");
            }

            $item_carrito = CarritoProducto::where('id_carrito',$c->id)->where('id_producto',$r->id_producto)->first();

            if($item_carrito !== null){
                $nueva_cantidad = $item_carrito->cantidad + $r->cantidad;;
                if($nueva_cantidad <= $p->stock){
                    $item_carrito->cantidad = $nueva_cantidad;
                    $item_carrito->save();
                }else{
                    throw new \Exception("Error Cantidad superior del producto");
                }
            }else{
                $car = [
                    'id_carrito' => $c->id,
                    'id_producto' =>  $r->id_producto,
                    'cantidad' => $r->cantidad
                ];

                CarritoProducto::create($car);
            }

            DB::commit();

            return response()->json([
                'carrito' => 'Anadido correctamente al carrito'
            ],200);

        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ],400);
        }
    }
}