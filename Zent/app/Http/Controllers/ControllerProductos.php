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

use function PHPUnit\Framework\isEmpty;

class ControllerProductos extends Controller
{
    public function productos(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doJuego.doPlataformas',
            'doJuego.doPegi'
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
            'doCategorias',
            'doJuego.doPlataformas',
            'doJuego.doPegi'
        ])->orderByDesc('ventas')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'productos' => $productos
        ]);

    }

    public function productos_mas_populares(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doJuego.doPlataformas',
            'doJuego.doPegi'
        ])->orderByDesc('valoracion')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'productos' => $productos
        ]);

    }

    public function productos_mas_actuales(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doJuego.doPlataformas',
            'doJuego.doPegi'
        ])->orderByDesc('created_at')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'productos' => $productos
        ]);

    }

    public function productos_mas_baratos(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doJuego.doPlataformas',
            'doJuego.doPegi'
        ])->orderBy('precio')->get();

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
        $producto = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doJuego.doPlataformas',
            'doJuego.doPegi'
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

            // Parte de Categorias

            $categorias_productos = $r->categorias_producto;

            $categorias = Categoria::whereIn('id',$categorias_productos)->get();

            if($categorias->count() != count($r->categorias_producto)){
                throw new \Exception('Hay categorias que no coinciden');
            }

            $p->doCategorias()->sync($r->categorias_producto);
            

            //Imagenes
            if(!empty($r->imagenes)){
                foreach($r->imagenes as $img){
                    ImagenProducto::create([
                        'id_producto' => $p->id,
                        'url' => $img
                    ]);
                }
            }

            // Parte de Juego JuegoPegi
            if($r->esJuego){

                $juego = [
                    'id_producto' => $p->id
                ];

                $j = Juego::create($juego);

                if (!empty($r->edad_pegi_id)) {
                    $j->doPegi()->sync([$r->edad_pegi_id]);
                }else{
                    throw new \Exception('Error No hay ningunta edad del juego');
                }

                if (!empty($r->plataformas)) {
                    $j->doPlataformas()->sync($r->plataformas);
                }else{
                    throw new \Exception('Error No hay ningunta plataforma del juego');
                }

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
            $producto->doCategorias->detach();

            if($producto->doJuego()->exists()){
                $juego = $producto->doJuego;
                $juego->doPegi()->detach();
                $juego->doPlataformas()->detach();
                $juego->delete();
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

    public function buscador(Request $r){
        
        if(!$r->filled('producto_nombre')){
            return response()->json([
                'error' => 'No se ha enviado producto_nombre'
            ],400);
        }

        $productos_buscador = Producto::with(
                'doValoraciones',
                'doImagenes',
                'doCategorias',
                'doJuego.doPlataformas',
                'doJuego.doPegi')
                ->whereRaw('LOWER(titulo) LIKE ?', ['%'.strtolower($r->producto_nombre).'%'])->get();

        return response()->json([
            'msg' => 'Productos encontrados',
            'productos' => $productos_buscador
        ],200);

    }

}