<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Pedido Enviado</h1>
    <p>Hola {{ $pedido->doUsuario->name }},</p>
    <p>Tu pedido con ID {{ $pedido->id }} ha sido enviado exitosamente
        @foreach ($pedido->doProductos as $producto)
            <li>{{ $producto->nombre }}</li>
            <li>{{ $producto->precio }}</li>
            <li>{{ $producto->cantidad }}</li>
            <li>{{ $producto->precio * $producto->cantidad }}</li>
            <li></li>{{ $producto->doClaveProducto->clave }}</li>
        @endforeach
    </p>
</body>
</html>
