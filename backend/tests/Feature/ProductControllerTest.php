<?php
namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Http\JsonResponse;
//use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductControllerTest extends TestCase
{
    //use RefreshDatabase;

    public function test_can_create_a_product()
    {

        $user = User::factory()->create([
            'email' => 'test'.rand(1,99999999).'@example.com',
            'password' => 'password'
        ]);

        $this->actingAs($user);

        $data = [
            'name' => 'Novo Produto',
            'description' => 'Descrição do produto',
            'price' => 20,
            'quantity' => 10,
        ];

        $response = $this->postJson('/api/products', $data);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'id',
                     'name',
                     'description',
                     'price',
                     'quantity',
                     'created_at',
                     'updated_at',
                 ]);

        $this->assertDatabaseHas('products', $data);

    }
}