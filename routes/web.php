<?php

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

Route::get('/', function () {
    return view('welcome');
});


Route::post('/api/register', 'UserController@register');
Route::post('/api/login', 'UserController@login');
Route::post('/api/store', 'UserController@store');
Route::get('/api/listado', 'UserController@index');
Route::get('/api/detalle/{id}', 'UserController@show');
Route::put('/api/update/{id}', 'UserController@update');
Route::delete('/api/destroy/{id}', 'UserController@destroy');
Route::put('/api/changeRol/{id}', 'UserController@changeRol');

Route::post('/api/crearComment', 'CommentController@crearComentario');
Route::get('/api/listadoComment/{id}', 'CommentController@listarComentarios');
Route::delete('/api/deleteComment/{id}', 'CommentController@deleteComment');







