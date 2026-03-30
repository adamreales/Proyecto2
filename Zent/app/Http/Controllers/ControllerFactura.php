<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;

class ControllerFactura extends Controller
{
    public function listar(): JsonResponse
    {
        $usuarioId = auth()->id();

        $facturas = Factura::with(['doLineas', 'doPedido'])
            ->whereHas('doPedido', function ($query) use ($usuarioId) {
                $query->where('id_usuario', $usuarioId);
            })
            ->orderByDesc('id')
            ->get()
            ->map(function (Factura $factura) {
                return [
                    'id' => $factura->id,
                    'id_pedido' => $factura->id_pedido,
                    'numero_factura' => $factura->numero_factura,
                    'fecha_emision' => optional($factura->fecha_emision)->toIso8601String(),
                    'subtotal' => (float) $factura->subtotal,
                    'iva_porcentaje' => (float) $factura->iva_porcentaje,
                    'iva_total' => (float) $factura->iva_total,
                    'total' => (float) $factura->total,
                    'pdf_url' => $factura->pdf_path ? asset('storage/' . $factura->pdf_path) : null,
                    'enviado_por_email' => (bool) $factura->enviado_por_email,
                    'lineas' => $factura->doLineas->map(function ($linea) {
                        return [
                            'id' => $linea->id,
                            'nombre_producto' => $linea->nombre_producto,
                            'plataforma' => $linea->plataforma,
                            'cantidad' => (int) $linea->cantidad,
                            'precio_unitario' => (float) $linea->precio_unitario,
                            'total_linea' => (float) $linea->total_linea,
                        ];
                    })->values(),
                ];
            })
            ->values();

        return response()->json($facturas, 200);
    }

    public function descargar(int $id)
    {
        $usuarioId = auth()->id();

        $factura = Factura::with([
            'doPedido.doUsuario',
            'doLineas'
        ])
        ->where('id', $id)
        ->whereHas('doPedido', function ($query) use ($usuarioId) {
            $query->where('id_usuario', $usuarioId);
        })
        ->first();

        if (!$factura) {
            return response()->json(['error' => 'Factura no encontrada'], 404);
        }

        $filename = 'factura-' . ($factura->numero_factura ?: $factura->id) . '.pdf';
        $pdf = Pdf::loadView('factura', ['factura' => $factura]);
        $pdfContent = $pdf->output();

        return response($pdfContent, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
