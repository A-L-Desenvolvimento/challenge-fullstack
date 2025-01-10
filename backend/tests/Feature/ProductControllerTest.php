<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_list_all_products()
    {
        Product::factory()->count(3)->create();

        $response = $this->get('/api/products');

        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }

    #[Test]
    public function it_can_show_a_product()
    {
        $product = Product::factory()->create();

        $response = $this->get("/api/products/{$product->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment(['name' => $product->name]);
    }

    #[Test]
    public function it_can_create_a_product()
    {
        $this->withoutMiddleware();

        $response = $this->post('/api/login', [
            'email' => 'test@example.com',
            'password' => '123456',
        ]);

        $token = $response->json('token');

        $data = [
            'name' => 'Novo Produto',
            'description' => 'Descrição do produto',
            'price' => 100.0,
            'quantity' => 10,
        ];

        $response = $this->post('/api/products', $data, [
            'Authorization' => "Bearer $token"
        ]);

        $response->assertStatus(201);
        $response->assertJsonFragment(['name' => 'Novo Produto']);
    }

    #[Test]
    public function it_can_update_a_product()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('123456'),
        ]);

        $product = Product::factory()->create([
            'name' => 'Produto Original',
            'description' => 'Descrição do produto',
            'price' => 100.0,
            'quantity' => 10,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => '123456',
        ]);

        $token = $response->json('token');

        $updatedData = [
            'name' => 'Produto Atualizado',
            'description' => 'Descrição atualizada',
            'price' => 150.0,
            'quantity' => 20,
        ];

        $response = $this->putJson(
            '/api/products/' . $product->id,
            $updatedData,
            ['Authorization' => "Bearer $token"]
        );

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Produto Atualizado']);
    }

    #[Test]
    public function it_can_delete_a_product()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('123456'),
        ]);

        $product = Product::factory()->create();

        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->deleteJson('/api/products/' . $product->id);

        $response->assertStatus(200);

        $this->assertSoftDeleted('products', ['id' => $product->id]);
    }
}
