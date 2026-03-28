<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedido confirmado</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family: Arial, Helvetica, sans-serif; color:#000;">

    <div style="max-width:600px; margin:40px auto; border-radius:12px; overflow:hidden; box-shadow:0 0 20px rgba(0, 255, 255, 0.2); border:1px solid #00f7ff;">

        <!-- HEADER -->
        <div style="background: linear-gradient(90deg, #00f7ff, #00c3ff); padding:20px; text-align:center;">
            <h1 style="margin:0; color:#000; font-size:28px; letter-spacing:1px;">
                🎮 Pedido Confirmado
            </h1>
        </div>

        <!-- BODY -->
        <div style="padding:25px;">

            <p style="font-size:16px;">
                Hola <strong>{{ optional($pedido->doUsuario)->name ?? 'cliente' }}</strong>,
                hemos confirmado el pago de tu pedido
                <span style="color:#00c3ff; font-weight:bold;">#{{ $pedido->id }}</span>.
            </p>

            <div style="background:#f5ffff; border-left:4px solid #00f7ff; padding:15px; margin:20px 0; border-radius:6px;">
                <p style="margin:0; font-size:18px;">
                    💰 Total:
                    <strong style="color:#00c3ff;">
                        {{ number_format((float) $pedido->total, 2, ',', '.') }} EUR
                    </strong>
                </p>
            </div>

            @if ($pedido->doDetalles && $pedido->doDetalles->count() > 0)
                <h2 style="border-bottom:2px solid #00f7ff; padding-bottom:5px;">
                    🧾 Detalle del pedido
                </h2>

                <ul style="list-style:none; padding:0;">
                    @foreach ($pedido->doDetalles as $detalle)
                        <li style="margin-bottom:15px; padding:15px; border:1px solid #00eaff; border-radius:8px; background:#f9ffff;">

                            <p style="margin:0; font-weight:bold;">
                                {{ optional($detalle->doProducto)->titulo ?? 'Producto' }}
                            </p>

                            <p style="margin:5px 0;">
                                Precio:
                                <span style="color:#00c3ff;">
                                    {{ number_format((float) $detalle->precio_unitario, 2, ',', '.') }} EUR
                                </span>
                            </p>

                            <p style="margin:5px 0; font-size:14px;">
                                🔑 Clave:
                                <span style="background:#000; color:#00f7ff; padding:5px 8px; border-radius:5px; font-family: monospace;">
                                    {{ $detalle->doClave->clave }}
                                </span>
                            </p>

                        </li>
                    @endforeach
                </ul>
            @endif

            <p style="margin-top:25px; font-size:15px;">
                Gracias por comprar en
                <strong style="color:#00c3ff;">Zent</strong> 🚀
            </p>

        </div>

        <!-- FOOTER -->
        <div style="background:#000; color:#00f7ff; text-align:center; padding:15px; font-size:13px;">
            © Zent - Gaming Store
        </div>

    </div>

</body>
</html>
