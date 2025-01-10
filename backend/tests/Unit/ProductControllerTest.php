<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();


        $this->user = User::factory()->create();
    }

    public function test_can_list_all_products()
    {

        $this->actingAs($this->user);


        Product::factory()->count(5)->create();


        $response = $this->getJson('/api/products');


        $response->assertStatus(200)->assertJsonCount(5);
    }

    public function test_can_show_a_product()
    {

        $this->actingAs($this->user);


        $product = Product::factory()->create();

        $response = $this->getJson("/api/products/{$product->id}");


        $response->assertStatus(200)->assertJson([
            'id' => $product->id,
            'name' => $product->name,
        ]);
    }

    public function test_can_create_a_product()
    {

        $this->actingAs($this->user);


        $data = [
            'name' => 'Test Product',
            'description' => 'Test Description',
            'price' => 99.99,
            'quantity' => 10,
            'active' => true,
        ];


        $response = $this->postJson('/api/products', $data);


        $response->assertStatus(201)->assertJson($data);


        $this->assertDatabaseHas('products', $data);
    }

    public function test_can_update_a_product()
    {

        $this->actingAs($this->user);


        $product = Product::factory()->create();


        $data = [
            'name' => 'Updated Product',
            'description' => 'Updated Description',
            'price' => 199.99,
            'quantity' => 5,
        ];


        $response = $this->putJson("/api/products/{$product->id}", $data);


        $response->assertStatus(200)->assertJson($data);


        $this->assertDatabaseHas('products', $data);
    }

    public function test_can_delete_a_product()
    {

        $this->actingAs($this->user);


        $product = Product::factory()->create();


        $response = $this->deleteJson("/api/products/{$product->id}");


        $response->assertStatus(204);


        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }
}
