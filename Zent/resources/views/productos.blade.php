<!-- resources/views/productos.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles del Producto</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .producto {
            border: 1px solid #ccc;
            padding: 20px;
            margin-bottom: 20px;
        }
        .producto h1 {
            font-size: 2em;
            margin-bottom: 10px;
        }
        .producto img {
            max-width: 300px;
            margin-right: 10px;
        }
        .valoraciones, .categorias, .plataformas {
            margin-top: 20px;
        }
        .valoraciones ul, .categorias ul, .plataformas ul {
            list-style-type: none;
            padding: 0;
        }
        .valoraciones li, .categorias li, .plataformas li {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Productos</h1>
    
    <div id="productos">
        <!-- Aquí se listarán los productos -->
    </div>

    <script>
        fetch('http://localhost:8000/api/productos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let productosDiv = document.getElementById('productos');
        if (data && data.productos) {
            data.productos.forEach(producto => {
                let productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');
                
                // Mostrar el título, subtítulo y descripción
                productoDiv.innerHTML = `
                    <h1>${producto.titulo}</h1>
                    <h2>${producto.subtitulo}</h2>
                    <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                    <p><strong>Stock:</strong> ${producto.stock}</p>
                `;
                
                // Mostrar imágenes del producto
                let imagenesDiv = document.createElement('div');
                producto.do_imagenes.forEach(imagen => {
                    let img = document.createElement('img');
                    img.src = "https://zent.es/"+imagen.url;
                    imagenesDiv.appendChild(img);
                });
                
                // Mostrar las valoraciones
                let valoracionesDiv = document.createElement('div');
                valoracionesDiv.classList.add('valoraciones');
                valoracionesDiv.innerHTML = '<h3>Valoraciones</h3>';
                if (producto.do_valoraciones.length > 0) {
                    let ul = document.createElement('ul');
                    producto.do_valoraciones.forEach(valoracion => {
                        let li = document.createElement('li');
                        li.innerHTML = `⭐ ${valoracion.estrellas} estrellas - "${valoracion.comentario}"`;
                        ul.appendChild(li);
                    });
                    valoracionesDiv.appendChild(ul);
                } else {
                    valoracionesDiv.innerHTML += '<p>No hay valoraciones.</p>';
                }

                // Mostrar las categorías del producto
                let categoriasDiv = document.createElement('div');
                categoriasDiv.classList.add('categorias');
                categoriasDiv.innerHTML = '<h3>Categorías</h3>';
                if (producto.do_categorias_producto.length > 0) {
                    let ul = document.createElement('ul');
                    producto.do_categorias_producto.forEach(categoria => {
                        let li = document.createElement('li');
                        li.innerHTML = `${categoria.do_categoria.nombre} - ${categoria.do_categoria.descripcion}`;
                        ul.appendChild(li);
                    });
                    categoriasDiv.appendChild(ul);
                } else {
                    categoriasDiv.innerHTML += '<p>No hay categorías.</p>';
                }

                // Si el producto es un juego, mostrar la información relacionada con el juego
                if (producto.do_juego) {
                    let plataformasDiv = document.createElement('div');
                    plataformasDiv.classList.add('plataformas');
                    plataformasDiv.innerHTML = '<h3>Plataformas</h3>';
                    if (producto.do_juego.do_plataformas.length > 0) {
                        let ul = document.createElement('ul');
                        producto.do_juego.do_plataformas.forEach(plataforma => {
                            let li = document.createElement('li');
                            li.innerHTML = plataforma.nombre;
                            ul.appendChild(li);
                        });
                        plataformasDiv.appendChild(ul);
                    } else {
                        plataformasDiv.innerHTML += '<p>No hay plataformas disponibles.</p>';
                    }

                    let pegiDiv = document.createElement('div');
                    pegiDiv.classList.add('pegi');
                    pegiDiv.innerHTML = '<h3>Clasificación PEGI</h3>';
                    if (producto.do_juego.do_juego_pegi.length > 0) {
                        let ul = document.createElement('ul');
                        producto.do_juego.do_juego_pegi.forEach(pegi => {
                            let li = document.createElement('li');
                            li.innerHTML = `${pegi.do_edad.edad}+ - ${pegi.do_descripcion.nombre}: ${pegi.do_descripcion.descripcion}`;
                            ul.appendChild(li);
                        });
                        pegiDiv.appendChild(ul);
                    } else {
                        pegiDiv.innerHTML += '<p>No hay clasificación PEGI.</p>';
                    }

                    productoDiv.appendChild(plataformasDiv);
                    productoDiv.appendChild(pegiDiv);
                }
                
                // Añadir todas las secciones a la div principal
                productoDiv.appendChild(imagenesDiv);
                productoDiv.appendChild(valoracionesDiv);
                productoDiv.appendChild(categoriasDiv);
                
                // Finalmente, añadir el producto a la lista de productos
                productosDiv.appendChild(productoDiv);
            });
        } else {
            productosDiv.innerHTML = '<p>No se encontraron productos.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('productos').innerHTML = '<p>Error al cargar los productos.</p>';
    });

    </script>
</body>
</html>
