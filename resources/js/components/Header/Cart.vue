<template>
    <div class="container mx-auto mt-12">
        <h2 class="text-2xl text-orange-200">koko</h2>
        <div v-if="store.cart.length">Cart: <pre>{{ cart }}</pre>
        </div>


    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useCart } from "../../store/useCart";

const store = useCart();

const { cart } = storeToRefs(store);

onBeforeMount(() => {
    store.getProductsFromApi();
});
</script>
