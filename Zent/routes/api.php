<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ControllerLogin;
use App\Http\Controllers\ControllerRegistro;
use App\Http\Controllers\ControllerProductos;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [ControllerLogin::class,'login'])->name('login');
Route::post('/registro',[ControllerRegistro::class,'registro'])->name('registro');

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/perfil', [ControllerLogin::class,'perfil'])->name('perfil');
    
    Route::get('/productos', [ControllerProductos::class,'productos'])->name('productos');
    Route::get('/producto/{id}', [ControllerProductos::class,'producto'])->name('producto');

});