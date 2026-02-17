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
            ['juego_id' => 1, 'edad_pegi_id' => 2],

            // Zelda BOTW (PEGI 12)
            ['juego_id' => 2, 'edad_pegi_id' => 3],

            // Elden Ring (PEGI 18)
            ['juego_id' => 3, 'edad_pegi_id' => 5],

            // FIFA 25 (PEGI 3)
            ['juego_id' => 4, 'edad_pegi_id' => 1],

            // Mario Kart 8 (PEGI 3)
            ['juego_id' => 5, 'edad_pegi_id' => 1],

            ['juego_id' => 6, 'edad_pegi_id' => 1], // Minecraft
            ['juego_id' => 7, 'edad_pegi_id' => 1], // Animal Crossing
            ['juego_id' => 8, 'edad_pegi_id' => 4], // Witcher 3
            ['juego_id' => 9, 'edad_pegi_id' => 1], // Stardew Valley
            ['juego_id' => 10, 'edad_pegi_id' => 2], // Celeste
            ['juego_id' => 11, 'edad_pegi_id' => 3], // Arc Raiders

        ]);
    }
}
