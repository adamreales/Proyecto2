<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            // Datos base
            EdadPegiSeeder::class,
            DescripcionPegiSeeder::class,
            PlataformaSeeder::class,
            CategoriaSeeder::class,

            // Usuarios
            UsuarioSeeder::class,

            // Productos y juegos
            ProductoSeeder::class,
            ImagenProductoSeeder::class,
            JuegoSeeder::class,

            // Tablas pivote
            CategoriaProductoSeeder::class,
            PlataformaJuegoSeeder::class,
            JuegoPegiSeeder::class,

            // Valoraciones (al final)
            ValoracionSeeder::class,
        ]);
    }
}