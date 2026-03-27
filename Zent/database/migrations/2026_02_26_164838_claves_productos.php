<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
            Schema::create('claves_producto', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plataforma_producto_id')
                ->constrained('plataforma_producto')
                ->cascadeOnDelete();

            $table->string('clave')->unique();
            $table->boolean('vendida')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
