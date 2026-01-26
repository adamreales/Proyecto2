<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Juego;
use App\Models\DescripcionPegi;
use App\Models\EdadPegi;

class JuegoPegi extends Model
{
    use HasFactory;

    protected $table = "juego_pegi";

    protected $fillable = ["id_juego","id_edad_pegi","id_desc_pegi"];

    public function doJuego(){
        return $this->belongsTo(Juego::class,"id_juego","id");
    }

    public function doEdad()
    {
        return $this->belongsTo(EdadPegi::class,'id_edad_pegi','id');
    }

    public function doDescripcion()
    {
        return $this->belongsTo(DescripcionPegi::class,'id_desc_pegi','id');
    }
    
}
