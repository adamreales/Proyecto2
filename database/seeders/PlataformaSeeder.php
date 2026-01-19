<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlataformaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plataforma')->insert([
            ['nombre' => 'PC'],
            ['nombre' => 'PlayStation 5'],
            ['nombre' => 'Xbox Series X|S'],
            ['nombre' => 'Nintendo Switch'],
            ['nombre' => 'Nintendo Switch 2'],
        ]);
    }
}
