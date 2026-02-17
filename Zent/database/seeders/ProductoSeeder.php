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
                'valoracion' => 5,
                'ventas' => 5000,
                'stock' => 20,
                'created_at' => now(),
                'updated_at' => now() 
            ],
            [
                'titulo' => 'The Legend of Zelda: Breath of the Wild',
                'subtitulo' => 'Explora Hyrule sin límites',
                'descripcion' => 'Un mundo abierto lleno de aventuras, secretos y libertad total',
                'precio' => 59,
                'valoracion' => 4.9,
                'ventas' => 7000,
                'stock' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Elden Ring',
                'subtitulo' => 'Levántate, Sinluz',
                'descripcion' => 'Un RPG de acción desafiante en un mundo creado por FromSoftware',
                'precio' => 49,
                'valoracion' => 4.8,
                'ventas' => 3000,
                'stock' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'FIFA 25',
                'subtitulo' => 'La nueva era del fútbol',
                'descripcion' => 'Simulador de fútbol con modos online y locales',
                'precio' => 69,
                'valoracion' => 3,
                'ventas' => 700,
                'stock' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Mario Kart 8 Deluxe',
                'subtitulo' => 'Carreras para todos',
                'descripcion' => 'Carreras frenéticas con personajes clásicos de Nintendo',
                'precio' => 49,
                'valoracion' => 4.5,
                'ventas' => 2000,
                'stock' => 25,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Minecraft',
                'subtitulo' => 'Construye tu propio mundo',
                'descripcion' => 'Juego sandbox de construcción, exploración y supervivencia',
                'precio' => 20,
                'valoracion' => 5,
                'ventas' => 100000,
                'stock' => 50,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Animal Crossing: New Leaf',
                'subtitulo' => 'Vive a tu ritmo',
                'descripcion' => 'Simulación social relajante en un pueblo lleno de vida',
                'precio' => 25,
                'valoracion' => 4,
                'ventas' => 60000,
                'stock' => 30,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'The Witcher 3: Wild Hunt',
                'subtitulo' => 'Conviértete en un cazador de monstruos',
                'descripcion' => 'RPG de mundo abierto con narrativa profunda y decisiones morales',
                'precio' => 30,
                'valoracion' => 5,
                'ventas' => 90000,
                'stock' => 25,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Stardew Valley',
                'subtitulo' => 'Escapa a la vida rural',
                'descripcion' => 'Simulador de granja con exploración, relaciones y gestión',
                'precio' => 15,
                'valoracion' => 5,
                'ventas' => 70000,
                'stock' => 40,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Celeste',
                'subtitulo' => 'Escala la montaña',
                'descripcion' => 'Plataformas desafiante con una fuerte narrativa emocional',
                'precio' => 18,
                'valoracion' => 5,
                'ventas' => 45000,
                'stock' => 20,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Arc Raiders',
                'subtitulo' => 'Lucha por la supervivencia',
                'descripcion' => 'Un shooter de acción en tercera persona con elementos de RPG',
                'precio' => 40,
                'valoracion' => 5,
                'ventas' => 15000,
                'stock' => 20,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
