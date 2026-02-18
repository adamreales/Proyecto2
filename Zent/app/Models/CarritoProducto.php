<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarritoProducto extends Model
{
    use HasFactory;

    protected $table = "carrito_producto";

    protected $fillable = ["id_producto","id_carrito","cantidad"];
}
