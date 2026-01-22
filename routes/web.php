<?php

use App\Http\Controllers\ControladorPrueba;
use App\Http\Controllers\ControllerRegistro;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',[ControladorPrueba::class,'index'])->name('index');
// Route::get('/portada',[ControladorPrueba::class,'visualizacion_portada'])->name('index');

Route::get('/registro',[ControllerRegistro::class,'registro'])->name('registro');
Route::post('/doRegistro',[ControllerRegistro::class,'doRegistro'])->name('doRegistro');
Route::get('/validar_usuario/{id_usuario}',[ControllerRegistro::class,'validar_usuario'])->name('validar_usuario');