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
            ['plataforma_id' => 1, 'juego_id' => 1], // PC
            ['plataforma_id' => 4, 'juego_id' => 1], // Nintendo Switch

            // Zelda BOTW
            ['plataforma_id' => 4, 'juego_id' => 2], // Nintendo Switch

            // Elden Ring
            ['plataforma_id' => 1, 'juego_id' => 3], // PC
            ['plataforma_id' => 2, 'juego_id' => 3], // PS5
            ['plataforma_id' => 3, 'juego_id' => 3], // Xbox

            // FIFA 25
            ['plataforma_id' => 1, 'juego_id' => 4], // PC
            ['plataforma_id' => 2, 'juego_id' => 4], // PS5
            ['plataforma_id' => 3, 'juego_id' => 4], // Xbox

            // Mario Kart 8
            ['plataforma_id' => 4, 'juego_id' => 5], // Nintendo Switch

            // Minecraft
            ['plataforma_id' => 1, 'juego_id' => 6],
            ['plataforma_id' => 2, 'juego_id' => 6],
            ['plataforma_id' => 3, 'juego_id' => 6],
            ['plataforma_id' => 4, 'juego_id' => 6],

            // Animal Crossing
            ['plataforma_id' => 4, 'juego_id' => 7],

            // The Witcher 3
            ['plataforma_id' => 1, 'juego_id' => 8],
            ['plataforma_id' => 2, 'juego_id' => 8],
            ['plataforma_id' => 3, 'juego_id' => 8],

            // Stardew Valley
            ['plataforma_id' => 1, 'juego_id' => 9],
            ['plataforma_id' => 4, 'juego_id' => 9],

            // Celeste
            ['plataforma_id' => 1, 'juego_id' => 10],
            ['plataforma_id' => 4, 'juego_id' => 10],

            // Arc Raiders
            ['plataforma_id' => 1, 'juego_id' => 11],
            ['plataforma_id' => 2, 'juego_id' => 11],
            ['plataforma_id' => 3, 'juego_id' => 11],

        ]);
    }
}
