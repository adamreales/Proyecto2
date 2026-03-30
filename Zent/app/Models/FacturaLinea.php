<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacturaLinea extends Model
{
    use HasFactory;

    protected $table = 'factura_lineas';

    protected $fillable = [
        'id_factura',
        'nombre_producto',
        'plataforma',
        'clave_producto',
        'cantidad',
        'precio_unitario',
        'total_linea',
    ];

    public function doFactura()
    {
        return $this->belongsTo(Factura::class, 'id_factura');
    }

    public function doProducto()
    {
        return $this->belongsTo(\App\Models\Producto::class, 'id_producto');
    }

}
