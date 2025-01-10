<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_listar_produtos()
    {
        Product::factory(3)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200);
        $this->assertNotEmpty($response['data']);
    }

    public function test_cadastrar_produto()
    {
        Sanctum::actingAs($this->user);

        $produto = [
            'name' => 'Produto Teste',
            'description' => 'Descrição teste',
            'price' => 100.00,
            'quantity' => 10,
            'active' => 1
        ];

        $response = $this->postJson('/api/products', $produto);

        $response->assertStatus(201);
        $this->assertDatabaseHas('products', ['name' => 'Produto Teste']);
    }

    public function test_visualizar_produto()
    {
        $produto = Product::factory()->create();

        $response = $this->getJson("/api/products/{$produto->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment(['name' => $produto->name]);
    }

    public function test_deletar_produto()
    {
        Sanctum::actingAs($this->user);
        $produto = Product::factory()->create();

        $response = $this->deleteJson("/api/products/{$produto->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('products', ['id' => $produto->id]);
    }
}