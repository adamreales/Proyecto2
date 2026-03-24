<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlataformaProducto extends Model
{
    use SoftDeletes;

    protected $table = 'plataforma_producto';

    protected $fillable = [
        'producto_id',
        'plataforma_id',
        'stock'
    ];

    public function doProducto(){
        return $this->belongsTo(Producto::class);
    }

    public function doPlataforma(){
        return $this->belongsTo(Plataforma::class);
    }
}