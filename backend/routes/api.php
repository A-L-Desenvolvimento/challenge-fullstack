<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rota para login de usuário
Route::post('/login', [LoginController::class, 'login']);

// Rota pública para listar todos os produtos
Route::get('/products', [ProductController::class, 'index']);

// Rota pública para exibir os detalhes de um produto específico
Route::get('/products/{product}', [ProductController::class, 'show']);

// Rotas agrupadas que exigem autenticação
Route::middleware('auth:sanctum')->group(function () {
    // Rota para criar um novo produto
    Route::post('/products', [ProductController::class, 'store']);
    
    // Rota para atualizar um produto existente
    Route::put('/products/{product}', [ProductController::class, 'update']);
    
    // Rota para excluir um produto
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});