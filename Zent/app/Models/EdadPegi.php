<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DescripcionPegi;
use Illuminate\Database\Eloquent\SoftDeletes;

class EdadPegi extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "edad_pegi";

    protected $fillable = ["edad","color","descripcion"];

    public function doProductos()
    {
        return $this->hasMany(Producto::class, 'pegi_id','id');
    }

    public function doDescripciones()
    {
        return $this->hasMany(DescripcionPegi::class, 'edad_pegi_id');
    }

}
