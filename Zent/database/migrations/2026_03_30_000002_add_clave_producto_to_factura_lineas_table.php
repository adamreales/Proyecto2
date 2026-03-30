<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('factura_lineas', function (Blueprint $table) {
            $table->string('clave_producto')->nullable()->after('plataforma');
        });
    }

    public function down()
    {
        Schema::table('factura_lineas', function (Blueprint $table) {
            $table->dropColumn('clave_producto');
        });
    }
};
