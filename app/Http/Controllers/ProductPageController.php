<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductPageController extends Controller
{

    public function index()
    {
        $products = Product::all();
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }


    public function show($id)
    {
        $product = Product::find($id);
        return Inertia::render('Products/Show', [
            'product' => $product
        ]);
    }
}
