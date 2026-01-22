<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Valoracion;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuario extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = "usuario";

    protected $fillable = ["nombre","apellido1","apellido2","fecha_nacimiento","correo","contrasena","validado"];

    protected $hidden = [
        'contrasena'
    ];

    public function getAuthPassword(){
        return $this->contrasena;
    }

    public function doValoraciones(){
        return $this->hasMany(Valoracion::class,'id_usuario');
    }

}
