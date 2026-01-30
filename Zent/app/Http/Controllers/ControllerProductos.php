<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\CategoriaProducto;
use App\Models\Juego;
use App\Models\JuegoPegi;
use Illuminate\Support\Facades\DB;
use PhpParser\Error;

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

        DB::beginTransaction();

        try{
            //Parte del producto
            if (!$r->has(['titulo', 'subtitulo', 'descripcion', 'precio', 'stock'])) {
                throw new \Exception('Faltan campos requeridos en el envio');
            }

            $titulo = $r->titulo;
            $subtitulo = $r->subtitulo;
            $descripcion = $r->descripcion;
            $precio = $r->precio;
            $stock = $r->stock;

            if(strlen($titulo) < 3 || strlen($titulo) > 30){
                throw new \Exception('El nombre tiene que tener entre 3 y 30 caracteres');
            }

            if(strlen($subtitulo) < 5 || strlen($subtitulo) > 50){
                throw new \Exception('El subitulo tiene que tener entre 5 y 50 caracteres');
            }

            if(strlen($descripcion) < 10 || strlen($descripcion) > 200){
                throw new \Exception('El subitulo tiene que tener entre 10 y 200 caracteres');
            }

            if($precio <= 0 || $precio > 10000){
                throw new \Exception('El precio tiene que estar entre 0.01 y 10000');
            }

            if($stock < 0 || $stock > 1000){
                throw new \Exception('El stock tiene que estar entre 0 y 1000');
            }

            $producto = [
                'titulo' => $titulo,
                'subtitulo' => $subtitulo,
                'descripcion' => $descripcion,
                'precio' => $precio,
                'valoracion' => 0,
                'stock' => $stock
            ];

            $p = Producto::create($producto);

            // Parte de Categorias Producto

            $categorias_productos = $r->categorias_producto;

            $categorias = Categoria::whereIn('id',$categorias_productos)->get();

            if($categorias->count() != count($categorias_productos)){
                throw new \Exception('Hay categorias que no coinciden');
            }

            $cat_productos = [];
            foreach($categorias_productos as $cat){
                $cat_productos[] = [
                    'id_producto' => $p->id,
                    'id_categoria' => $cat,
                ];
            }

            CategoriaProducto::insert($cat_productos);

            // Parte de Juego JuegoPegi
            if($r->esJuego){

                $juego = [
                    'id_juego' => $p->id
                ];

                $j = Juego::create($juego);

                $juegos_pegi = $r->juegos_pegi;

                $pegis = JuegoPegi::whereIn('id',$juegos_pegi)->get();

                if($pegis->count() != count($juegos_pegi)){
                    throw new \Exception('Hay juegos que no coinciden');
                }

                $a_pegis = [];
                foreach($juegos_pegi as $jp){
                    $a_pegis[] = [
                        'id_juego' => $j->id,
                        'id_edad_pegi'=> $jp['id_edad_pegi'],
                        'id_desc_pegi' => $jp['id_desc_pegi'], 
                    ];
                }
                
                $jp = JuegoPegi::insert($a_pegis);

            }

            DB::commit();

            return response()->json([
                'ok' => 'Producto creado correctamente'
            ]);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }

    }

}