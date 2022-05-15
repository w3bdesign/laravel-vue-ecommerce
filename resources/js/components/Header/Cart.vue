<template>
    <div class="container mx-auto mt-12">
        <h2 class="text-2xl text-orange-200">koko</h2>
        Cart: {{ cart }}
        <button class="button" @click="store.addToCart({ item: 'test' })">
            Add to my cart
        </button>
        <button class="button" @click="store.getProductsFromApi()">
            Get all API products
        </button>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCart } from "../../store/useCart";

const store = useCart();

const { cart } = storeToRefs(store);
</script>
