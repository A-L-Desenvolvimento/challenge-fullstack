<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    /**
     * Exibe uma lista de todos os produtos.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Armazena um novo produto no banco de dados.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Validação dos dados recebidos na requisição
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'quantity' => 'required|integer',
            ]);

            // Criação do produto
            $product = Product::create($request->all());

            // Retorna o produto criado com código HTTP 201
            return response()->json($product, 201);
        } catch (ValidationException $e) {
            // Retorna erros de validação com código HTTP 422
            return response()->json(['errors' => $e->validator->errors()->all()], 422);
        } catch (\Exception $e) {
            // Retorna erro genérico com código HTTP 500
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], 500);
        }
    }

    /**
     * Exibe os detalhes de um produto específico.
     *
     * @param Product $product
     * @return JsonResponse
     */
    public function show(Product $product): JsonResponse
    {
        return response()->json($product);
    }

    /**
     * Atualiza um produto específico no banco de dados.
     *
     * @param Request $request
     * @param Product $product
     * @return JsonResponse
     */
    public function update(Request $request, Product $product): JsonResponse
    {
        try {
            // Validação dos dados recebidos na requisição
            $request->validate([
                'name' => 'string|max:255',
                'description' => 'string',
                'price' => 'numeric',
                'quantity' => 'integer',
            ]);

            // Atualiza os dados do produto
            $product->update($request->all());

            // Retorna o produto atualizado
            return response()->json($product);
        } catch (ValidationException $e) {
            // Retorna erros de validação com código HTTP 422
            return response()->json(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            // Retorna erro genérico com código HTTP 500
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], 500);
        }
    }

    /**
     * Remove um produto específico do banco de dados.
     *
     * @param Product $product
     * @return JsonResponse
     */
    public function destroy(Product $product): JsonResponse
    {
        try {
            // Exclui o produto
            $product->delete();

            // Retorna mensagem de sucesso
            return response()->json(['message' => 'Produto deletado com sucesso.'], 200);
        } catch (\Exception $e) {
            // Retorna erro genérico com código HTTP 500
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], 500);
        }
    }
}
