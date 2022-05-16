<template>
    <div v-if="store.products">
        <div id="product-container" class="flex flex-wrap items-center">
            <div v-for="product in store.products" :key="product.id"
                class="flex flex-col mt-6 md:pr-6 xl:pr-6 sm:w1/2 md:w-1/3 lg:1/4 xl:w-1/4">
                <img v-if="product.imageUrl !== undefined" class="productImage" :alt="product.name"
                    :src="product.imageUrl" />
                <div class="flex justify-center pt-3">
                    <p class="text-xl font-bold text-center cursor-pointer">
                        {{ product.name }}
                    </p>
                </div>
                <div class="flex justify-center mt-2">
                    <div class="ml-4 text-xl text-gray-900">
                        kr {{ product.price }}
                    </div>
                </div>

                <div class="flex justify-center pt-3">
                    <button class="button" @click="store.addToCart({ item: product })">
                        Buy now!
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCart } from "../../store/useCart";

const store = useCart();
</script>
