<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use DatabaseMigrations;

    #[Test]
    public function it_can_list_products()
    {
        Product::factory()->count(20)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data',
            'links',
            'total',
        ]);
        $this->assertCount(15, $response->json('data'));
    }

    #[Test]
    public function it_can_create_a_product()
    {

        $user = User::factory()->create();

        $payload = [
            'name' => 'Product 1',
            'description' => 'A test product',
            'price' => 100.50,
            'quantity' => 10,
            'active' => true,
        ];

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/products', $payload);

        $response->assertStatus(201);
        $response->assertJsonFragment([ 'name' => 'Product 1' ]);
        $response->assertJsonStructure([
                'id',
                'name',
                'description',
                'price',
                'quantity',
                'active',
        ]);
    }

    #[Test]
    public function it_cannot_create_a_product_without_user()
    {
        $payload = [
            'name' => 'Product 1',
            'description' => 'A test product',
            'price' => 100.50,
            'quantity' => 10,
            'active' => true,
        ];

        $response = $this->postJson('/api/products', $payload);
        $response->assertStatus(401);

    }

    #[Test]
    public function it_can_show_a_product()
    {
        $product = Product::factory()->create();

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $product->id,
            'name' => $product->name,
        ]);
    }

    #[Test]
    public function it_can_update_a_product()
    {
        $product = Product::factory()->create();

        $user = User::factory()->create();

        $updatedData = [
            'name' => 'Updated Product',
            'description' => 'Updated description',
            'price' => 150.75,
            'quantity' => 10,
            'active' => true,
        ];

        $response = $this->actingAs($user, 'api')
        ->putJson("/api/products/{$product->id}", $updatedData);
        $response->assertStatus(200);
        $response->assertJsonFragment([ 'name' => 'Updated Product' ]);
    }

    #[Test]
    public function it_cannot_update_a_product_without_user()
    {
        $product = Product::factory()->create();

        $updatedData = [
            'name' => 'Updated Product',
            'description' => 'Updated description',
            'price' => 150.75,
            'quantity' => 10,
            'active' => true,
        ];

        $response = $this->putJson("/api/products/{$product->id}", $updatedData);
        $response->assertStatus(401);
    }

    #[Test]
    public function it_can_delete_a_product()
    {
        $product = Product::factory()->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'api')
            ->deleteJson("/api/products/{$product->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('products', [ 'id' => $product->id ]);
    }

    #[Test]
    public function it_cannot_delete_a_product_without_user()
    {
        $product = Product::factory()->create();
        $response = $this->deleteJson("/api/products/{$product->id}");
        $response->assertStatus(401);
    }

    #[Test]
    public function it_validates_required_fields_when_creating_a_product()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/products', []);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'description', 'price']);
    }

    #[Test]
    public function it_validates_required_fields_when_updating_a_product()
    {
        $product = Product::factory()->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'api')
            ->putJson("/api/products/{$product->id}", []);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'description', 'price']);
    }
}
