<!-- resources/views/productos.blade.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Productos</title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background-color: #f8f9fa;
        }
        .producto-img {
            max-height: 200px;
            object-fit: cover;
        }
        .badge-plataforma {
            margin-right: 5px;
        }
    </style>
</head>
<body>

<div class="container py-5">
    <h1 class="mb-4 text-center">🛒 Productos</h1>

    <div id="productos" class="row g-4">
        <!-- Productos aquí -->
    </div>
</div>

<script>
fetch('http://localhost:8000/api/productos')
.then(response => {
    if (!response.ok) throw new Error('Error en la respuesta');
    return response.json();
})
.then(data => {
    const productosDiv = document.getElementById('productos');

    if (!data || !data.productos || data.productos.length === 0) {
        productosDiv.innerHTML = '<p class="text-center">No hay productos disponibles.</p>';
        return;
    }

    data.productos.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';

        const card = document.createElement('div');
        card.className = 'card h-100 shadow-sm';

        // Imagen principal
        let imagenHTML = `
            <img src="https://via.placeholder.com/400x200?text=Sin+Imagen" class="card-img-top producto-img">
        `;
        if (producto.do_imagenes && producto.do_imagenes.length > 0) {
            imagenHTML = `
                <img src="https://zent.es/${producto.do_imagenes[0].url}" class="card-img-top producto-img">
            `;
        }

        card.innerHTML = `
            ${imagenHTML}
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${producto.titulo}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${producto.subtitulo ?? ''}</h6>

                <p class="card-text">${producto.descripcion}</p>

                <p class="fw-bold mb-1">💰 ${producto.precio} €</p>
                <p class="text-muted">📦 Stock: ${producto.stock}</p>
        `;

        // Categorías
        if (producto.do_categorias_producto?.length > 0) {
            let categoriasHTML = '<div class="mb-2">';
            producto.do_categorias_producto.forEach(cat => {
                categoriasHTML += `
                    <span class="badge bg-secondary me-1">
                        ${cat.do_categoria.nombre}
                    </span>
                `;
            });
            categoriasHTML += '</div>';
            card.querySelector('.card-body').innerHTML += categoriasHTML;
        }

        // Plataformas
        if (producto.do_juego?.do_plataformas?.length > 0) {
            let plataformasHTML = '<div class="mb-2">';
            producto.do_juego.do_plataformas.forEach(p => {
                plataformasHTML += `
                    <span class="badge bg-info text-dark badge-plataforma">
                        ${p.nombre}
                    </span>
                `;
            });
            plataformasHTML += '</div>';
            card.querySelector('.card-body').innerHTML += plataformasHTML;
        }

        // PEGI
        if (producto.do_juego?.do_juego_pegi?.length > 0) {
            let pegiHTML = '<ul class="list-group list-group-flush mt-2">';
            producto.do_juego.do_juego_pegi.forEach(pegi => {
                pegiHTML += `
                    <li class="list-group-item small">
                        🔞 ${pegi.do_edad.edad}+ — 
                        <strong>${pegi.do_descripcion.nombre}</strong>
                    </li>
                `;
            });
            pegiHTML += '</ul>';
            card.innerHTML += pegiHTML;
        }

        // Valoraciones
        let valoracionesHTML = `
            <div class="mt-auto pt-3">
                <h6>⭐ Valoraciones</h6>
        `;
        if (producto.do_valoraciones?.length > 0) {
            valoracionesHTML += '<ul class="list-unstyled small">';
            producto.do_valoraciones.forEach(v => {
                valoracionesHTML += `
                    <li>⭐ ${v.estrellas} - "${v.comentario}"</li>
                `;
            });
            valoracionesHTML += '</ul>';
        } else {
            valoracionesHTML += '<p class="text-muted small">Sin valoraciones</p>';
        }
        valoracionesHTML += '</div>';

        card.querySelector('.card-body').innerHTML += valoracionesHTML;

        col.appendChild(card);
        productosDiv.appendChild(col);
    });
})
.catch(error => {
    console.error(error);
    document.getElementById('productos').innerHTML =
        '<p class="text-danger text-center">Error al cargar productos.</p>';
});
</script>

</body>
</html>
