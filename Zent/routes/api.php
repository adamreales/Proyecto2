<?php

use App\Http\Controllers\ControllerCarrito;
use App\Http\Controllers\ControllerCategoria;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllerLogin;
use App\Http\Controllers\ControllerRegistro;
use App\Http\Controllers\ControllerProductos;
use App\Http\Controllers\ControllerStripe;

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

Route::get('/productos', [ControllerProductos::class,'productos'])->name('productos');
Route::get('/producto/{id}', [ControllerProductos::class,'producto'])->name('producto');
Route::get('/productos_mas_vendidos', [ControllerProductos::class,'productos_mas_vendidos'])->name('productos_mas_vendidos');
Route::get('/productos_mas_populares', [ControllerProductos::class,'productos_mas_populares'])->name('productos_mas_populares');
Route::get('/productos_mas_actuales',[ControllerProductos::class,'productos_mas_actuales'])->name('productos_mas_actuales');
Route::get('/productos_mas_baratos', [ControllerProductos::class,'productos_mas_baratos'])->name('productos_mas_baratos');
Route::get('/categorias',[ControllerCategoria::class,'categorias'])->name('categorias');
Route::get('/categoria/{id}',[ControllerCategoria::class,'categoria'])->name('categoria');
Route::post('/crear_pago',[ControllerStripe::class,'crear_pago'])->name('crear_pago');

Route::post('/crear_carrito',[ControllerCarrito::class,'crear_carrito'])->name('crear_carrito');
Route::post('/anadir_carrito',[ControllerCarrito::class,'anadir_carrito'])->name('anadir_carrito');
Route::post('/quitar_carrito',[ControllerCarrito::class,'quitar_carrito'])->name('quitar_carrito');
Route::post('/ver_carrito',[ControllerCarrito::class,'ver_carrito'])->name('ver_carrito');

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/perfil', [ControllerLogin::class,'perfil'])->name('perfil');
    
    Route::post('/anadir_producto', [ControllerProductos::class,'anadir_producto'])->name('anadir_producto');
    Route::post('/eliminar_producto', [ControllerProductos::class,'eliminar_producto'])->name('eliminar_producto');

    Route::post('/cerrar_session',[ControllerLogin::class,'cerrar_session'])->name('cerrar_session');
});
