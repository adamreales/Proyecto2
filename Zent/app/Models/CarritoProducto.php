<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CarritoProducto extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "carrito_producto";

    protected $fillable = ["id_carrito", "plataforma_producto_id", "cantidad"];

    public function doProducto(){
        return $this->belongsTo(Producto::class,'id_producto');
    }

    public function doPlataformaProducto(){
        return $this->belongsTo(PlataformaProducto::class, 'plataforma_producto_id');
    }

}
