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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_usuario')->nullable()->constrained('users')->nullOnDelete();
            $table->uuid('session_id')->nullable();
            $table->decimal('total',10,2);
            $table->enum('estado',['pendiente','pagado','cancelado','fallido'])->default('pendiente');
            $table->string('stripe_session_id')->nullable();
            $table->string('stripe_payment_intent')->nullable();
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
        Schema::dropIfExists('pedidos');
    }
};
