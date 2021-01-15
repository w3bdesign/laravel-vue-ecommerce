<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::factory()
            ->times(20)
            ->create();

        Category::factory()
            ->times(4)
            ->create();

        Order::factory()
            ->times(10)
            ->create();

        $categories = Category::all();
        Product::all()->each(function ($product) use ($categories) {
            $product->categories()->attach(
                $categories->random(2)->pluck('id')->toArray()
            );
        });

        $orders = Order::all();
        Product::all()->each(function ($product) use ($orders) {
            $orderIds = $orders->random(3)->pluck('id')->toArray();
            foreach ($orderIds as $orderId) {
                $product->orders()->attach($orderId, ['quantity' => rand(1, 5)]);
            }
        });
    }
}
