<template>
    <div class="container mx-auto mt-12">
        <h2 class="text-2xl text-orange-200">koko</h2>
        Cart: {{ cart }}
        <button class="button" @click="store.addToCart({ item: 'test' })">
            Add to my cart
        </button>

        <div v-if="store.products">
            <div v-for="product in store.products" :key="product.id"
                class="flex flex-col mt-6 md:pr-6 xl:pr-6 sm:w1/2 md:w-1/3 lg:1/4 xl:w-1/4">
                {{ product.name }} - {{ product.description }}
            </div>
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
