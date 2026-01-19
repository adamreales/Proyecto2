<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Valoracion;

class Usuario extends Model
{
    use HasFactory;

    protected $table = "usuario";

    protected $fillable = ["nombre","apellido1","apellido2","fecha_nacimiento","correo","contrasena","validado"];

    public function doValoraciones(){
        return $this->hasMany(Valoracion::class,'id_usuario');
    }

}
