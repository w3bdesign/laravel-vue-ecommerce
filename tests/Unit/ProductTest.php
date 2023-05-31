<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Product;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the /api/products endpoint.
     *
     * This test sends a GET request to the /api/products endpoint and checks if
     * the response has a 200 status code and contains the correct product data.
     *
     * @return void
     */
    public function testApiProductsEndpoint()
    {
        // Create a sample product
        $product = Product::factory()->create();

        // Send a GET request to the /api/products endpoint
        $response = $this->get('/api/products');

        // Check that the response has a 200 status code
        $response->assertStatus(200);

        // Check that the response contains the sample product data
        $response->assertJsonPath('0.id', $product->id);
        $response->assertJsonPath('0.name', $product->name);
        $response->assertJsonPath('0.imageUrl', $product->imageUrl);
        $response->assertJsonPath('0.slug', $product->slug);
        $response->assertJsonPath('0.price', $product->price);
    }
}
