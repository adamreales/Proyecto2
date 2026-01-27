<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JuegoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('juego')->insert([
            [
                'id_producto' => 1, // Hollow Knight
            ],
            [
                'id_producto' => 2, // Zelda BOTW
            ],
            [
                'id_producto' => 3, // Elden Ring
            ],
            [
                'id_producto' => 4, // FIFA 25
            ],
            [
                'id_producto' => 5, // Mario Kart 8
            ],
        ]);
    }
}
