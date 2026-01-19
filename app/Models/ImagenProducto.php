<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;

class ImagenProducto extends Model
{
    use HasFactory;

    protected $table = "imagen_producto";

    protected $fillable = ["id_producto","url"];

    public function doProducto(){
        return $this->belongsTo(Producto::class,'id_producto');
    }

}