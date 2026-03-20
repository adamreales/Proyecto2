<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Juego;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plataforma extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "plataforma";

    protected $fillable = ["nombre"];

    public function doProductos()
    {
        return $this->belongsToMany(
            Producto::class,
            'plataforma_producto',
            'plataforma_id',
            'producto_id'
        );
    }

}
