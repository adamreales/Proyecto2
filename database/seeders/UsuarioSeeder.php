<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('usuario')->insert([
            [
                'nombre' => 'Adrian',
                'apellido1' => 'Angulo',
                'apellido2' => 'Sanchez',
                'fecha_nacimiento' => '2003-05-10',
                'correo' => 'a@gmail.com',
                'contrasena' => Hash::make('1234'),
                'validado' => 1,
            ],
            [
                'nombre' => 'Laura',
                'apellido1' => 'Martinez',
                'apellido2' => 'Lopez',
                'fecha_nacimiento' => '2001-09-22',
                'correo' => 'laura@gmail.com',
                'contrasena' => Hash::make('1234'),
                'validado' => 1,
            ],
            [
                'nombre' => 'Carlos',
                'apellido1' => 'Ruiz',
                'apellido2' => 'Fernandez',
                'fecha_nacimiento' => '2005-02-15',
                'correo' => 'carlos@gmail.com',
                'contrasena' => Hash::make('1234'),
                'validado' => 0,
            ],
        ]);
    }
}
