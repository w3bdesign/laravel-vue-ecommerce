<template>
    <div className="container mx-auto mt-64">
        <h2 className="text-2xl text-orange-200">koko</h2>
        <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            @click="store.addToCart({ item: 'test' })"
        >
            Add to cart
        </button>
        Cart: {{ cart }} Name: {{ name }}
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCart } from "../store/useCart";

const store = useCart();

const { cart, name } = storeToRefs(store);
</script>
