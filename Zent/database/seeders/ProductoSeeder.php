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
                'pegi_id' => 2,
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
                'pegi_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Elden Ring',
                'pegi_id' => 4,
                'subtitulo' => 'Levántate, Sinluz',
                'descripcion' => 'Un RPG de acción desafiante',
                'precio' => 49,
                'valoracion' => 4.8,
                'ventas' => 3000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'FIFA 25',
                'subtitulo' => 'La nueva era del fútbol',
                'descripcion' => 'Simulador de fútbol',
                'precio' => 69,
                'valoracion' => 3,
                'ventas' => 700,
                'pegi_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Mario Kart 8 Deluxe',
                'subtitulo' => 'Carreras para todos',
                'descripcion' => 'Carreras frenéticas',
                'precio' => 49,
                'valoracion' => 4.5,
                'ventas' => 2000,
                'pegi_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Minecraft',
                'subtitulo' => 'Construye tu mundo',
                'descripcion' => 'Sandbox',
                'precio' => 20,
                'valoracion' => 5,
                'ventas' => 100000,
                'pegi_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Animal Crossing: New Leaf',
                'subtitulo' => 'Vive a tu ritmo',
                'descripcion' => 'Simulación social',
                'precio' => 25,
                'valoracion' => 4,
                'ventas' => 60000,
                'pegi_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'The Witcher 3: Wild Hunt',
                'subtitulo' => 'Cazador de monstruos',
                'descripcion' => 'RPG profundo',
                'precio' => 30,
                'valoracion' => 5,
                'ventas' => 90000,
                'pegi_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Stardew Valley',
                'subtitulo' => 'Vida rural',
                'descripcion' => 'Simulador',
                'precio' => 15,
                'valoracion' => 5,
                'ventas' => 70000,
                'pegi_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Celeste',
                'subtitulo' => 'Escala la montaña',
                'descripcion' => 'Plataformas',
                'precio' => 18,
                'valoracion' => 5,
                'ventas' => 45000,
                'pegi_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Arc Raiders',
                'subtitulo' => 'Supervivencia',
                'descripcion' => 'Shooter',
                'precio' => 40,
                'valoracion' => 5,
                'ventas' => 15000,
                'pegi_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],

            // 🔥 NUEVOS 5 PRODUCTOS

            [
                'titulo' => 'Cyberpunk 2077',
                'subtitulo' => 'Futuro distópico',
                'descripcion' => 'RPG futurista',
                'precio' => 39,
                'valoracion' => 4,
                'ventas' => 80000,
                'pegi_id' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Red Dead Redemption 2',
                'subtitulo' => 'Viejo oeste',
                'descripcion' => 'Aventura narrativa',
                'precio' => 35,
                'valoracion' => 5,
                'ventas' => 120000,
                'pegi_id' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Hades',
                'subtitulo' => 'Escapa del inframundo',
                'descripcion' => 'Roguelike',
                'precio' => 20,
                'valoracion' => 5,
                'ventas' => 50000,
                'pegi_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Resident Evil 4 Remake',
                'subtitulo' => 'Horror renovado',
                'descripcion' => 'Survival horror',
                'precio' => 50,
                'valoracion' => 5,
                'ventas' => 60000,
                'pegi_id' => 5,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'titulo' => 'Forza Horizon 5',
                'subtitulo' => 'Carreras en México',
                'descripcion' => 'Simulación de conducción',
                'precio' => 45,
                'valoracion' => 4.7,
                'ventas' => 90000,
                'pegi_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
