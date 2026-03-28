<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        async function buscarProducto(nombre){

    try{

        const response = await fetch("http://localhost:8000/api/buscador", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'producto_nombre': nombre
            })
        });

        const data = await response.json();

        console.log("Respuesta API:");
        console.log(data);

        if(data.productos.length === 0){
            console.log("No se encontraron productos");
            return;
        }

        data.productos.forEach(producto => {
            console.log("Producto:", producto.nombre);
        });

    }catch(error){
        console.error("Error en la petición:", error);
    }

}
    </script>
</head>
<body>
    <button onclick="buscarProducto('a')">Prueba</button>
</body>
</html>
