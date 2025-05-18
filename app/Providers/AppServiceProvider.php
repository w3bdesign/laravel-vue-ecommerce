<?php

namespace App\Providers;

use Illuminate\Routing\UrlGenerator; 
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(UrlGenerator $url) 
    {
        if (config('app.env') === 'production') { 
            $url->forceScheme('https');
        }
    }
}
