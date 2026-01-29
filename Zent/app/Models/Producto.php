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

    protected $fillable = ["titulo","subtitulo","descripcion","precio","valoracion","stock"];

    public function doJuego(){
        return $this->hasOne(Juego::class,'id_producto');
    }

    public function doValoraciones(){
        return $this->hasMany(Valoracion::class,'id_producto');
    }

    public function doImagenes(){
        return $this->hasMany(ImagenProducto::class,'id_producto');
    }

    public function doCategoriasProducto(){
        return $this->hasMany(CategoriaProducto::class,'id_producto');
    }

    public function doCategorias()
    {
        return $this->belongsToMany(Categoria::class);
    }

}
