<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ValoracionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('valoracion')->insert([
            [
                'id_usuario' => 1, // Adrian
                'id_producto' => 1, // Hollow Knight
                'estrellas' => 5,
                'comentario' => 'Obra maestra, ambientación y jugabilidad increíbles',
            ],
            [
                'id_usuario' => 1,
                'id_producto' => 3, // Elden Ring
                'estrellas' => 4,
                'comentario' => 'Muy desafiante, pero extremadamente bueno',
            ],
            [
                'id_usuario' => 2, // Laura
                'id_producto' => 2, // Zelda BOTW
                'estrellas' => 5,
                'comentario' => 'Libertad total y mundo espectacular',
            ],
            [
                'id_usuario' => 2,
                'id_producto' => 5, // Mario Kart 8
                'estrellas' => 4,
                'comentario' => 'Muy divertido para jugar en grupo',
            ],
            [
                'id_usuario' => 3, // Carlos (no validado)
                'id_producto' => 4, // FIFA 25
                'estrellas' => 3,
                'comentario' => 'Está bien, pero podría mejorar',
            ],
        ]);
    }
}
