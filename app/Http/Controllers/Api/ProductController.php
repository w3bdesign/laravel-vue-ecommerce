<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->get('q');

        $products = Product::with(['categories' => function ($query) {
            $query->select('id', 'name');
        }]);

        if ($query) {
            $products->where('name', 'like', "%$query%")
                ->orWhere('description', 'like', "%$query%");
        }

        return $products->get();
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->with(['categories:id,name'])
            ->firstOrFail();

        return $product;
    }
}
