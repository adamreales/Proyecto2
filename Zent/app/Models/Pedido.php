<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedido extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pedidos';

    protected $fillable = ['id_usuario','session_id','id_carrito','total','estado','stripe_session_id','stripe_payment_intent'];

    public function doDetalles(){
        return $this->hasMany(PedidoDetalle::class,'id_pedido');
    }

    public function doUsuario(){
        return $this->belongsTo(User::class,'id_usuario','id');
    }

    public function doFactura(){
        return $this->hasOne(Factura::class,'id_pedido');
    }

}
