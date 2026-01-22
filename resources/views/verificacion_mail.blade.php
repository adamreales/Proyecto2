<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificacion Mail</title>
</head>
<body>
    <h1>Bienvenido a Zent {{ $nombre }}</h1>
    <p>Para validar tu cuenta dale al boton</p>
    <a href="http://127.0.0.1:8000/validar_usuario/{{ $id_usuario}}">Validar Usuario</a>
</body>
</html>