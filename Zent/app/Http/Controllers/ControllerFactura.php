<?php

namespace App\Http\Controllers;

use App\Helpers\DuenoCarrito;
use App\Models\Factura;
use Illuminate\Http\Request;

class ControllerFactura extends Controller
{
    public function verFacturaPedido(Request $request, int $pedidoId)
    {
        $dueno = DuenoCarrito::get();

        $factura = Factura::with(['doLineas', 'doPedido'])
            ->where('id_pedido', $pedidoId)
            ->whereHas('doPedido', function ($query) use ($dueno) {
                $query->where($dueno['campo'], $dueno['valor']);
            })
            ->first();

        if (!$factura) {
            return response()->json([
                'error' => 'Factura no encontrada'
            ], 404);
        }

        return response()->json([
            'factura' => [
                'id' => $factura->id,
                'pedido_id' => $factura->id_pedido,
                'total' => $factura->total,
                'estado_pedido' => $factura->doPedido?->estado,
                'fecha' => optional($factura->created_at)->toISOString(),
                'lineas' => $factura->doLineas->map(function ($linea) {
                    return [
                        'id' => $linea->id,
                        'nombre_producto' => $linea->nombre_producto,
                        'plataforma' => $linea->plataforma,
                        'cantidad' => $linea->cantidad,
                        'precio_unitario' => $linea->precio_unitario,
                        'total_linea' => $linea->total_linea,
                    ];
                })->values(),
            ],
        ]);
    }
}
