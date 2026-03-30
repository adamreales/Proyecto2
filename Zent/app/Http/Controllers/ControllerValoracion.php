<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PedidoDetalle;
use App\Models\Producto;
use App\Models\Valoracion;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ControllerValoracion extends Controller
{
    protected function construirEstadoValoracion(int $productoId, int $usuarioId): array
    {
        $haComprado = PedidoDetalle::where('id_producto', $productoId)
            ->whereHas('doPedido', function ($q) use ($usuarioId) {
                $q->where('id_usuario', $usuarioId)
                    ->where('estado', 'pagado');
            })
            ->exists();

        $yaValorado = Valoracion::where('id_usuario', $usuarioId)
            ->where('id_producto', $productoId)
            ->exists();

        return [
            'ha_comprado' => $haComprado,
            'ya_valorado' => $yaValorado,
            'puede_valorar' => $haComprado && !$yaValorado,
        ];
    }

    public function anadir_valoracion(Request $r)
    {
        if (!$r->has(['id_producto', 'estrellas'])) {
            return response()->json([
                'error' => 'Faltan campos en el envio (id_producto y estrellas)'
            ], 400);
        }

        $productoId = (int) $r->id_producto;
        $usuarioId = auth()->id();
        $comentario = trim((string) $r->comentario);

        if ($usuarioId === null) {
            return response()->json([
                'error' => 'Usuario no autenticado'
            ], 401);
        }

        $producto = Producto::find($productoId);
        if (!$producto) {
            return response()->json([
                'error' => 'No existe el id_producto'
            ], 400);
        }

        if (!($r->estrellas >= 1 && $r->estrellas <= 5)) {
            return response()->json([
                'error' => 'Estrellas tiene que ser entre 1-5'
            ], 400);
        }

        if (!(Str::length($comentario) >= 0 && Str::length($comentario) <= 500)) {
            return response()->json([
                'error' => 'Comentario tiene que tener una longitud de 0-500 caracteres'
            ], 400);
        }

        $estadoValoracion = $this->construirEstadoValoracion($productoId, $usuarioId);

        if (!$estadoValoracion['ha_comprado']) {
            return response()->json([
                'error' => 'Solo puedes valorar productos que hayas comprado'
            ], 403);
        }

        if ($estadoValoracion['ya_valorado']) {
            return response()->json([
                'error' => 'Ya has valorado este producto'
            ], 400);
        }

        $valoracion = Valoracion::create([
            'estrellas' => (int) $r->estrellas,
            'id_usuario' => $usuarioId,
            'id_producto' => $productoId,
            'comentario' => $comentario !== '' ? $comentario : null,
        ]);

        return response()->json([
            'msg' => 'Comentario anadido correctamente',
            'valoracion' => $valoracion
        ], 200);
    }

    public function mis_valoraciones()
    {
        $usuarioId = auth()->id();

        $valoraciones = Valoracion::with(['doProducto.doImagenes'])
            ->where('id_usuario', $usuarioId)
            ->orderByDesc('id')
            ->get()
            ->map(function (Valoracion $valoracion) {
                return [
                    'id' => $valoracion->id,
                    'id_producto' => $valoracion->id_producto,
                    'producto_titulo' => optional($valoracion->doProducto)->titulo,
                    'producto_imagen' => optional(optional($valoracion->doProducto)->doImagenes->first())->url,
                    'estrellas' => (int) $valoracion->estrellas,
                    'comentario' => $valoracion->comentario,
                    'fecha' => optional($valoracion->created_at)->toIso8601String(),
                ];
            })
            ->values();

        return response()->json($valoraciones, 200);
    }

    public function puede_valorar(int $productoId)
    {
        $usuarioId = auth()->id();
        $producto = Producto::find($productoId);

        if (!$producto) {
            return response()->json([
                'error' => 'Producto no encontrado'
            ], 404);
        }

        return response()->json(
            $this->construirEstadoValoracion($productoId, $usuarioId),
            200
        );
    }
}
