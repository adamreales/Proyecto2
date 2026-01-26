<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EdadPegi extends Model
{
    use HasFactory;

    protected $table = "edad_pegi";

    protected $fillable = ["edad","color","descripcion"];
}
