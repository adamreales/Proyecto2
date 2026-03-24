<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlataformaProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plataforma_producto')->insert([

            ['plataforma_id'=>1,'producto_id'=>1,'stock'=>10],
            ['plataforma_id'=>4,'producto_id'=>1,'stock'=>5],

            ['plataforma_id'=>4,'producto_id'=>2,'stock'=>8],

            ['plataforma_id'=>1,'producto_id'=>3,'stock'=>7],
            ['plataforma_id'=>2,'producto_id'=>3,'stock'=>6],
            ['plataforma_id'=>3,'producto_id'=>3,'stock'=>9],

            ['plataforma_id'=>1,'producto_id'=>4,'stock'=>15],
            ['plataforma_id'=>2,'producto_id'=>4,'stock'=>10],
            ['plataforma_id'=>3,'producto_id'=>4,'stock'=>12],

            ['plataforma_id'=>4,'producto_id'=>5,'stock'=>20],

            ['plataforma_id'=>1,'producto_id'=>6,'stock'=>25],
            ['plataforma_id'=>2,'producto_id'=>6,'stock'=>20],
            ['plataforma_id'=>3,'producto_id'=>6,'stock'=>30],
            ['plataforma_id'=>4,'producto_id'=>6,'stock'=>15],

            ['plataforma_id'=>1,'producto_id'=>12,'stock'=>20],
            ['plataforma_id'=>2,'producto_id'=>12,'stock'=>15],

            ['plataforma_id'=>1,'producto_id'=>13,'stock'=>18],
            ['plataforma_id'=>2,'producto_id'=>13,'stock'=>12],

            ['plataforma_id'=>1,'producto_id'=>14,'stock'=>25],
            ['plataforma_id'=>4,'producto_id'=>14,'stock'=>10],

            ['plataforma_id'=>2,'producto_id'=>15,'stock'=>14],

            ['plataforma_id'=>3,'producto_id'=>16,'stock'=>22],
        ]);
    }
}
