<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImagenProducto extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "imagen_producto";

    protected $fillable = ["id_producto","url"];

    public function doProducto(){
        return $this->belongsTo(Producto::class,'id_producto');
    }

}