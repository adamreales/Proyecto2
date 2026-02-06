<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DescripcionPegi;
use App\Models\Juego;

class EdadPegi extends Model
{
    use HasFactory;

    protected $table = "edad_pegi";

    protected $fillable = ["edad","color","descripcion"];

    public function doJuegos()
    {
        return $this->belongsToMany(
            Juego::class,
            'juego_pegi',
            'edad_pegi_id',
            'juego_id'
        );
    }

    public function doDescripciones()
    {
        return $this->hasMany(DescripcionPegi::class, 'edad_pegi_id');
    }

}
