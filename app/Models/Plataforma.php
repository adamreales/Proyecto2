<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Juego;
use App\Models\EdadPegi;

class Plataforma extends Model
{
    use HasFactory;

    protected $table = "plataforma";

    protected $fillable = ["nombre"];

    public function doJuegos(){
        return $this->belongsToMany(Juego::class,'plataforma_juego','id_plataforma','id_juego');
    }

    public function doPegi()
    {
        return $this->hasOne(JuegoPegi::class, 'id_juego');
    }

}
