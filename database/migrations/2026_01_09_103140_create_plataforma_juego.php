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
            $table->foreignId('id_juego')
                ->constrained('juego')
                ->cascadeOnDelete();

            $table->foreignId('id_plataforma')
                ->constrained('plataforma')
                ->cascadeOnDelete();

            $table->primary(['id_juego', 'id_plataforma']);
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
