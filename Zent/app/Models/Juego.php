<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;

class Juego extends Model
{
    use HasFactory;

    protected $table = "juego";

    protected $fillable = ["id_producto"];

    public function doProducto(){
        return $this->belongsTo(Producto::class,'id_producto');
    }

    public function doPlataformas()
    {
        return $this->belongsToMany(Plataforma::class,'plataforma_juego','id_juego','id_plataforma');
    }

    public function doJuegoPegi(){
        return $this->hasMany(JuegoPegi::class,'id_juego');
    }

}
