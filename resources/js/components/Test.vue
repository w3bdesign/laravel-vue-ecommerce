<template>
    <div class="container mx-auto mt-64">
        <h2 class="text-2xl text-orange-200">koko</h2>
        <button class="button" @click="store.addToCart({ item: 'test' })">
            Test Add to cart
        </button>
        Test Cart: {{ cart }} Name: {{ name }}
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCart } from "../store/useCart";

const store = useCart();

const { cart, name } = storeToRefs(store);
</script>
