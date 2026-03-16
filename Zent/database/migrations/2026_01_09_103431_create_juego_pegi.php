<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('juego_pegi', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->unsignedBigInteger('juego_id');
            $table->unsignedBigInteger('edad_pegi_id');

            $table->primary(['juego_id', 'edad_pegi_id']);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('juego_pegi');
    }
};
