<?php

namespace Database\Seeders;

use App\Models\Valoracion;
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
        Valoracion::create([
            'id_usuario' => 1,
            'id_producto' => 1,
            'estrellas' => 5,
            'comentario' => 'Desde que juegue este juego me converti en masoquista y amante de sufrir en videojuegos, quitando eso gran historia, jugabilidad, banda sonora (bendita ciudad de lagrimas y mantis), buenos jefes sobre todo markoz. En definitiva juegazo recomendado para todos 10/10'
        ]);
    }
}
