<?php

namespace Database\Seeders;

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
                'descripcion' => 'Apto para todos los públicos',
            ],
            [
                'edad' => 7,
                'descripcion' => 'Puede contener escenas o sonidos potencialmente aterradores',
            ],
            [
                'edad' => 12,
                'descripcion' => 'Violencia leve, lenguaje moderado',
            ],
            [
                'edad' => 16,
                'descripcion' => 'Violencia realista o contenido sexual leve',
            ],
            [
                'edad' => 18,
                'descripcion' => 'Violencia extrema, contenido sexual explícito o drogas',
            ],
        ]);
    }
}
