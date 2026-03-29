<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\PlataformaProducto;

class PlataformaProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $datos = [

            // Hollow Knight
            ['plataforma_id'=>1,'producto_id'=>1,'stock'=>10],
            ['plataforma_id'=>2,'producto_id'=>1,'stock'=>8],
            ['plataforma_id'=>3,'producto_id'=>1,'stock'=>9],
            ['plataforma_id'=>4,'producto_id'=>1,'stock'=>5],
            ['plataforma_id'=>5,'producto_id'=>1,'stock'=>5],

            // Zelda BOTW (Nintendo only)
            ['plataforma_id'=>4,'producto_id'=>2,'stock'=>8],
            ['plataforma_id'=>5,'producto_id'=>2,'stock'=>6],

            // Elden Ring
            ['plataforma_id'=>1,'producto_id'=>3,'stock'=>7],
            ['plataforma_id'=>2,'producto_id'=>3,'stock'=>6],
            ['plataforma_id'=>3,'producto_id'=>3,'stock'=>9],

            // FIFA 25
            ['plataforma_id'=>1,'producto_id'=>4,'stock'=>15],
            ['plataforma_id'=>2,'producto_id'=>4,'stock'=>10],
            ['plataforma_id'=>3,'producto_id'=>4,'stock'=>12],
            ['plataforma_id'=>4,'producto_id'=>4,'stock'=>8],
            ['plataforma_id'=>5,'producto_id'=>4,'stock'=>8],

            // Mario Kart 8
            ['plataforma_id'=>4,'producto_id'=>5,'stock'=>20],
            ['plataforma_id'=>5,'producto_id'=>5,'stock'=>15],

            // Minecraft
            ['plataforma_id'=>1,'producto_id'=>6,'stock'=>25],
            ['plataforma_id'=>2,'producto_id'=>6,'stock'=>20],
            ['plataforma_id'=>3,'producto_id'=>6,'stock'=>30],
            ['plataforma_id'=>4,'producto_id'=>6,'stock'=>15],
            ['plataforma_id'=>5,'producto_id'=>6,'stock'=>15],

            // Animal Crossing (Nintendo only)
            ['plataforma_id'=>4,'producto_id'=>7,'stock'=>18],
            ['plataforma_id'=>5,'producto_id'=>7,'stock'=>12],

            // Witcher 3
            ['plataforma_id'=>1,'producto_id'=>8,'stock'=>20],
            ['plataforma_id'=>2,'producto_id'=>8,'stock'=>18],
            ['plataforma_id'=>3,'producto_id'=>8,'stock'=>16],
            ['plataforma_id'=>4,'producto_id'=>8,'stock'=>10],

            // Stardew Valley
            ['plataforma_id'=>1,'producto_id'=>9,'stock'=>25],
            ['plataforma_id'=>2,'producto_id'=>9,'stock'=>20],
            ['plataforma_id'=>3,'producto_id'=>9,'stock'=>22],
            ['plataforma_id'=>4,'producto_id'=>9,'stock'=>18],
            ['plataforma_id'=>5,'producto_id'=>9,'stock'=>18],

            // Celeste
            ['plataforma_id'=>1,'producto_id'=>10,'stock'=>20],
            ['plataforma_id'=>2,'producto_id'=>10,'stock'=>15],
            ['plataforma_id'=>3,'producto_id'=>10,'stock'=>15],
            ['plataforma_id'=>4,'producto_id'=>10,'stock'=>12],

            // Arc Raiders (PC + consolas modernas)
            ['plataforma_id'=>1,'producto_id'=>11,'stock'=>12],
            ['plataforma_id'=>2,'producto_id'=>11,'stock'=>10],
            ['plataforma_id'=>3,'producto_id'=>11,'stock'=>11],

            // Cyberpunk
            ['plataforma_id'=>1,'producto_id'=>12,'stock'=>20],
            ['plataforma_id'=>2,'producto_id'=>12,'stock'=>15],
            ['plataforma_id'=>3,'producto_id'=>12,'stock'=>18],

            // RDR2
            ['plataforma_id'=>1,'producto_id'=>13,'stock'=>18],
            ['plataforma_id'=>2,'producto_id'=>13,'stock'=>12],
            ['plataforma_id'=>3,'producto_id'=>13,'stock'=>14],

            // Hades
            ['plataforma_id'=>1,'producto_id'=>14,'stock'=>25],
            ['plataforma_id'=>2,'producto_id'=>14,'stock'=>18],
            ['plataforma_id'=>3,'producto_id'=>14,'stock'=>20],
            ['plataforma_id'=>4,'producto_id'=>14,'stock'=>10],
            ['plataforma_id'=>5,'producto_id'=>14,'stock'=>10],

            // Resident Evil 4 Remake
            ['plataforma_id'=>1,'producto_id'=>15,'stock'=>16],
            ['plataforma_id'=>2,'producto_id'=>15,'stock'=>14],
            ['plataforma_id'=>3,'producto_id'=>15,'stock'=>13],

            // Forza Horizon 5 (Xbox + PC)
            ['plataforma_id'=>1,'producto_id'=>16,'stock'=>22],
            ['plataforma_id'=>3,'producto_id'=>16,'stock'=>22],

            // Hollow Knight: Silksong (multiplataforma)
            ['plataforma_id'=>1,'producto_id'=>17,'stock'=>20],
            ['plataforma_id'=>2,'producto_id'=>17,'stock'=>15],
            ['plataforma_id'=>3,'producto_id'=>17,'stock'=>18],
            ['plataforma_id'=>4,'producto_id'=>17,'stock'=>12],
            ['plataforma_id'=>5,'producto_id'=>17,'stock'=>12],

        ];

        foreach ($datos as $item) {
            PlataformaProducto::create($item);
        }

    }
}
