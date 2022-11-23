[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=w3bdesign_laravel-vue&metric=alert_status)](https://sonarcloud.io/dashboard?id=w3bdesign_laravel-vue)

# Laravel eCommerce

Ecommerce site with Laravel 9, Vue 3 and Stripe.

# Live URL

<http://laravel-vue3-webshop.herokuapp.com>

### Screenshot:

 <br /> 
 <img src="https://user-images.githubusercontent.com/45217974/108638044-9b523980-748d-11eb-9a24-0b58baffecc8.png" alt="Project screenshot" /> 
 <br />
 
 ### Stripe screenshot: 
 <br /> 
 <img src="https://user-images.githubusercontent.com/45217974/108796168-670f7380-7588-11eb-87d5-bc28276f0b35.png" alt="Stripe screenshot" />
 <br />

## Features

-   Laravel 9

-   Vue 3 with SFC and script setup syntax

-   Pinia state management

-   State persist with pinia-plugin-persistedstate

-   Order form setup with FormKit and builtin validation

-   Stripe for payments

-   Easily change currency by setting two environment variables: `CASHIER_CURRENCY` and `CASHIER_CURRENCY_LOCALE`

-   Code linting with Laravel Pint

-   CSS animations

-   Responsive mobile menu

-   SonarCloud code quality scanner integration on all pull requests

-   Laravel tests with CircleCI integration

## Setup

-   Fork or clone the project

-   Ensure you have PHP 8.1 or newer installed and setup properly (alternatively use Docker, see <https://laravel.com/docs/9.x/sail>)

-   Ensure you have access to a PostgreSQL database

-   Ensure you have Node installed

-   Rename `.env.example` to `.env` and modify the values

-   Run `composer install` to install the PHP dependencies with Composer. Check out <https://getcomposer.org/> if necessary

-   Run `npm install` to install the Node dependencies needed by the project. Check out <https://nodejs.org/en/> if necessary

-   Run `php artisan:migrate` to setup the Laravel database migrations

-   You should create at least one sample product. Although you can use the builtin factory seeders, I prefer to do manual creation for testing purposes.

    To do so run these commands after running `php artisan tinker`:

    ```php
    $product = new App\Models\Product();
    $product->name = 'Example Product';
    $product->slug = 'example-product';
    $product->description = 'Example product description';
    $product->imageUrl = 'url to image';
    $product->price = 99;
    $product->save();
    ```

-   Run `npm run watch` to serve the Vue 3 files

-   Run `php artisan serve` to serve the PHP files

-   Open up `http://localhost:8000` in your browser

## TODO

-   Do WCAG analysis and ensure there are no issues

-   Fix hardcoded currency

-   Finish implementing search with meilisearch-vue or vue-instantsearch when Vue 3 is supported

-   Add some tests to verify that the cart and checkout works correctly

-   Consider adding an admin dashboard

-   Look into performance optimization
