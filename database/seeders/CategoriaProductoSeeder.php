<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categoria_producto')->insert([
            // Hollow Knight
            [
                'id_producto' => 1,
                'id_categoria' => 1, // Acción
            ],
            [
                'id_producto' => 1,
                'id_categoria' => 2, // Aventura
            ],

            // Zelda BOTW
            [
                'id_producto' => 2,
                'id_categoria' => 2, // Aventura
            ],
            [
                'id_producto' => 2,
                'id_categoria' => 3, // RPG
            ],

            // Elden Ring
            [
                'id_producto' => 3,
                'id_categoria' => 1, // Acción
            ],
            [
                'id_producto' => 3,
                'id_categoria' => 3, // RPG
            ],

            // FIFA 25
            [
                'id_producto' => 4,
                'id_categoria' => 4, // Deportes
            ],

            // Mario Kart 8
            [
                'id_producto' => 5,
                'id_categoria' => 7, // Carreras
            ],
        ]);

    }
}
