<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\CategoriaProducto;

class ControllerProductos extends Controller
{
    public function productos(){
        $productos = Producto::all();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'productos' => $productos
        ]);
    }

    public function producto($id){
        $producto = Producto::find($id);

        if($producto === null){
            return response()->json([
                'error' => 'Producto no encontrado' 
            ],404);
        }

        return response()->json([
            'producto' => $producto
        ]);

    }

    public function anadir_producto(Request $r){

        //Parte del producto

        if (!$r->has(['titulo', 'subtitulo', 'descripcion', 'precio', 'stock'])) {
            return response()->json([
                'error' => 'Faltan campos requeridos en el envio'
            ]);
        }

        $titulo = $r->titulo;
        $subtitulo = $r->subtitulo;
        $descripcion = $r->descripcion;
        $precio = $r->precio;
        $stock = $r->stock;

        if(strlen($titulo) < 3 || strlen($titulo) > 30){
            return response()->json([
                'error' => 'El nombre tiene que tener entre 3 y 30 caracteres'
            ]);
        }

        if(strlen($subtitulo) < 5 || strlen($subtitulo) > 50){
            return response()->json([
                'error' => 'El subitulo tiene que tener entre 5 y 50 caracteres'
            ]);
        }

        if(strlen($descripcion) < 10 || strlen($descripcion) > 200){
            return response()->json([
                'error' => 'El subitulo tiene que tener entre 10 y 200 caracteres'
            ]);
        }

        if($precio <= 0 || $precio > 10000){
            return response()->json([
                'error' => 'El precio tiene que estar entre 0.01 y 10000'
            ]);
        }

        if($stock < 0 || $stock > 1000){
            return response()->json([
                'error' => 'El stock tiene que estar entre 0 y 1000'
            ]);
        }

        $producto = [
            'titulo' => $titulo,
            'subtitulo' => $subtitulo,
            'descripcion' => $descripcion,
            'precio' => $precio,
            'valoracion' => 0,
            'stock' => $stock
        ];

        // Parte de Categorias Producto

        $categorias_productos = $r->categorias_producto;

        $categorias = Categorias::whereIn('id',$categorias_productos)->get();

        if($categorias->count() != count($categorias_productos)){
            return response()->json([
                'error' => 'Hay categorias que no coinciden'
            ]);
        }

        $cat_productos = [];
        foreach($categorias_productos as $cat){
            $cat_productos[] = [
                'id_producto' => $p->id,
                'id_categoria' => $cat->id,
            ];
        }

        // Parte de Juego
        if($r->esJuego){
            $juegos_pegi = $r->juegos_pegi;

            $pegis = JuegoPegi::whereIn('id',$categorias_productos)->get();

            if($pegis->count() != count($juegos_pegi)){
                return response()->json([
                    'error' => 'Hay juegos que no coinciden'
                ]);
            }
            
        }


        //Parte de insertar en la bd

        $p = Producto::create([$producto]);
        CategoriaProducto::insert([$cat_productos]);

    }

}