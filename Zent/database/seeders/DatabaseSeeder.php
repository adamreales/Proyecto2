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
            UserSeeder::class,

            // Productos y juegos
            ProductoSeeder::class,
            ImagenProductoSeeder::class,

            // Tablas pivote
            CategoriaProductoSeeder::class,
            PlataformaProductoSeeder::class,

            // Valoraciones (al final)
            ValoracionSeeder::class,
        ]);
    }
}