<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedido confirmado</title>
</head>
<body style="margin:0; padding:32px 16px; background-color:#f3f3f3; font-family: Arial, Helvetica, sans-serif; color:#111111;">
    <div style="max-width:640px; margin:0 auto; background-color:#ffffff; border:1px solid #111111;">
        <div style="padding:32px 32px 24px 32px; border-bottom:1px solid #111111;">
            <p style="margin:0 0 10px 0; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#555555;">Zent</p>
            <h1 style="margin:0; font-size:32px; line-height:1.2; font-weight:700; color:#111111;">Pedido confirmado</h1>
        </div>

        <div style="padding:32px;">
            <p style="margin:0 0 18px 0; font-size:16px; line-height:1.7;">
                Hola <strong>{{ optional($pedido->doUsuario)->name ?? 'cliente' }}</strong>, hemos confirmado correctamente el pago de tu pedido <strong>#{{ $pedido->id }}</strong>.
            </p>

            <div style="margin:0 0 28px 0; padding:18px 20px; border:1px solid #111111; background-color:#fafafa;">
                <p style="margin:0 0 8px 0; font-size:13px; text-transform:uppercase; letter-spacing:1.5px; color:#555555;">Total del pedido</p>
                <p style="margin:0; font-size:28px; font-weight:700; color:#111111;">
                    {{ number_format((float) $pedido->total, 2, ',', '.') }} EUR
                </p>
            </div>

            @if ($pedido->doDetalles && $pedido->doDetalles->count() > 0)
                <div style="margin-bottom:28px;">
                    <h2 style="margin:0 0 18px 0; font-size:20px; font-weight:700; color:#111111;">Detalle del pedido</h2>

                    <ul style="list-style:none; padding:0; margin:0;">
                        @foreach ($pedido->doDetalles as $detalle)
                            <li style="padding:18px 0; border-top:1px solid #d9d9d9;">
                                @php
                                    $plataformaNombre = optional(optional($detalle->doClave)->doPlataformaProducto)->doPlataforma->nombre ?? '';
                                @endphp

                                <p style="margin:0 0 10px 0; font-size:17px; font-weight:700; line-height:1.5; color:#111111;">
                                    {{ trim((optional($detalle->doProducto)->titulo ?? 'Producto') . ' ' . $plataformaNombre) }}
                                </p>

                                <p style="margin:0 0 10px 0; font-size:15px; line-height:1.6; color:#333333;">
                                    Precio: {{ number_format((float) $detalle->precio_unitario, 2, ',', '.') }} EUR
                                </p>

                                <div style="padding:12px 14px; background-color:#111111; color:#ffffff; font-family: monospace; font-size:14px; line-height:1.5; word-break:break-all;">
                                    {{ $detalle->doClave->clave }}
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <p style="margin:0 0 22px 0; font-size:15px; line-height:1.7; color:#333333;">
                Tu factura va adjunta en este correo y también la tendrás disponible dentro de tu cuenta.
            </p>

            <div style="margin:0 0 26px 0;">
                <a href="{{ rtrim(env('FRONT_URL', 'http://localhost:5173'), '/') }}/mis-pedidos"
                   style="display:inline-block; padding:14px 22px; background-color:#111111; color:#ffffff; text-decoration:none; font-size:14px; font-weight:700; letter-spacing:0.5px;">
                    Ver mis pedidos
                </a>
            </div>

            <p style="margin:0; font-size:14px; line-height:1.7; color:#555555;">
                Gracias por comprar en Zent.
            </p>
        </div>

        <div style="padding:18px 32px; border-top:1px solid #111111; background-color:#ffffff; font-size:12px; line-height:1.6; color:#666666;">
            Zent - Gaming Store
        </div>
    </div>
</body>
</html>
