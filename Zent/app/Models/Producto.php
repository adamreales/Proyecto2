<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Juego;
use App\Models\Valoracion;
use App\Models\ImagenProducto;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "producto";

    protected $fillable = ["titulo","subtitulo","descripcion","precio","valoracion","stock","ventas"];
    protected $guarded = [];

    protected $casts = [
        'precio' => 'decimal:2',
        'valoracion' => 'float',
        'stock' => 'integer',
        'ventas' => 'integer',
    ];

    public function doJuego(){
        return $this->hasOne(Juego::class,'id_producto');
    }

    public function doPegi(){
        return $this->belongsTo(EdadPegi::class,'pegi_id');
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

    public function doPlataformas()
    {
        return $this->belongsToMany(
            Plataforma::class,
            'plataforma_juego',
            'juego_id',
            'plataforma_id'
        );
    }

}
