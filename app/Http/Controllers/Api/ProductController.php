<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with(['categories' => function ($query) {
            $query->select('id', 'name');
        }])
            ->get();
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->with(['categories:id,name'])
            ->firstOrFail();

        return $product;
    }
}
