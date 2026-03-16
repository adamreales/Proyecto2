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
        Schema::create('plataforma_juego', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->unsignedBigInteger('plataforma_id');
            $table->unsignedBigInteger('juego_id');

            $table->primary(['plataforma_id', 'juego_id']);
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
        Schema::dropIfExists('plataforma_juego');
    }
};
