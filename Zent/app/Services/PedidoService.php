<?php

namespace App\Services;

use App\Helpers\DuenoCarrito;
use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Models\Carrito;
use App\Models\CarritoProducto;
use Error;
use Illuminate\Support\Facades\DB;
use Exception;

class PedidoService{
    public function crearPedidoCarrito(){
        return DB::transaction(function () {

            $dueno = DuenoCarrito::get();

            $carrito = Carrito::where($dueno['campo'], $dueno['valor'])->where('estado','Activo')->lockForUpdate()->first();

            if($carrito === null){
                throw new Exception("No existe carrito");
            }

            $items = CarritoProducto::with('doProducto')->where('id_carrito',$carrito->id)->lockForUpdate()->get();
        
            if($items->isEmpty()){
                throw new Exception("El carrito esta vacio");
            }

            $p = [
                'id_usuario' => $dueno['campo']=='id_usuario' ? $dueno['valor'] : null,
                'session_id' => $dueno['campo']=='session_id' ? $dueno['valor'] : null,
                'id_carrito' => $carrito->id,
                'total' => 0,
                'estado' => 'pendiente'
            ];

            $pedido = Pedido::create($p);

            $total = 0;

            foreach($items as $item){
                $producto = $item->doProducto;

                if($producto === null){
                    throw new Exception("Producto no existe");
                }

                if($producto->stock < $item->cantidad){
                    throw new Exception("Stock insuficiente para {$producto->titulo}");
                }

                $precio = $producto->precio;
                $subtotal = $precio * $item->cantidad;

                $pd = [
                    'id_pedido' => $pedido->id,
                    'id_producto' => $producto->id,
                    'precio_unitario' => $precio,
                    'cantidad' => $item->cantidad,
                    'subtotal' => $subtotal
                ];

                PedidoDetalle::create($pd);

                $total += $subtotal;

            }

            $pedido->update([
                'total' => $total
            ]);

            return $pedido;
        
        });

    }
}