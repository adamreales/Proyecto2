<?php

namespace App\Helpers;

class DuenoCarrito
{
    public static function get()
    {
        if (auth()->check()) {
            return [
                'campo' => 'id_usuario',
                'valor' => auth()->id()
            ];
        }

        $sessionId = request()->header('X-Session-Id');

        if (!$sessionId) {
            abort(400, 'Session ID requerido');
        }

        return [
            'campo' => 'session_id',
            'valor' => $sessionId
        ];
    }
}