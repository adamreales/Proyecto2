<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Factura {{ $factura->numero_factura }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; color: #111827; font-size: 13px; }
        .header { margin-bottom: 18px; }
        .title { font-size: 24px; font-weight: bold; margin: 0; }
        .sub { color: #6b7280; margin: 4px 0; }
        .box { border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th, td { border: 1px solid #e5e7eb; padding: 8px; }
        th { background: #f3f4f6; text-align: left; }
        .right { text-align: right; }
        .totals { margin-top: 16px; width: 280px; margin-left: auto; }
        .totals td { border: none; padding: 4px 0; }
        .total-strong { font-weight: bold; font-size: 14px; }
    </style>
</head>
<body>
    <div class="header">
        <p class="title">Factura {{ $factura->numero_factura }}</p>
        <p class="sub">Fecha de emision: {{ optional($factura->fecha_emision)->format('d/m/Y H:i') }}</p>
        <p class="sub">Pedido: #{{ $factura->id_pedido }}</p>
    </div>

    <div class="box">
        <strong>Cliente:</strong>
        <div>{{ optional(optional($factura->doPedido)->doUsuario)->name ?? 'Cliente' }}</div>
        <div>{{ optional(optional($factura->doPedido)->doUsuario)->email ?? '' }}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Plataforma</th>
                <th class="right">Cantidad</th>
                <th class="right">Precio unitario</th>
                <th class="right">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($factura->doLineas as $linea)
                <tr>
                    <td>{{ $linea->nombre_producto }}</td>
                    <td>{{ $linea->plataforma ?? '-' }}</td>
                    <td class="right">{{ $linea->cantidad }}</td>
                    <td class="right">{{ number_format((float) $linea->precio_unitario, 2, ',', '.') }} EUR</td>
                    <td class="right">{{ number_format((float) $linea->total_linea, 2, ',', '.') }} EUR</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <table class="totals">
        <tr>
            <td>Base imponible:</td>
            <td class="right">{{ number_format((float) $factura->subtotal, 2, ',', '.') }} EUR</td>
        </tr>
        <tr>
            <td>IVA ({{ number_format((float) $factura->iva_porcentaje, 2, ',', '.') }}%):</td>
            <td class="right">{{ number_format((float) $factura->iva_total, 2, ',', '.') }} EUR</td>
        </tr>
        <tr class="total-strong">
            <td>Total:</td>
            <td class="right">{{ number_format((float) $factura->total, 2, ',', '.') }} EUR</td>
        </tr>
    </table>
</body>
</html>
