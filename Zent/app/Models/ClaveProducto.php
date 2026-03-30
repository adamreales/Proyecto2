<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class ClaveProducto extends Model
{
    use HasFactory;

    protected $table = 'claves_producto';

    protected $fillable = ['plataforma_producto_id','clave','vendida'];

    public function doPlataformaProducto(){
        return $this->belongsTo(PlataformaProducto::class, 'plataforma_producto_id', 'id')->withTrashed();
    }

}
