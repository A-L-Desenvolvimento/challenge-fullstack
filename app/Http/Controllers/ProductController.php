<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ProductController as ApiProductController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    private $apiProductController;

    public function __construct(ApiProductController $apiProductController)
    {
        $this->apiProductController = $apiProductController;
    }

    function index()
    {
        $products = json_decode($this->apiProductController->list()->getContent());

        return Inertia::render('Produtos', [
            "products" => $products,
        ]);
    }
}
