<?php

namespace App\Http\Controllers;

use App\Helpers\DuenoCarrito;
use App\Http\Controllers\Controller;
use App\Models\Carrito;
use App\Models\CarritoProducto;
use App\Models\Producto;
use App\Models\User;
use App\Models\PlataformaProducto;
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
            if(!$r->has(['id_producto','id_plataforma','cantidad'])){
                throw new \Exception('Error faltan campos en el envio');
            }

            if($r->cantidad <= 0){
                throw new \Exception('Error cantidad inválida');
            }

            $dueno = DuenoCarrito::get();

            // 🔥 Bloqueamos la fila real (producto en esa plataforma)
            $pp = PlataformaProducto::where('producto_id', $r->id_producto)
                ->where('plataforma_id', $r->id_plataforma)
                ->lockForUpdate()
                ->first();

            if(!$pp){
                throw new \Exception('Error: producto no disponible en esa plataforma');
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

            // 🔥 Bloqueamos también el item del carrito
            $item_carrito = CarritoProducto::withTrashed()->where('id_carrito', $c->id)
                ->where('plataforma_producto_id', $pp->id)
                ->lockForUpdate()
                ->first();

            // 🔥 Cantidad total que habrá en carrito
            $cantidad_total = $r->cantidad;

            if($item_carrito && $item_carrito->trashed()){
                $item_carrito->restore();
                $item_carrito->cantidad = 0;
            }

            if($item_carrito){
                $cantidad_total += $item_carrito->cantidad;
            }

            // 🔥 VALIDACIÓN REAL DE STOCK (única y centralizada)
            if($cantidad_total > $pp->stock){
                throw new \Exception("Stock insuficiente. Disponible: {$pp->stock}");
            }

            if($item_carrito){
                $item_carrito->cantidad = $cantidad_total;
                $item_carrito->save();
            }else{
                CarritoProducto::create([
                    'id_carrito' => $c->id,
                    'plataforma_producto_id' => $pp->id,
                    'cantidad' => $r->cantidad
                ]);
            }

            DB::commit();

            return response()->json([
                'carrito' => 'Añadido correctamente al carrito'
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
            $dueno = DuenoCarrito::get();

            $carrito = Carrito::where($dueno['campo'], $dueno['valor'])
                ->where('estado','Activo')
                ->lockForUpdate()
                ->first();

            if($carrito === null){
                throw new \Exception("Error carrito no encontrado");
            }

            $item_carrito = null;

            if($r->filled('id_item')){
                $item_carrito = CarritoProducto::where('id_carrito', $carrito->id)
                    ->where('id', $r->id_item)
                    ->lockForUpdate()
                    ->first();
            }

            if($item_carrito === null && $r->filled('plataforma_producto_id')){
                $item_carrito = CarritoProducto::where('id_carrito', $carrito->id)
                    ->where('plataforma_producto_id', $r->plataforma_producto_id)
                    ->lockForUpdate()
                    ->first();
            }

            if($item_carrito === null && $r->filled('id_producto') && $r->filled('id_plataforma')){
                $pp = PlataformaProducto::where('producto_id', $r->id_producto)
                    ->where('plataforma_id', $r->id_plataforma)
                    ->first();

                if(!$pp){
                    throw new \Exception("Error producto-plataforma no encontrado");
                }

                $item_carrito = CarritoProducto::where('id_carrito',$carrito->id)
                    ->where('plataforma_producto_id',$pp->id)
                    ->lockForUpdate()
                    ->first();
            }

            if(
                $item_carrito === null &&
                !$r->filled('id_item') &&
                !$r->filled('plataforma_producto_id') &&
                !($r->filled('id_producto') && $r->filled('id_plataforma'))
            ){
                throw new \Exception("Error faltan campos de envio");
            }

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

            $carrito = Carrito::where($dueno['campo'],$dueno['valor'])
                ->where('estado','Activo')
                ->first();

            if($carrito === null){
                return response()->json([
                    'carrito' => [],
                    'msg' => 'Carrito vacío'
                ], 200);
            }

            $items_carrito = CarritoProducto::where('id_carrito',$carrito->id)
                ->with([
                    'doPlataformaProducto.doProducto',
                    'doPlataformaProducto.doProducto.doImagenes',
                    'doPlataformaProducto.doPlataforma'
                ])
                ->get();

            $items_carrito = $items_carrito->map(function ($item) {
                $plataformaProducto = $item->doPlataformaProducto;
                $producto = $plataformaProducto?->doProducto;
                $plataforma = $plataformaProducto?->doPlataforma;
                $imagen = $producto?->doImagenes?->first();

                return [
                    'id' => $item->id,
                    'cantidad' => $item->cantidad,
                    'id_producto' => $producto?->id,
                    'id_plataforma' => $plataforma?->id,
                    'plataforma_producto_id' => $plataformaProducto?->id,
                    'nombre' => $producto?->titulo,
                    'precio' => $producto?->precio,
                    'plataforma' => $plataforma?->nombre,
                    'stock' => $plataformaProducto?->stock,
                    'imagen' => $imagen?->url,
                    'producto' => $producto,
                    'plataforma_relacion' => $plataforma,
                ];
            });

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
