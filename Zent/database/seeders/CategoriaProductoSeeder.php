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
            ['id_producto' => 6, 'id_categoria' => 3], // RPG (sandbox lo metemos aquí)
            ['id_producto' => 6, 'id_categoria' => 2], // Aventura

            // Animal Crossing
            ['id_producto' => 7, 'id_categoria' => 6], // Simulación

            // The Witcher 3
            ['id_producto' => 8, 'id_categoria' => 3], // RPG
            ['id_producto' => 8, 'id_categoria' => 2], // Aventura

            // Stardew Valley
            ['id_producto' => 9, 'id_categoria' => 6], // Simulación
            ['id_producto' => 9, 'id_categoria' => 2], // Aventura

            // Celeste
            ['id_producto' => 10, 'id_categoria' => 1], // Acción
            ['id_producto' => 10, 'id_categoria' => 2], // Aventura

            // Arc Raiders
            ['id_producto' => 11, 'id_categoria' => 1], // Acción
            ['id_producto' => 11, 'id_categoria' => 6], // Simulación (lo dejamos como shooter/simulación)

            // 🔥 NUEVOS PRODUCTOS

            // Cyberpunk 2077
            ['id_producto' => 12, 'id_categoria' => 3], // RPG
            ['id_producto' => 12, 'id_categoria' => 1], // Acción

            // Red Dead Redemption 2
            ['id_producto' => 13, 'id_categoria' => 2], // Aventura
            ['id_producto' => 13, 'id_categoria' => 1], // Acción

            // Hades
            ['id_producto' => 14, 'id_categoria' => 1], // Acción
            ['id_producto' => 14, 'id_categoria' => 3], // RPG

            // Resident Evil 4 Remake
            ['id_producto' => 15, 'id_categoria' => 1], // Acción
            ['id_producto' => 15, 'id_categoria' => 2], // Aventura

            // Forza Horizon 5
            ['id_producto' => 16, 'id_categoria' => 7], // Carreras
        ]);
    }

}
