<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ROTAS DE AUTENTICACAO

Route::prefix("auth")->controller(AuthController::class)->group(function () {
    Route::post("register", "register")->name('api.auth.register');
    Route::post("login", "login")->name('api.auth.login');
    Route::post("logout", "logout")->middleware("auth:sanctum")->name('api.auth.logout');
});

// ROTAS DE PRODUTO

Route::prefix("product")->controller(ProductController::class)->group(function () {
    // rotas abertas
    Route::get('/', 'list')->name('api.product.list');
    Route::get('/{id}', 'show')->name('api.product.show');

    // rotas protegidas por autenticacao
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', 'store')->name('api.product.store');
        Route::put('/{id}', 'update')->name('api.product.update');
        Route::delete('/destroy/{id}', 'destroy')->name('api.product.destroy');
    });
});
