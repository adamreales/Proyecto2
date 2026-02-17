<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Juego;
use App\Models\Valoracion;
use App\Models\ImagenProducto;
use App\Models\CategoriaProducto;

class Producto extends Model
{
    use HasFactory;

    protected $table = "producto";

    protected $fillable = ["titulo","subtitulo","descripcion","precio","valoracion","stock","ventas"];

    public function doJuego(){
        return $this->hasOne(Juego::class,'id_producto');
    }

    public function doValoraciones(){
        return $this->hasMany(Valoracion::class,'id_producto');
    }

    public function doImagenes(){
        return $this->hasMany(ImagenProducto::class,'id_producto');
    }

    public function doCategorias(){
        return $this->belongsToMany(
            Categoria::class,
            'categoria_producto',
            'id_producto',
            'id_categoria'
        );
    }


}