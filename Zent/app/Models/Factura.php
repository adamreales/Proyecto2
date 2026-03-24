<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    use HasFactory;

    protected $table = 'facturas';

    protected $fillable = ['id_pedido', 'total'];

    public function doPedido()
    {
        return $this->belongsTo(Pedido::class, 'id_pedido');
    }

    public function doLineas()
    {
        return $this->hasMany(FacturaLinea::class, 'id_factura');
    }
}
