<?php

namespace App\Http\Controllers;

use App\Helpers\DuenoCarrito;
use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\CarritoProducto;
use App\Models\Producto;
use App\Models\User;
use Error;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControllerCarrito extends Controller
{

    public function crear_carrito(Request $r){

        try{

            $dueno = DuenoCarrito::get();

            $carrito = Carrito::firstOrCreate(
                [
                    $dueno['campo'] => $dueno['valor'],
                    'estado' => 'Activo'
                ],
                [
                    'id_usuario' => $dueno['campo'] == 'id_usuario' ? $dueno['valor'] : null,
                    'session_id' => $dueno['campo'] == 'session_id' ? $dueno['valor'] : null
                ]
            );

            return response()->json([
                'id_carrito' => $carrito->id, 
                'carrito' => 'Carrito activo'
            ],201);

        }catch(\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ],400);
        }
    }

    public function anadir_carrito(Request $r){

        DB::beginTransaction();

        try{
            if(!$r->has(['id_producto','cantidad'])){
                throw new \Exception('Error faltan campos en el envio');
            }

            $dueno = DuenoCarrito::get();

            $p = Producto::lockForUpdate()->find($r->id_producto);
            if($p === null){
                throw new \Exception('Error Producto no encontrado');
            }

            if(!($r->cantidad > 0 && $r->cantidad <= $p->stock)){
                throw new \Exception("Error Cantidad tiene que ser entre (1-$p->stock)");
            }

            $c = Carrito::firstOrCreate(
                [
                    $dueno['campo'] => $dueno['valor'],
                    'estado' => 'Activo'
                ],
                [
                    'id_usuario' => $dueno['campo'] == 'id_usuario' ? $dueno['valor'] : null,
                    'session_id' => $dueno['campo'] == 'session_id' ? $dueno['valor'] : null
                ]
            );

            $item_carrito = CarritoProducto::where('id_carrito',$c->id)->where('id_producto',$r->id_producto)->lockForUpdate()->first();

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

    public function quitar_carrito(Request $r){
        DB::beginTransaction();

        try{

            if(!$r->filled('id_producto')){
                throw new \Exception("Error Faltan campos de envio");
            }

            $dueno = DuenoCarrito::get();

            $p = Producto::find($r->id_producto);
            if($p === null){
                throw new \Exception("Error id del producto no encontrado");
            }

            $carrito = Carrito::where($dueno['campo'], $dueno['valor'])->where('estado','Activo')->lockForUpdate()->first();

            if($carrito === null){
                throw new \Exception("Error carrito no encontrado");
            }

            $item_carrito = CarritoProducto::where('id_carrito',$carrito->id)->where('id_producto',$r->id_producto)->lockForUpdate()->first();

            if($item_carrito === null){
                throw new \Exception("Error producto no encontrado en el carrito");
            }

            $item_carrito->delete();

            DB::commit();

            return response()->json([
                'carrito' => 'Eliminado el producto del carrito'
            ],200);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ],400);
        }
    }

    public function ver_carrito(Request $r){
        try{
            $dueno = DuenoCarrito::get();

            $carrito = Carrito::where($dueno['campo'],$dueno['valor'])->where('estado','Activo')->first();

            if($carrito === null){
                return response()->json([
                    'carrito' => [],
                    'msg' => 'Carrito vacío'
                ], 200);
            }

            $items_carrito = CarritoProducto::where('id_carrito',$carrito->id)->whereHas('doProducto')->with(['doProducto','doProducto.doImagenes'])->get();

            return response()->json([
                'carrito' => $items_carrito,
                'msg' => 'Ver carrito'
            ],200);

        }catch(\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ],400);
        }
    }

}