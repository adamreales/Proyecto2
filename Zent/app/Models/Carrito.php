<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Producto;

class Carrito extends Model
{
    use HasFactory;

    protected $table = 'carrito';
    
    protected $fillable = ['id_producto','id_usuario','session_id','cantidad'];

    public function doProducto(){
        return $this->belongsTo(Producto::class,'id','id_producto');
    }
    public function doUsuario(){
        return $this->belongsTo(User::class,'id','id_usuario');
    }
}
