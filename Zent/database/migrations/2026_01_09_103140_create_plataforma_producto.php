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
        Schema::create('plataforma_producto', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->foreignId('producto_id')
                ->constrained('producto')
                ->cascadeOnDelete();

            $table->foreignId('plataforma_id')
                ->constrained('plataforma')
                ->cascadeOnDelete();

            $table->primary(['producto_id', 'plataforma_id']);
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
        Schema::dropIfExists('plataforma_producto');
    }
};
