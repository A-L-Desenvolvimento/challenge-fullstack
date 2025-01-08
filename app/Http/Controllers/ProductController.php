<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Cria um novo produto
     */
    public function store(Request $request)
    {
        $product = Product::create($request->input());

        return response()->json($product, 201);
    }

    /**
     * Retorna todos os produtos
     */
    public function list()
    {
        $products = Product::all();

        return response()->json($products);
    }

    /**
     * Retorna o produto com o id informado
     */
    public function show(string $id)
    {
        $product = Product::find($id);

        return response()->json($product);
    }

    /**
     * Atualiza os dados do produto com o id informado
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        $product->update($request->input());

        return response()->json($product, 201);
    }

    /**
     * Deleta o produto com o id informado
     */
    public function destroy(string $id)
    {
        Product::destroy($id);

        return response()->json()->setStatusCode(204);
    }
}
