<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EdadPegiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('edad_pegi')->insert([
            [
                'edad' => 3,
                'color' => 'verde',
                'descripcion' => 'Apto para todos los públicos',
            ],
            [
                'edad' => 7,
                'color' => 'verde',
                'descripcion' => 'Puede contener escenas o sonidos potencialmente aterradores',
            ],
            [
                'edad' => 12,
                'color' => 'amarillo',
                'descripcion' => 'Violencia leve, lenguaje moderado',
            ],
            [
                'edad' => 16,
                'color' => 'naranja',
                'descripcion' => 'Violencia realista o contenido sexual leve',
            ],
            [
                'edad' => 18,
                'color' => 'rojo',
                'descripcion' => 'Violencia extrema, contenido sexual explícito o drogas',
            ],
        ]);
    }
}
