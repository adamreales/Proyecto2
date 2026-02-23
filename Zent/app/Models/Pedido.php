<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';

    protected $fillable = ['id_usuario','total','estado','stripe_session_id','stripe_payment_intent'];

    public function doDetalles(){
        return $this->hasMany(PedidoDetalle::class,'id_pedido');
    }

    public function doUsuario(){
        return $this->belongsTo(User::class,'id_usuario');
    }

}
