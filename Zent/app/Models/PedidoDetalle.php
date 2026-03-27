<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PedidoDetalle extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pedido_detalles';

    protected $fillable = ['id_pedido','id_producto','id_clave','precio_unitario','subtotal'];

    public function doPedido(){
        return $this->belongsTo(Pedido::class,'id_pedido');
    }
    public function doProducto(){
        return $this->belongsTo(Producto::class,'id_producto');
    }
}
