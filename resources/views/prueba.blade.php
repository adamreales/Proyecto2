<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container my-5">

    <h1 class="mb-4">Pruebas del Proyecto 2</h1>
    <h2 class="mb-4">Todos los Productos</h2>

    <div class="row g-4">
        @foreach ($productos as $p)
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">

                    {{-- Imagen --}}
                    @if ($p->doImagenes->isNotEmpty())
                        <img 
                            src="{{ asset($p->doImagenes[0]->url) }}" 
                            class="card-img-top"
                            alt="{{ $p->titulo }}"
                            style="height: 240px; object-fit: cover;"
                        >
                    @endif

                    <div class="card-body">
                        <h5 class="card-title">{{ $p->titulo }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            {{ $p->subtitulo }}
                        </h6>

                        <p class="card-text">
                            {{ $p->descripcion }}
                        </p>

                        <p>
                            Precio: {{ $p->precio }}€
                        </p>

                        {{-- Plataformas --}}
                        <div class="mt-3">
                            <h6 class="mb-2">Plataformas</h6>
                            @forelse ($p->doJuego->doPlataformas as $plataforma)
                                <span class="badge bg-primary me-1 mb-1">
                                    {{ $plataforma->nombre }}
                                </span>
                            @empty
                                <span class="text-muted">
                                    No disponible
                                </span>
                            @endforelse
                        </div>

                        <div class="mt-3">
                            <h6 class="mb-2">Categorias</h6>
                            @forelse($p->doCategoriasProducto as $categoria)
                                <span class="badge bg-primary me-1 mb-1">
                                    {{ $categoria->doCategoria->nombre }}
                                </span>
                            @empty
                                <span>
                                    No disponible
                                </span>
                            @endforelse
                        </div>

                        <div class="d-flex" style="background-color: {{$p->doJuego->doJuegoPegi->first()->doEdad->color}} ;">
                            {{-- @foreach ($p->doJuego->doJuegoPegi as $juegopegi)
                                <p>{{ $juegopegi->doEdad->edad }}</p>
                            @endforeach --}}
                            <p>{{ $p->doJuego->doJuegoPegi->first()->doEdad->edad }}</p>
                        </div>

                        <div class="d-flex justify-content-between mt-3">
                            <a href="#" class="btn btn-outline-primary btn-sm">
                                Ver producto
                            </a>

                            <form action="#" method="POST">
                                @csrf
                                <button class="btn btn-primary btn-sm">
                                    Añadir al carrito
                                </button>
                            </form>
                        </div>

                    </div>

                    {{-- Valoraciones --}}
                    <div class="card-footer bg-light">
                        <h6 class="mb-2">Valoraciones</h6>

                        @forelse ($p->doValoraciones as $v)
                            <div class="border rounded p-2 mb-2">
                                <strong>{{ $v->doUsuario->nombre }}</strong><br>
                                ⭐ {{ $v->estrellas }}/5
                                <p class="mb-0 text-muted">
                                    {{ $v->comentario }}
                                </p>
                            </div>
                        @empty
                            <p class="text-muted mb-0">
                                Sin valoraciones
                            </p>
                        @endforelse
                    </div>

                </div>
            </div>
        @endforeach
    </div>

</div>

<div class="container my-5">

    <h1 class="mb-4">Todos los usuarios</h1>

    <div class="row g-4">
        @foreach($usuarios as $usuario)
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">

                    <div class="card-body">
                        <h5 class="card-title mb-1">
                            {{ $usuario->nombre }} {{ $usuario->apellido1 }} {{ $usuario->apellido2 }}
                        </h5>

                        <p class="text-muted mb-2">
                            Usuario registrado
                        </p>

                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item">
                                <strong>📅 Nacimiento:</strong> {{ $usuario->fecha_nacimiento }}
                            </li>
                            <li class="list-group-item">
                                <strong>📧 Email:</strong> {{ $usuario->correo }}
                            </li>
                            <li class="list-group-item">
                                <strong>🔐 Contraseña:</strong>
                                <span class="text-muted">
                                    {{ $usuario->contrasena }}
                                </span>
                            </li>
                            <li class="list-group-item">
                                <strong>✔ Validado:</strong>
                                @if($usuario->validado)
                                    <span class="badge bg-success">Sí</span>
                                @else
                                    <span class="badge bg-danger">No</span>
                                @endif
                            </li>
                        </ul>

                        <div class="d-flex justify-content-between">
                            <button class="btn btn-outline-primary btn-sm">
                                Ver perfil
                            </button>
                            <button class="btn btn-outline-secondary btn-sm">
                                Editar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        @endforeach
    </div>

</div>

</body>
</html>