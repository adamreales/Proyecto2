<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('producto')->insert([
            [
                'titulo' => 'Hollow Knight',
                'subtitulo' => 'Adéntrate en las profundidades del reino',
                'descripcion' => 'Un metroidvania oscuro con exploración y combates desafiantes',
                'precio' => 15,
                'valoracion' => 0,
                'stock' => 20
            ],
            [
                'titulo' => 'The Legend of Zelda: Breath of the Wild',
                'subtitulo' => 'Explora Hyrule sin límites',
                'descripcion' => 'Un mundo abierto lleno de aventuras, secretos y libertad total',
                'precio' => 59,
                'valoracion' => 0,
                'stock' => 15
            ],
            [
                'titulo' => 'Elden Ring',
                'subtitulo' => 'Levántate, Sinluz',
                'descripcion' => 'Un RPG de acción desafiante en un mundo creado por FromSoftware',
                'precio' => 49,
                'valoracion' => 0,
                'stock' => 10
            ],
            [
                'titulo' => 'FIFA 25',
                'subtitulo' => 'La nueva era del fútbol',
                'descripcion' => 'Simulador de fútbol con modos online y locales',
                'precio' => 69,
                'valoracion' => 0,
                'stock' => 30
            ],
            [
                'titulo' => 'Mario Kart 8 Deluxe',
                'subtitulo' => 'Carreras para todos',
                'descripcion' => 'Carreras frenéticas con personajes clásicos de Nintendo',
                'precio' => 49,
                'valoracion' => 0,
                'stock' => 25
            ],
        ]);
    }
}
