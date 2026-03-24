<?php

namespace App\Services;

use App\Models\CarritoProducto;
use App\Models\Factura;
use App\Models\FacturaLinea;
use App\Models\Pedido;
use Exception;

class FacturaService
{
    public function generar(Pedido $pedido): Factura
    {
        $factura = Factura::firstOrCreate(
            ['id_pedido' => $pedido->id],
            ['total' => $pedido->total]
        );

        if ($factura->doLineas()->exists()) {
            return $factura->load('doLineas');
        }

        $itemsCarrito = CarritoProducto::with([
            'doPlataformaProducto.doProducto',
            'doPlataformaProducto.doPlataforma',
        ])
            ->where('id_carrito', $pedido->id_carrito)
            ->get();

        if ($itemsCarrito->isEmpty()) {
            throw new Exception('No hay lineas de carrito para generar la factura');
        }

        foreach ($itemsCarrito as $item) {
            $plataformaProducto = $item->doPlataformaProducto;
            $producto = $plataformaProducto?->doProducto;
            $plataforma = $plataformaProducto?->doPlataforma;

            if (!$producto) {
                throw new Exception('No se puede generar la factura sin producto asociado');
            }

            FacturaLinea::create([
                'id_factura' => $factura->id,
                'nombre_producto' => $producto->titulo,
                'plataforma' => $plataforma?->nombre,
                'cantidad' => $item->cantidad,
                'precio_unitario' => $producto->precio,
                'total_linea' => $producto->precio * $item->cantidad,
            ]);
        }

        return $factura->load('doLineas');
    }
}
