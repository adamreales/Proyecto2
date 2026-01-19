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
        Schema::create('categoria_producto', function (Blueprint $table) {
            $table->foreignId('id_producto')
                ->constrained('producto')
                ->cascadeOnDelete();
            $table->foreignId('id_categoria')
                ->constrained('categoria')
                ->cascadeOnDelete();
            $table->primary(['id_producto','id_categoria']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categoria_producto');
    }
};
