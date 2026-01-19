<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Juego;

class PlataformaJuego extends Model
{
    use HasFactory;

    protected $table = "plataforma_juego";

    protected $fillable = ["id_juego","id_plataforma"];

    public function doJuego(){
        return $this->belongsTo(Juego::class,"id_juego");
    }

}
