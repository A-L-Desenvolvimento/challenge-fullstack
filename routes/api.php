<?php

use App\Http\Controllers\AuthController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post('/auth', [AuthController::class, 'store']);

Route::prefix('/products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{product}', [ProductController::class, 'show']);
});

Route::group(['middleware' => ['auth:api'],'prefix' => 'products', 'as' => 'private.products.'], function () {
    Route::post('/', [ProductController::class, 'store']);
    Route::put('/{product}', [ProductController::class, 'update']);
    Route::delete('/{product}', [ProductController::class, 'destroy']);
});
