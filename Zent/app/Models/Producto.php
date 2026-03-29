<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Valoracion;
use App\Models\ImagenProducto;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Categoria;
use App\Models\PlataformaProducto;
use Illuminate\Support\Str;
use App\Models\ClaveProducto;
class Producto extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "producto";

    protected $fillable = ["titulo","subtitulo","descripcion","precio","valoracion","ventas","pegi_id"];
    protected $guarded = [];

    protected $casts = [
        'precio' => 'decimal:2',
        'valoracion' => 'float',
        'ventas' => 'integer',
    ];

    public function doPegi(){
        return $this->belongsTo(EdadPegi::class,'pegi_id','id');
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
            'plataforma_producto',
            'producto_id',
            'plataforma_id'
        );
    }

    public function doPlataforma()
    {
        return $this->belongsTo(\App\Models\Plataforma::class, 'id_plataforma');
    }

    public function doPlataformaProductos(){
        return $this->hasMany(PlataformaProducto::class, 'producto_id');
    }

}
