<?php

namespace Tests\Feature;

use App\Http\Controllers\Api\ProductController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Tests\TestCase;

class ProductStoreTest extends TestCase
{
    public function test_cadastra_produto_input_vazio(): void
    {
        $request = new Request();

        $controller = new ProductController();

        $response = $controller->store($request)->getStatusCode();

        $this->assertEquals(500, $response);
    }

    public function test_cadastra_produto_price_invalido(): void
    {
        $request = new Request();
        $request->merge([
            'price' => 'teste'
        ]);

        $controller = new ProductController();

        $response = $controller->store($request)->getStatusCode();

        $this->assertEquals(422, $response);
    }

    public function test_cadastra_produto_active_invalido(): void
    {
        $request = new Request();
        $request->merge([
            'active' => 'teste'
        ]);

        $controller = new ProductController();

        $response = $controller->store($request)->getStatusCode();

        $this->assertEquals(422, $response);
    }

    public function test_cadastra_produto_quantity_invalido(): void
    {
        $request = new Request();
        $request->merge([
            'quantity' => 'teste'
        ]);

        $controller = new ProductController();

        $response = $controller->store($request)->getStatusCode();

        $this->assertEquals(422, $response);
    }

    public function test_cadastra_produto_inputs_validos(): void
    {
        $request = new Request();
        $request->merge([
            "name" => "Nome do produto",
            "description" => "Um produto muito bom, recomendo bastante",
            "price" => 298.99,
            "quantity" => 2,
            "active" => true
        ]);

        $controller = new ProductController();

        $response = $controller->store($request)->getStatusCode();

        $this->assertEquals(201, $response);
    }
}
