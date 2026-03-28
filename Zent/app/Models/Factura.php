<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    use HasFactory;

    protected $table = 'facturas';

    protected $fillable = [
        'id_pedido',
        'numero_factura',
        'fecha_emision',
        'subtotal',
        'iva_porcentaje',
        'iva_total',
        'total',
        'pdf_path',
        'enviado_por_email',
    ];

    protected $casts = [
        'fecha_emision' => 'datetime',
        'enviado_por_email' => 'boolean',
    ];

    public function doPedido()
    {
        return $this->belongsTo(Pedido::class, 'id_pedido');
    }

    public function doLineas()
    {
        return $this->hasMany(FacturaLinea::class, 'id_factura');
    }
}
