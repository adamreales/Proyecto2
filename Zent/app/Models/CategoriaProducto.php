<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use App\Models\Categoria;

class CategoriaProducto extends Model
{
    use HasFactory;

    protected $table = "categoria_producto";

    protected $fillable = ["id_producto","id_categoria"];

    public function doProducto(){
        return $this->belongsTo(Producto::class,'id_producto');
    }

    public function doCategoria(){
        return $this->belongsTo(Categoria::class,'id_categoria');
    }

}