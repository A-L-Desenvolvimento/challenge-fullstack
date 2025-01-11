<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class ProductStoreTest extends TestCase
{
    public function getUserAccessToken()
    {
        $user = User::firstOrCreate(
            [
                "email" => "usuario@email.com",
            ],
            [
                "name" => "Usuario",
                "password" => "senha123"
            ]
        );

        $user->tokens()->delete();

        return $user->createToken('accessToken')->plainTextToken;
    }

    public function test_cadastra_produto_usuario_deslogado()
    {
        $this->json(
            'post',
            route('api.product.store'),
            [
                "name" => "Produto 1",
                "price" => 19.90,
                "quantity" => 10
            ]
        )->assertStatus(401);
    }

    public function test_cadastra_produto_price_invalido(): void
    {
        $token = $this->getUserAccessToken();

        $this->json(
            'post',
            route('api.product.store'),
            [
                "name" => "Novo produto",
                "price" => "caro",
                "quantity" => 10
            ],
            [
                'Authorization' => 'Bearer ' . $token
            ]
        )->assertStatus(422);
    }

    public function test_cadastra_produto_active_invalido(): void
    {
        $token = $this->getUserAccessToken();

        $this->json(
            'post',
            route('api.product.store'),
            [
                "name" => "Novo produto",
                "price" => 2.99,
                "quantity" => 10,
                "active" => "sim"
            ],
            [
                'Authorization' => 'Bearer ' . $token
            ]
        )->assertStatus(422);
    }

    public function test_cadastra_produto_quantity_invalido(): void
    {
        $token = $this->getUserAccessToken();

        $this->json(
            'post',
            route('api.product.store'),
            [
                "name" => "Novo produto",
                "price" => 2.99,
                "quantity" => "teste"
            ],
            [
                'Authorization' => 'Bearer ' . $token
            ]
        )->assertStatus(422);
    }

    public function test_cadastra_produto_inputs_validos(): void
    {
        $token = $this->getUserAccessToken();

        $this->json(
            'post',
            route('api.product.store'),
            [
                "name" => "Nome do produto",
                "description" => "Um produto muito bom, recomendo bastante",
                "price" => 298.99,
                "quantity" => 2,
                "active" => true
            ],
            [
                'Authorization' => 'Bearer ' . $token
            ]
        )->assertStatus(201);
    }
}
