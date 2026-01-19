<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JuegoPegiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('juego_pegi')->insert([
            // Hollow Knight (PEGI 7)
            [
                'id_juego' => 1,
                'id_edad_pegi' => 2, // 7
                'id_desc_pegi' => 2, // Violencia
            ],
            [
                'id_juego' => 1,
                'id_edad_pegi' => 2,
                'id_desc_pegi' => 3, // Miedo
            ],

            // Zelda BOTW (PEGI 12)
            [
                'id_juego' => 2,
                'id_edad_pegi' => 3, // 12
                'id_desc_pegi' => 2, // Violencia leve
            ],

            // Elden Ring (PEGI 18)
            [
                'id_juego' => 3,
                'id_edad_pegi' => 5, // 18
                'id_desc_pegi' => 2, // Violencia
            ],
            [
                'id_juego' => 3,
                'id_edad_pegi' => 5,
                'id_desc_pegi' => 1, // Mal lenguaje
            ],

            // FIFA 25 (PEGI 3)
            [
                'id_juego' => 4,
                'id_edad_pegi' => 1, // 3
                'id_desc_pegi' => 6, // Apuestas (sobres, packs, etc.)
            ],

            // Mario Kart 8 (PEGI 3)
            [
                'id_juego' => 5,
                'id_edad_pegi' => 1, // 3
                'id_desc_pegi' => 3, // Miedo leve (muy suave, solo ejemplo)
            ],
        ]);
    }
}
