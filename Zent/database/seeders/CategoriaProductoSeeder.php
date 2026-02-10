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
            ['id_producto' => 1, 'id_categoria' => 1], // Acción
            ['id_producto' => 1, 'id_categoria' => 2], // Aventura

            // Zelda BOTW
            ['id_producto' => 2, 'id_categoria' => 2], // Aventura
            ['id_producto' => 2, 'id_categoria' => 3], // RPG

            // Elden Ring
            ['id_producto' => 3, 'id_categoria' => 1], // Acción
            ['id_producto' => 3, 'id_categoria' => 3], // RPG

            // FIFA 25
            ['id_producto' => 4, 'id_categoria' => 4], // Deportes

            // Mario Kart 8
            ['id_producto' => 5, 'id_categoria' => 7], // Carreras
            
            // Minecraft
            ['id_producto' => 6, 'id_categoria' => 3],
            ['id_producto' => 6, 'id_categoria' => 2],

            // Animal Crossing
            ['id_producto' => 7, 'id_categoria' => 5],

            // The Witcher 3
            ['id_producto' => 8, 'id_categoria' => 4],
            ['id_producto' => 8, 'id_categoria' => 2],

            // Stardew Valley
            ['id_producto' => 9, 'id_categoria' => 5],
            ['id_producto' => 9, 'id_categoria' => 2],

            // Celeste
            ['id_producto' => 10, 'id_categoria' => 1],
            ['id_producto' => 10, 'id_categoria' => 2],
        ]);
    }

}
