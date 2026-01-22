<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>

    <img src="{{ asset("/images/productos/imagesideas/Logo.png") }}" width='100px'>
    <h1>Login</h1>

    @if($errors->any())
        <ul>
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif

    <form name="login" method="post" action="#">
        <label>Email:</label>
        <input type="email" name="email" required />
        <br>
        <label>Contraseña:</label>
        <input type="password" name="contra" required />
        <br>
        <input type="submit" name="login" />
    </form>
    <a href="{{ route('index') }}">Volver</a>
</body>
</html>