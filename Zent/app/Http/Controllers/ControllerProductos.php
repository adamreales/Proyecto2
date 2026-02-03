<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\CategoriaProducto;
use App\Models\Juego;
use App\Models\JuegoPegi;
use App\Models\ImagenProducto;
use Illuminate\Support\Facades\DB;
use PhpParser\Error;

class ControllerProductos extends Controller
{
    public function productos(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategoriasProducto.doCategoria',
            'doJuego.doJuegoPegi.doEdad',
            'doJuego.doJuegoPegi.doDescripcion',
            'doJuego.doPlataformas'
        ])->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'productos' => $productos
        ]);
    }

    public function productos_mas_vendidos(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategoriasProducto.doCategoria',
            'doJuego.doJuegoPegi.doEdad',
            'doJuego.doJuegoPegi.doDescripcion',
            'doJuego.doPlataformas'
        ])->orderBy('ventas','desc')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'masVendidos' => $productos
        ]);

    }

    public function productos_mas_populares(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes', 
            'doCategoriasProducto.doCategoria', 
            'doJuego.doJuegoPegi.doEdad', 
            'doJuego.doJuegoPegi.doDescripcion', 
            'doJuego.doPlataformas'
        ])->orderByDesc('valoracion','desc')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'masPopulares' => $productos
        ]);

    }

    public function producto($id){
        $producto = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategoriasProducto.doCategoria',
            'doJuego.doJuegoPegi.doEdad',
            'doJuego.doJuegoPegi.doDescripcion',
            'doJuego.doPlataformas'
        ])->find($id);

        if($producto === null){
            return response()->json([
                'error' => 'Producto no encontrado' 
            ],404);
        }

        return response()->json([
            'producto' => $producto,
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
            

            //Imagenes
            foreach($r->imagenes as $img){
                ImagenProducto::create([
                    'id_producto' => $p->id,
                    'url' => $img
                ]);
            }
            

            // Parte de Juego JuegoPegi
            if($r->esJuego){

                $juego = [
                    'id_producto' => $p->id
                ];

                $j = Juego::create($juego);

                $juegos_pegi = $r->juegos_pegi;

                $a_pegis = [];
                foreach($juegos_pegi as $jp){
                    $a_pegis[] = [
                        'id_juego' => $j->id,
                        'id_edad_pegi'=> $jp['id_edad_pegi'],
                        'id_desc_pegi' => $jp['id_desc_pegi'], 
                    ];
                }
                
                $jp = JuegoPegi::insert($a_pegis);

                //Plataformas
                $j->doPlataformas()->sync($r->plataformas);
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

    public function eliminar_producto(Request $r){
        DB::beginTransaction();

        try{
            $producto = Producto::find($r->id_producto);

            if($producto === null){
                return response()->json([
                    'error' => 'Producto no encontrado'
                ],404);
            }
            $producto->doValoraciones()->delete();
            $producto->doImagenes()->delete();
            $producto->doCategoriasProducto()->delete();

            if($producto->doJuego){
                $producto->doJuego->doJuegoPegi()->delete();
                $producto->doJuego->doPlataformas()->detach();
                $producto->doJuego()->delete();
            }

            $producto->delete();

            DB::commit();

            return response()->json([
                'producto' => 'Producto eliminado correctamente'
            ]);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ],500);
        }
        
    }

}