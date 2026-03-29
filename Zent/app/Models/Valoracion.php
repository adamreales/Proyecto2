<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Producto;

class Valoracion extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "valoracion";

    protected $fillable = ["estrellas","comentario","id_usuario","id_producto"];

    protected static function booted()
    {
        static::created(function ($valoracion) {

            $producto = $valoracion->doProducto;

            if (!$producto) return;

            $media = $producto->doValoraciones()->avg('estrellas');

            $producto->valoracion = round($media);
            $producto->save();
        });
    }

    public function doUsuario(){
        return $this->belongsTo(User::class,"id_usuario");
    }

    public function doProducto(){
        return $this->belongsTo(Producto::class,"id_producto");
    }

}
