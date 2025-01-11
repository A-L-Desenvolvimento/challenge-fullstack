<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    /**
     * Cria um novo produto
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->input());

        try {
        } catch (ValidationException $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'errors' => $th->errors()
            ], 422);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Não foi possível cadastrar o produto.'
            ], 500);
        }

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
        try {
            $product = Product::findOrFail($id);
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'Produto não encontrado.'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Não foi possível buscar o produto.'
            ], 500);
        }

        return response()->json($product);
    }

    /**
     * Atualiza os dados do produto com o id informado
     */
    public function update(ProductRequest $request, string $id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->update($request->input());
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'Produto não encontrado.'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Não foi possível atualizar os dados do produto.'
            ], 500);
        }

        return response()->json($product, 201);
    }

    /**
     * Deleta o produto com o id informado
     */
    public function destroy(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
        } catch (ModelNotFoundException $th) {
            return response()->json([
                'message' => 'Produto não encontrado.'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Não foi possível excluir o produto.'
            ], 500);
        }

        return response()->json()->setStatusCode(204);
    }
}
