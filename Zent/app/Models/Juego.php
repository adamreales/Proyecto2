<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use App\Models\EdadPegi;
use App\Models\Plataforma;

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
        return $this->belongsToMany(Plataforma::class,'plataforma_juego','juego_id','plataforma_id');
    }

    public function doPegi()
    {
        return $this->belongsToMany(
            EdadPegi::class,
            'juego_pegi',
            'juego_id',
            'edad_pegi_id'
        );
    }

}
