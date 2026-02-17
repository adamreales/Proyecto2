<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImagenProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('imagen_producto')->insert([
            [
                'id_producto' => 1,
                'url' => 'imagenes_producto/hk1.jpg'
            ],
            [
                'id_producto' => 1,
                'url' => 'imagenes_producto/hk2.jpg'
            ],
            [
                'id_producto' => 1,
                'url' => 'imagenes_producto/hk3.jpg'
            ],
            [
                'id_producto' => 1,
                'url' => 'imagenes_producto/hk4.jpg'
            ],
            [
                'id_producto' => 2,
                'url' => 'imagenes_producto/botw1.jpg'
            ],
            [
                'id_producto' => 2,
                'url' => 'imagenes_producto/botw2.jpg'
            ],
            [
                'id_producto' => 2,
                'url' => 'imagenes_producto/botw3.webp'
            ],
            [
                'id_producto' => 2,
                'url' => 'imagenes_producto/botw4.jpg'
            ],
            [
                'id_producto' => 3,
                'url' => 'imagenes_producto/eldenring1.webp'
            ],
            [
                'id_producto' => 3,
                'url' => 'imagenes_producto/eldenring2.webp'
            ],
            [
                'id_producto' => 3,
                'url' => 'imagenes_producto/eldenring3.webp'
            ],
            [
                'id_producto' => 3,
                'url' => 'imagenes_producto/eldenring4.avif'
            ],
            [
                'id_producto' => 4,
                'url' => 'imagenes_producto/fifa251.jpg'
            ],
            [
                'id_producto' => 4,
                'url' => 'imagenes_producto/fifa252.jpg'
            ],
            [
                'id_producto' => 4,
                'url' => 'imagenes_producto/fifa253.jpg'
            ],
            [
                'id_producto' => 4,
                'url' => 'imagenes_producto/fifa254.jpg'
            ],
            [
                'id_producto' => 5,
                'url' => 'imagenes_producto/mk8deluxe1.jpg'
            ],
            [
                'id_producto' => 5,
                'url' => 'imagenes_producto/mk8deluxe2.jpg'
            ],
            [
                'id_producto' => 5,
                'url' => 'imagenes_producto/mk8deluxe3.jpg'
            ],
            [
                'id_producto' => 5,
                'url' => 'imagenes_producto/mk8deluxe4.jpg'
            ],
            [
                'id_producto' => 6, 
                'url' => 'imagenes_producto/minecraft1.jpg'
            ],
            [
                'id_producto' => 6, 
                'url' => 'imagenes_producto/minecraft2.jfif'
            ],
            [
                'id_producto' => 6, 
                'url' => 'imagenes_producto/minecraft3.jpg'
            ],
            [
                'id_producto' => 6, 
                'url' => 'imagenes_producto/minecraft4.jfif'
            ],
            [
                'id_producto' => 7, 
                'url' => 'imagenes_producto/animal_crossing_new_leaf1.jpg'
            ],
            [
                'id_producto' => 7, 
                'url' => 'imagenes_producto/animal_crossing_new_leaf2.jpg'
            ],
            [
                'id_producto' => 7, 
                'url' => 'imagenes_producto/animal_crossing_new_leaf3.jfif'
            ],
            [
                'id_producto' => 7, 
                'url' => 'imagenes_producto/animal_crossing_new_leaf4.jpg'
            ],
            [
                'id_producto' => 8, 
                'url' => 'imagenes_producto/witcher31.jpg'
            ],
            [
                'id_producto' => 8, 
                'url' => 'imagenes_producto/witcher32.jfif'
            ],
            [
                'id_producto' => 8, 
                'url' => 'imagenes_producto/witcher33.jpg'
            ],
            [
                'id_producto' => 8, 
                'url' => 'imagenes_producto/witcher34.jfif'
            ],
            [
                'id_producto' => 9, 
                'url' => 'imagenes_producto/stardew_valley1.jfif'
            ],
            [
                'id_producto' => 9, 
                'url' => 'imagenes_producto/stardew_valle2.jpg'
            ],
            [
                'id_producto' => 9, 
                'url' => 'imagenes_producto/stardew_valley3.webp'
            ],
            [
                'id_producto' => 9, 
                'url' => 'imagenes_producto/stardew_valley4.jfif'
            ],
            [
                'id_producto' => 10, 
                'url' => 'imagenes_producto/celeste1.jfif'
            ],
            [
                'id_producto' => 10, 
                'url' => 'imagenes_producto/celest2.jpg'
            ],
            [
                'id_producto' => 10, 
                'url' => 'imagenes_producto/celeste3.jfif'
            ],
            [
                'id_producto' => 10, 
                'url' => 'imagenes_producto/celeste4.webp'
            ],
            [
                'id_producto' => 11, 
                'url' => 'imagenes_producto/arc_raiders1.jpg'
            ],
            [
                'id_producto' => 11, 
                'url' => 'imagenes_producto/arc_raiders2.jpg'
            ],
            [
                'id_producto' => 11, 
                'url' => 'imagenes_producto/arc_raiders3.jpg'
            ],
            [
                'id_producto' => 11, 
                'url' => 'imagenes_producto/arc_raiders4.jpg'
            ],
        ]);
    }
}
