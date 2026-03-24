<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    use HasFactory;

    protected $table = 'favoritos';

    protected $fillable = [
        'user_id',
        'session_id',
        'producto_id',
    ];


    public function doUser()
    {
        return $this->belongsTo(User::class);
    }

    public function doProducto()
    {
        return $this->belongsTo(Producto::class);
    }

}
