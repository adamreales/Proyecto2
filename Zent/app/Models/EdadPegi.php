<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EdadPegi extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "edad_pegi";

    protected $fillable = ["edad","descripcion"];

    public function doProductos()
    {
        return $this->hasMany(Producto::class, 'pegi_id','id');
    }

}
