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
            $table->id();
        
            $table->foreignId('id_juego')
                ->constrained('juego')
                ->cascadeOnDelete();
        
            $table->foreignId('id_edad_pegi')
                ->constrained('edad_pegi');
        
            $table->foreignId('id_desc_pegi')
                ->constrained('descripcion_pegi');
        
            $table->timestamps();
        
            $table->unique(['id_juego', 'id_edad_pegi', 'id_desc_pegi']);
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
