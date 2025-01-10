<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try {
            $products = Product::query()
                ->paginate(15)
                ->toArray();

            return response()->json($products);
        }catch (\Exception $e){

            return response()->json($e, [500]);

        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());

        if ($product) {
            return response()->json($product, 201);
        }

        return response()->json(['error' => 'Error creating the product'], 500);

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {

        $product->update($request->all());

        return response()->json($product);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }
}
