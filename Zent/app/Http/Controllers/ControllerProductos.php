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
    public function productos(Request $request){
        $limit = $request->limit ?? 12;
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->paginate($limit);

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'productos' => $productos->items(),
            'hasMore' => $productos->hasMorePages()
        ]);
    }

    public function productos_mas_vendidos(Request $request){
        $limit = $request->limit ?? 12;
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('ventas')->paginate($limit);

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas vendidos',
            'productos' => $productos->items(),
            'hasMore' => $productos->hasMorePages()
        ]);

    }

    public function productos_mas_populares(Request $request){
        $limit = $request->limit ?? 12;
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('valoracion')->paginate($limit);

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas populares',
            'productos' => $productos->items(),
            'hasMore' => $productos->hasMorePages()
        ]);

    }

    public function productos_mas_actuales(Request $request){
        $limit = $request->limit ?? 12;
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('created_at')->paginate($limit);

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas actuales',
            'productos' => $productos->items(),
            'hasMore' => $productos->hasMorePages()
        ]);

    }

    public function productos_mas_baratos(Request $request){
        $limit = $request->limit ?? 12;
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderBy('precio')->paginate($limit);

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas baratos',
            'productos' => $productos->items(),
            'hasMore' => $productos->hasMorePages()
        ]);

    }
    public function productos_mas_caros(Request $request){
        $limit = $request->limit ?? 12;
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('precio')->paginate($limit);

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos mas caros',
            'productos' => $productos->items(),
            'hasMore' => $productos->hasMorePages()
        ]);

    }

    public function productos_mas_alfabeticamente(Request $request){
        $limit = $request->limit ?? 12;
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderBy('titulo')->paginate($limit);

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos ordenados alfabeticamente',
            'productos' => $productos->items(),
            'hasMore' => $productos->hasMorePages()
        ]);

    }
     public function productos_menos_alfabeticamente(Request $request){
        $limit = $request->limit ?? 12;
        $productos = Producto::with([
            'doValoraciones',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->orderByDesc('titulo')->paginate($limit);

        if($productos === null){
            return response()->json([
                'error' => 'Error al cargar productos o no hay ninguno'
            ],404);
        }

        return response()->json([
            'msg' => 'Productos ordenados alfabeticamente al reves',
            'productos' => $productos->items(),
            'hasMore' => $productos->hasMorePages()
        ]);

    }

    public function producto_categoria(Request $request,$categoria_id){
        $limit = $request->limit ?? 12;
        $producto = Producto::with([
            'doValoraciones',
            'doValoraciones.doUsuario',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->whereHas('doCategorias', function($query) use ($categoria_id) {
            $query->where('id', $categoria_id);
        })->paginate($limit);

        if($producto === null || $producto->isEmpty()){
            return response()->json([
                'error' => 'Producto no encontrado'
            ],404);
        }

        return response()->json([
            'producto' => $producto,
            'hasMore' => $producto->hasMorePages()
        ]);

    }

    public function productos_favoritos(Request $request)
    {
        $user_id = auth()->id();
        $limit = $request->limit ?? 12;
        $productos = Favorito::with([
            'doProducto',
            'doProducto.doValoraciones',
            'doProducto.doImagenes',
            'doProducto.doCategorias',
            'doProducto.doPlataformas',
            'doProducto.doPegi'
        ])->where('user_id', $user_id)->paginate($limit);

        if ($productos->isEmpty()) {
            return response()->json([
                'error' => 'No tienes ningun producto favorito'
            ], 404);
        }

        return response()->json([
            'productos' => $productos->items(),
            'hasMore' => $productos->hasMorePages()
        ]);
    }


    public function producto_plataforma(Request $request,$plataforma_id){
        $limit = $request->limit ?? 12;
        $producto = Producto::with([
            'doValoraciones',
            'doValoraciones.doUsuario',
            'doImagenes',
            'doCategorias',
            'doPlataformas',
            'doPegi'
        ])->whereHas('doPlataformas', function($query) use ($plataforma_id) {
            $query->where('plataforma.id', $plataforma_id);
        })->paginate($limit);

        if($producto === null || $producto->isEmpty()){
            return response()->json([
                'error' => 'Producto no encontrado'
            ],404);
        }

        return response()->json([
            'producto' => $producto->items(),
            'hasMore' => $producto->hasMorePages()
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
            'doPlataformas',
            'doPegi')
                ->whereRaw('LOWER(titulo) LIKE ?', ['%'.strtolower($r->producto_nombre).'%'])->get();

        return response()->json([
            'msg' => 'Productos encontrados',
            'productos' => $productos_buscador
        ],200);

    }

}
