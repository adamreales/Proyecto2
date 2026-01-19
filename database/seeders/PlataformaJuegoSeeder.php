<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlataformaJuegoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plataforma_juego')->insert([
            // Hollow Knight
            [
                'id_juego' => 1,
                'id_plataforma' => 1, // PC
            ],
            [
                'id_juego' => 1,
                'id_plataforma' => 4, // Nintendo Switch
            ],

            // Zelda BOTW
            [
                'id_juego' => 2,
                'id_plataforma' => 4, // Nintendo Switch
            ],

            // Elden Ring
            [
                'id_juego' => 3,
                'id_plataforma' => 1, // PC
            ],
            [
                'id_juego' => 3,
                'id_plataforma' => 2, // PS5
            ],
            [
                'id_juego' => 3,
                'id_plataforma' => 3, // Xbox
            ],

            // FIFA 25
            [
                'id_juego' => 4,
                'id_plataforma' => 1, // PC
            ],
            [
                'id_juego' => 4,
                'id_plataforma' => 2, // PS5
            ],
            [
                'id_juego' => 4,
                'id_plataforma' => 3, // Xbox
            ],

            // Mario Kart 8
            [
                'id_juego' => 5,
                'id_plataforma' => 4, // Nintendo Switch
            ],
        ]);
    }
}
