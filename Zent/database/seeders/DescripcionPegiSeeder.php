<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DescripcionPegiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('descripcion_pegi')->insert([
            [
                'nombre' => 'Mal lenguaje',
                'descripcion' => 'Uso frecuente de lenguaje vulgar o malsonante'
            ],
            [
                'nombre' => 'Violencia',
                'descripcion' => 'Escenas de violencia contra personas o animales'
            ],
            [
                'nombre' => 'Miedo',
                'descripcion' => 'Escenas que pueden causar miedo o ansiedad'
            ],
            [
                'nombre' => 'Drogas',
                'descripcion' => 'Referencias o consumo de drogas ilegales'
            ],
            [
                'nombre' => 'Sexo',
                'descripcion' => 'Referencias sexuales o desnudos explícitos'
            ],
            [
                'nombre' => 'Apuestas',
                'descripcion' => 'Simulación o promoción de juegos de azar'
            ],
        ]);
    }
}
