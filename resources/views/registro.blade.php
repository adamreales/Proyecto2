<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>
<body>
    <!-- Adam te dejo el formulario sin nada te encargas tu de hacerlo bonito -->
    <a href="{{}}">
    <h1>Registro</h1>
    <form name="registro_form" action="#" method="POST">
        <label>Nombre</label>
        <input type="text" name="nombre" placeholder="Introduce tu nombre" required />
        <br>
        <label>Apellido 1</label>
        <input type="text" name="apellido1" placeholder="Introduce tu primer apellido" required />
        <br>
        <label>Apellido 2</label>
        <input type="text" name="apellido2" placeholder="Introduce tu segundo apellido" required />
        <br>
        <label>Fecha de nacimiento</label>
        <input type="date" name="fecha_nacimiento" placeholder="Introduce tu fecha de nacimiento" required />
        <br>
        <label>Introduce tu correo</label>
        <input type="email" name="email" placeholder="a@ejemplo.com" required />
        <br>
        <label>Introduce tu contraseña</label>
        <input type="password" name="contra" placeholder="*****" required />
        <br>
        <label>Vuelve a introducir tu contraseña</label>
        <input type="password" name="conf_contra" placeholder="*****" required />
        <br>
        <input type="submit" name="reg_form" value="Registro" />
    </form>
    <a href='#'>Volver</a>
</body>
</html>