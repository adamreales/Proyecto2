<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedido confirmado</title>
</head>
<body>
    <h1>Pedido confirmado</h1>

    <p>
        Hola {{ optional($pedido->doUsuario)->name ?? 'cliente' }},
        hemos confirmado el pago de tu pedido #{{ $pedido->id }}.
    </p>

    <p>Total: {{ number_format((float) $pedido->total, 2, ',', '.') }} EUR</p>

    @if ($pedido->doDetalles && $pedido->doDetalles->count() > 0)
        <h2>Detalle</h2>
        <ul>
            @foreach ($pedido->doDetalles as $detalle)
                <li>
                    {{ optional($detalle->doProducto)->titulo ?? 'Producto' }} -
                    {{ number_format((float) $detalle->precio_unitario, 2, ',', '.') }} EUR
                    <br>
                    <h2>Clave: {{ $detalle->doClave->clave }}</h2>

                </li>
            @endforeach
        </ul>
    @endif

    <p>Gracias por comprar en Zent.</p>
</body>
</html>
