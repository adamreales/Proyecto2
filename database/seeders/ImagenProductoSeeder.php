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
                'url' => 'images/productos/hk1.jpg'
            ],
            [
                'id_producto' => 1,
                'url' => 'images/productos/hk2.jpg'
            ],
            [
                'id_producto' => 2,
                'url' => 'images/productos/zelda_botw.jpg'
            ],
            [
                'id_producto' => 3,
                'url' => 'images/productos/elden_ring.jpg'
            ],
            [
                'id_producto' => 4,
                'url' => 'images/productos/fc25.jpg'
            ],
            [
                'id_producto' => 5,
                'url' => 'images/productos/mk8.jpg'
            ]
        ]);
    }
}
