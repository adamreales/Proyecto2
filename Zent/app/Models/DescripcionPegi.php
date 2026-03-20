<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DescripcionPegi extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $table = "descripcion_pegi";

    protected $fillable = ["nombre","descripcion"];

}
