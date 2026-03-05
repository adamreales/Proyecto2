<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class OptionalSanctumAuth
{
    public function handle(Request $request, Closure $next)
    {
        $bearer = $request->bearerToken();

        if ($bearer) {

            $accessToken = PersonalAccessToken::findToken($bearer);

            if ($accessToken) {
                auth()->setUser($accessToken->tokenable);
            }
        }

        return $next($request);
    }
}