<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Juego;

class Plataforma extends Model
{
    use HasFactory;

    protected $table = "plataforma";

    protected $fillable = ["nombre"];

    public function doJuegos()
    {
        return $this->belongsToMany(
            Juego::class,
            'plataforma_juego',
            'plataforma_id',
            'juego_id'
        );
    }

}
