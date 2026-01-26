<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DescripcionPegi extends Model
{
    use HasFactory;
    
    protected $table = "descripcion_pegi";

    protected $fillable = ["nombre","descripcion"];
    
}
