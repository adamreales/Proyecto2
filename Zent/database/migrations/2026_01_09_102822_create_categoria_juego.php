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
            $table->foreignId('id_juego')
                ->constrained('juego')
                ->cascadeOnDelete();

            $table->foreignId('id_categoria')
                ->constrained('categoria')
                ->cascadeOnDelete();

            $table->primary(['id_juego', 'id_categoria']);
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
