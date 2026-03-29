<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

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
            'doLineas.doProducto.doPlataforma'
        ])
        ->where('id', $id)
        ->whereHas('doPedido', function ($query) use ($usuarioId) {
            $query->where('id_usuario', $usuarioId);
        })
        ->first();

        if (!$factura) {
            return response()->json(['error' => 'Factura no encontrada'], 404);
        }

        // Generar PDF on-demand si aún no fue guardado
        if (!$factura->pdf_path || !Storage::disk('public')->exists($factura->pdf_path)) {
            $pdf = Pdf::loadView('factura', ['factura' => $factura]);

            $pdfFilename = 'factura-' . ($factura->numero_factura ?: $factura->id) . '.pdf';
            $pdfPath = 'facturas/' . $pdfFilename;

            Storage::disk('public')->put($pdfPath, $pdf->output());
            $factura->update(['pdf_path' => $pdfPath]);
        }

        $filename = 'factura-' . ($factura->numero_factura ?: $factura->id) . '.pdf';
        $fullPath = storage_path('app/public/' . $factura->pdf_path);

        return response()->download($fullPath, $filename, [
            'Content-Type' => 'application/pdf',
        ]);
    }
}
