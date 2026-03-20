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
        Schema::create('producto', function (Blueprint $table) {
            $table->id();
            $table->string("titulo",100);
            $table->string("subtitulo",150);
            $table->string("descripcion")->nullable();
            $table->unsignedFloat("precio",8,2);
            $table->unsignedInteger("valoracion");
            $table->unsignedInteger("ventas")->default(0);
            $table->unsignedInteger("stock");
            $table->foreignId('pegi_id')->nullable()->constrained('edad_pegi')->nullOnDelete();
            $table->timestamps();
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
        Schema::dropIfExists('producto');
    }
};
