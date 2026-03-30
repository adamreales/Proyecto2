<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Factura {{ $factura->numero_factura }}</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            color: #111827;
            font-size: 13px;
            background: #ffffff;
        }

        /* HEADER */
        .header {
            margin-bottom: 20px;
            border-bottom: 2px solid #00eaff;
            padding-bottom: 10px;
        }

        .logo {
            width: 140px;
            margin-bottom: 10px;
        }

        .title {
            font-size: 26px;
            font-weight: bold;
            margin: 0;
            color: #111827;
        }

        .sub {
            color: #6b7280;
            margin: 4px 0;
        }

        /* BOX CLIENTE */
        .box {
            border: 1px solid #e5e7eb;
            border-left: 4px solid #00eaff;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 18px;
            background: #f9fafb;
        }

        .box strong {
            color: #00bcd4;
        }

        /* TABLA PRODUCTOS */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th {
            background: #111827;
            color: #ffffff;
            padding: 10px;
            font-weight: bold;
            font-size: 12px;
        }

        td {
            border: 1px solid #e5e7eb;
            padding: 8px;
        }

        tr:nth-child(even) {
            background: #f9fafb;
        }

        .right {
            text-align: right;
        }

        /* TOTALES */
        .totals {
            margin-top: 20px;
            width: 300px;
            margin-left: auto;
        }

        .totals td {
            border: none;
            padding: 6px 0;
        }

        .totals tr {
            border-bottom: 1px solid #e5e7eb;
        }

        .total-strong {
            font-weight: bold;
            font-size: 16px;
            color: #000000;
            border-top: 2px solid #000000;
        }

        /* EFECTO GAMING SUAVE */
        .highlight {
            color: #000000;
            font-weight: bold;
        }

    </style>
</head>

<body>

    @php
        $logoPath = public_path('Logo.png');
        $logoSrc = file_exists($logoPath)
            ? 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath))
            : null;
        $lineasFactura = $factura->doLineas->sortBy('id')->values();
        $detallesPedido = optional($factura->doPedido)?->doDetalles?->sortBy('id')->values() ?? collect();
    @endphp

    <div class="header">
        @if ($logoSrc)
            <img src="{{ $logoSrc }}" class="logo">
        @endif

        <p class="title">Factura <span class="highlight">{{ $factura->numero_factura }}</span></p>
        <p class="sub">Fecha de emisión: {{ optional($factura->fecha_emision)->format('d/m/Y H:i') }}</p>
        <p class="sub">Pedido: #{{ $factura->id_pedido }}</p>
    </div>

    <div class="box">
        <strong>Cliente</strong>
        <div>{{ optional(optional($factura->doPedido)->doUsuario)->name ?? 'Cliente' }}</div>
        <div>{{ optional(optional($factura->doPedido)->doUsuario)->email ?? '' }}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Plataforma</th>
                <th>Clave</th>
                <th class="right">Cantidad</th>
                <th class="right">Precio</th>
                <th class="right">Total</th>
            </tr>
        </thead>

        <tbody>
            @foreach($lineasFactura as $linea)
                @php
                    $detallePedido = $detallesPedido->get($loop->index);
                    $plataformaNombre = $linea->plataforma
                        ?? $detallePedido?->doClave?->doPlataformaProducto?->doPlataforma?->nombre
                        ?? '-';
                    $claveComprada = $linea->clave_producto
                        ?? $detallePedido?->doClave?->clave
                        ?? '-';
                @endphp
                <tr>
                    <td>{{ $linea->nombre_producto }}</td>
                    <td>{{ $plataformaNombre }}</td>
                    <td>{{ $claveComprada }}</td>
                    <td class="right">{{ $linea->cantidad }}</td>
                    <td class="right">{{ number_format((float) $linea->precio_unitario, 2, ',', '.') }} €</td>
                    <td class="right">{{ number_format((float) $linea->total_linea, 2, ',', '.') }} €</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <table class="totals">
        <tr>
            <td>Base imponible:</td>
            <td class="right">{{ number_format((float) $factura->subtotal, 2, ',', '.') }} €</td>
        </tr>

        <tr>
            <td>IVA ({{ number_format((float) $factura->iva_porcentaje, 2, ',', '.') }}%):</td>
            <td class="right">{{ number_format((float) $factura->iva_total, 2, ',', '.') }} €</td>
        </tr>

        <tr class="total-strong">
            <td>Total:</td>
            <td class="right">{{ number_format((float) $factura->total, 2, ',', '.') }} €</td>
        </tr>
    </table>

</body>
</html>
