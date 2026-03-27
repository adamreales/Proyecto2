<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;


class PlataformaProducto extends Model
{
    use SoftDeletes;

    protected $table = 'plataforma_producto';
    public $timestamps = false;

    protected $fillable = [
        'producto_id',
        'plataforma_id',
        'stock'
    ];

    protected static function booted(){
        static::created(function ($pp){
            for($i = 0 ; $i < $pp->stock; $i++){
                do{
                    $clave = strtoupper(
                        Str::random(4) . '-' . Str::random(4) . '-' . Str::random(4)
                    );
                }while(ClaveProducto::where('clave',$clave)->exists());

                ClaveProducto::create([
                    'plataforma_producto_id' => $pp->id,
                    'clave' => $clave,
                ]);
            }
        });
    }

    public function doProducto(){
        return $this->belongsTo(Producto::class, 'producto_id', 'id')->withTrashed();
    }

    public function doPlataforma(){
        return $this->belongsTo(Plataforma::class, 'plataforma_id', 'id')->withTrashed();
    }

    public function doClaves(){
        return $this->hasMany(ClaveProducto::class,'plataforma_producto_id','id');
    }

}
