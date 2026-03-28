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
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pedido')->unique()->constrained('pedidos')->cascadeOnDelete();
            $table->string('numero_factura')->unique();
            $table->timestamp('fecha_emision');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('iva_porcentaje', 5, 2)->default(21.00);
            $table->decimal('iva_total', 10, 2);
            $table->decimal('total', 10, 2);
            $table->string('pdf_path')->nullable();
            $table->boolean('enviado_por_email')->default(false);
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
        Schema::dropIfExists('facturas');
    }
};
