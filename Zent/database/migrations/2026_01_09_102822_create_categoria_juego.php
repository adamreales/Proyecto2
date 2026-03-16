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
        Schema::create('categoria_juego', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->unsignedBigInteger('categoria_id');
            $table->unsignedBigInteger('juego_id');

            $table->primary(['categoria_id', 'juego_id']);
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
        Schema::dropIfExists('categoria_juego');
    }
};
