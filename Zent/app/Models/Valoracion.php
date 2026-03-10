<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Valoracion extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "valoracion";

    protected $fillable = ["estrellas","comentario","id_usuario","id_producto"];

    public function doUsuario(){
        return $this->belongsTo(User::class,"id_usuario");
    }

    public function doProducto(){
        return $this->belongsTo(Producto::class,"id_producto");
    }

}
