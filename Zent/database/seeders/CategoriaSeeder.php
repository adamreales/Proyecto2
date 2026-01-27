<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categoria')->insert([
            [
                'nombre' => 'Acción',
                'descripcion' => 'Juegos centrados en combates rápidos y reflejos'
            ],
            [
                'nombre' => 'Aventura',
                'descripcion' => 'Exploración, historia y resolución de puzles'
            ],
            [
                'nombre' => 'RPG',
                'descripcion' => 'Desarrollo de personajes y progresión de habilidades'
            ],
            [
                'nombre' => 'Deportes',
                'descripcion' => 'Simulación y juegos deportivos'
            ],
            [
                'nombre' => 'Estrategia',
                'descripcion' => 'Planificación, gestión de recursos y toma de decisiones'
            ],
            [
                'nombre' => 'Simulación',
                'descripcion' => 'Experiencias realistas o de gestión'
            ],
            [
                'nombre' => 'Carreras',
                'descripcion' => 'Competición de velocidad y conducción'
            ],
        ]);
    }
}
