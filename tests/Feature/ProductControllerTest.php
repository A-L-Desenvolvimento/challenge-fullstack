<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Product;
use App\Models\User;

class ProductControllerTest extends TestCase
{
    //Testes para as rotas da API relacionadas à entidade Produto.

    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->actingAs($this->user, 'sanctum');
    }

    public function test_can_show_a_single_product()
    {
        $product = Product::factory()->create();

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $product->id,
                     'name' => $product->name,
                     'description' => $product->description,
                     'price' => $product->price,
                     'quantity' => $product->quantity,
                     'active' => $product->active,
                 ]);
    }

    public function test_show_returns_404_for_nonexistent_product()
    {
        $response = $this->getJson('/api/products/99999');

        $response->assertStatus(404);
    }

    public function test_store_fails_with_invalid_data()
    {
        $data = [
            'name' => '',
            'price' => 'invalid',
        ];

        $response = $this->postJson('/api/products', $data);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'price']);
    }

    public function test_update_fails_for_nonexistent_product()
    {
        $data = [
            'name' => 'Updated Product',
            'description' => 'Updated Description',
            'price' => 199.99,
            'quantity' => 20,
            'active' => false,
        ];

        $response = $this->putJson('/api/products/99999', $data);

        $response->assertStatus(404);
    }

    public function test_destroy_fails_for_nonexistent_product()
    {
        $response = $this->deleteJson('/api/products/99999');

        $response->assertStatus(404);
    }
}
