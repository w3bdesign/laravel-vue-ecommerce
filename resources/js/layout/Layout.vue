<template>   
        <nav-bar />
        <router-view />
        <footer-content />   
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useCart } from "../store/useCart";

const store = useCart();

onBeforeMount(() => {
    store.getProductsFromApi();
});
</script>
