<?php

use App\Http\Controllers\ControllerCarrito;
use App\Http\Controllers\ControllerCategoria;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllerLogin;
use App\Http\Controllers\ControllerRegistro;
use App\Http\Controllers\ControllerProductos;
use App\Http\Controllers\ControllerStripe;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ControllerFavorito;
use App\Http\Controllers\ControllerFactura;
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
Route::post('/solicitar_recuperacion_contraseña', [ControllerLogin::class,'solicitar_recuperacion_contraseña'])->name('solicitar_recuperacion_contraseña');
Route::post('/validar_y_reset_contraseña', [ControllerLogin::class,'validar_y_reset_contraseña'])->name('validar_y_reset_contraseña');

Route::get('/productos', [ControllerProductos::class,'productos'])->name('productos');
Route::get('/producto/{id}', [ControllerProductos::class,'producto'])->name('producto');
Route::get('/productos_mas_vendidos', [ControllerProductos::class,'productos_mas_vendidos'])->name('productos_mas_vendidos');
Route::get('/productos_mas_populares', [ControllerProductos::class,'productos_mas_populares'])->name('productos_mas_populares');
Route::get('/productos_mas_actuales',[ControllerProductos::class,'productos_mas_actuales'])->name('productos_mas_actuales');
Route::get('/productos_mas_baratos', [ControllerProductos::class,'productos_mas_baratos'])->name('productos_mas_baratos');
Route::get('/productos_mas_alfabeticamente', [ControllerProductos::class,'productos_mas_alfabeticamente'])->name('productos_mas_alfabeticamente');
Route::get('/productos_mas_caros', [ControllerProductos::class,'productos_mas_caros'])->name('productos_mas_caros');
Route::get('/productos_menos_alfabeticamente', [ControllerProductos::class,'productos_menos_alfabeticamente'])->name('productos_menos_alfabeticamente');
Route::get('/productos_categoria/{categoria}', [ControllerProductos::class,'producto_categoria'])->name('productos_categoria');
Route::get('/productos_plataforma/{plataforma}', [ControllerProductos::class,'producto_plataforma'])->name('productos_plataforma');
Route::get('/productos_pegi/{pegi}', [ControllerProductos::class,'producto_pegi'])->name('productos_pegi');
Route::post('/buscador',[ControllerProductos::class,'buscador'])->name('buscador');
Route::get('/categorias',[ControllerCategoria::class,'categorias'])->name('categorias');
Route::get('/plataformas',[ControllerCategoria::class,'plataformas'])->name('plataformas');
Route::get('/categoria/{id}',[ControllerCategoria::class,'categoria'])->name('categoria');
Route::post('/contacto',[ContactoController::class,'enviar'])->name('contacto');

Route::post('/webhook', [ControllerStripe::class, 'webhook']);

Route::middleware('optional.auth')->group(function(){
    Route::post('/crear_carrito',[ControllerCarrito::class,'crear_carrito'])->name('crear_carrito');
    Route::post('/anadir_carrito',[ControllerCarrito::class,'anadir_carrito'])->name('anadir_carrito');
    Route::post('/quitar_carrito',[ControllerCarrito::class,'quitar_carrito'])->name('quitar_carrito');
    Route::post('/ver_carrito',[ControllerCarrito::class,'ver_carrito'])->name('ver_carrito');

    Route::post('/preparar_pago', [ControllerStripe::class, 'preparar_pago'])->name('preparar_pago');
    Route::post('/pagar_pedido/{pedido}',[ControllerStripe::class,'pagar_pedido'])->name('pagar_pedido');
});

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/perfil', [ControllerLogin::class,'perfil'])->name('perfil');
    Route::post('/perfil/actualizar', [ControllerLogin::class,'actualizar_perfil'])->name('perfil.actualizar');

    Route::post('/cerrar_session',[ControllerLogin::class,'cerrar_session'])->name('cerrar_session');
    Route::post('/cambiar_contraseña', [ControllerLogin::class,'cambiar_contraseña'])->name('cambiar_contraseña');

    Route::post('/anadir_favorito', [ControllerFavorito::class,'anadir_favorito'])->name('anadir_favorito');
    Route::get('/productos_favoritos',[ControllerProductos::class,'productos_favoritos'])->name('productos_favoritos');

    Route::get('/facturas', [ControllerFactura::class, 'listar'])->name('facturas.listar');
    Route::get('/facturas/{id}/pdf', [ControllerFactura::class, 'descargar'])->name('facturas.descargar');
});
