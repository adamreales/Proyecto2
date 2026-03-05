<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoDetalle extends Model
{
    use HasFactory;

    protected $table = 'pedido_detalles';

    protected $fillable = ['id_pedido','id_producto','precio_unitario','cantidad','subtotal'];

    public function doPedido(){
        return $this->belongsTo(Pedido::class,'id_pedido');
    }
    public function doProducto(){
        return $this->belongsTo(Producto::class,'id_producto');
    }
}
