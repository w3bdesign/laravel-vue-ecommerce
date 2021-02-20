[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/w3bdesign/laravel-vue/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/w3bdesign/laravel-vue/?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=w3bdesign_laravel-vue&metric=alert_status)](https://sonarcloud.io/dashboard?id=w3bdesign_laravel-vue)
[![CircleCI](https://circleci.com/gh/w3bdesign/laravel-vue.svg?style=svg)](https://circleci.com/gh/w3bdesign/laravel-vue)

# Laravel eCommerce

 Creating an eCommerce site with Laravel 8 and Vue 3.

 <img src="https://user-images.githubusercontent.com/45217974/108582060-2a960a80-7331-11eb-9375-d72c691b01d0.png" alt="Project screenshot" />
 
## Live URL: https://laravel-vue3.herokuapp.com (initial pageload may be slow because of the Heroku container needing to bootup)

## Features

-   Laravel 8

-   Vue 3 with composition API

-   Vuex 4 state management

-   Vuex-persist for persisting cart after page refresh

-   Stripe for payments

-   Dynamic currency formatting based on values set in environment variables

-   ESLint code linting with AirBnB ruleset

-   CSS animations

-   SonarCloud code quality scanner integration on all pull requests

-   Laravel tests with CircleCI integration

## Setup

-   Fork or clone the project

-   Ensure you have PHP 7.4 or newer installed and setup properly (alternatively use Docker, see https://laravel.com/docs/8.x/sail)

-   Ensure you have access to a PostgreSQL database

-   Ensure you have Node installed

-   Rename `.env.example` to `.env` and modify the values

-   Run `composer install` to install the PHP dependencies with Composer. Check out <https://getcomposer.org/> if necessary

-   Run `npm install` to imstall the Node dependencies needed by the project. Check out <https://nodejs.org/en/> if necessary

-   Run `npm run watch` to serve the Vue 3 files

-   Run `php artisan serve` to serve the PHP files

-   Open up `http://localhost:8000`

## TODO

-   Finish implementing Vee Validate

-   Finish implementing Laravel Scout

-   Add some tests to verify that the cart and checkout works correctly

-   Consider adding an admin dashboard 
