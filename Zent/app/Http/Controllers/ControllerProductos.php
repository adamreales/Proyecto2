<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\CategoriaProducto;
use App\Models\Favorito;
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
            'doPlataformas',
            'doPegi'
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
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('ventas')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas vendidos',
            'productos' => $productos
        ]);

    }

    public function productos_mas_populares(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('valoracion')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas populares',
            'productos' => $productos
        ]);

    }

    public function productos_mas_actuales(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('created_at')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas actuales',
            'productos' => $productos
        ]);

    }

    public function productos_mas_baratos(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderBy('precio')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas baratos',
            'productos' => $productos
        ]);

    }
    public function productos_mas_caros(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('precio')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas caros',
            'productos' => $productos
        ]);

    }
    public function productos_mas_alfabeticamente(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderBy('titulo')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos ordenados alfabeticamente',
            'productos' => $productos
        ]);

    }
     public function productos_menos_alfabeticamente(){
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('titulo')->get();

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos ordenados alfabeticamente al reves',
            'productos' => $productos
        ]);

    }
    public function producto_categoria($categoria_id){
         $categoria = Categoria::find($categoria_id);
        $producto = Producto::with([
            'doValoraciones',
            'doValoraciones.doUsuario',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->whereHas('doCategorias', function($query) use ($categoria_id) {
            $query->where('id', $categoria_id);
        })->get();

        if($producto === null || $producto->isEmpty()){
            return response()->json([
                'error' => 'Producto no encontrado'
            ],404);
        }

        return response()->json([
            'producto' => $producto,
        ]);

    }
    public function productos_favoritos(Request $request) {
        $user_id = auth()->id();
        $session_id = $request->header('X-Session-ID');

        $productos = Favorito::with([
            'doProducto',
            'doProducto.doValoraciones',
            'doProducto.doImagenes',
            'doProducto.doCategorias',
            'doProducto.doPlataformas',
            'doProducto.doPegi'
        ])->where('session_id', $session_id)->where('user_id', $user_id)->get();

        if($productos === null || $productos->isEmpty()){
            return response()->json([
                'error' => 'No tienes ningun producto favorito'
            ],404);
        }

        return response()->json([
            'productos' => $productos,
        ]);

    }


    public function producto_plataforma($plataforma_id){
        $producto = Producto::with([
            'doValoraciones',
            'doValoraciones.doUsuario',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->whereHas('doPlataformas', function($query) use ($plataforma_id) {
            $query->where('plataforma.id', $plataforma_id);
        })->get();

        if($producto === null || $producto->isEmpty()){
            return response()->json([
                'error' => 'Producto no encontrado'
            ],404);
        }

        return response()->json([
            'producto' => $producto,
        ]);

    }

    public function producto($id){
        $producto = Producto::with([
            'doValoraciones',
            'doValoraciones.doUsuario',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
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
