<template>
    <div className="container mx-auto mt-64">
        <h2 className="text-2xl text-orange-200">koko</h2>
        Cart: {{ cart }}
        Name: {{ name }}
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCart } from "../store/useCart";

const store = useCart();

const { cart, name } = storeToRefs(store);
</script>
