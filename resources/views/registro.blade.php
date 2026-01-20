<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>
<body>
    <img src="{{ asset("/images/productos/imagesideas/Logo.png") }}" width='100px'>
    <h1>Registro</h1>
    <form name="form_registro" action="#" method="POST">
        <label>Nombre:</label>
        <input type="text" name="nombre" placeholder="Introduce tu nombre" required/>
        <br>
        <label>Apellido 1:</label>
        <input type="text" name="apellido1" placeholder="Introduce tu primer apellido" required />
        <br>
        <label>Apellido 2:</label>
        <input type="text" name="apellido2" placeholder="Introduce tu segundo apellido" required />
        <br>
        <label>Email:</label>
        <input type="email" name="email" placeholder="Introduce tu email" required />
        <br>
        <label>Contraseña:</label>
        <input type="password" name="contra" placeholder="*****" required />
        <br>
        <label>Confirmar Contraseña:</label>
        <input type="password" name="conf_contra" placeholder="*****" />
        <br>
        <input type="submit" name="form_reg" value="Registrar" required />
    </form>
    <a href="#">Volver</a>
</body>
</html>