<template>
    <div v-if="data && data.length">
        <div id="product-container" class="flex flex-wrap items-center">
            <div
                v-for="product in data"
                :key="product.id"
                class="flex flex-col mt-6 md:pr-6 xl:pr-6 sm:w1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
            >
                <router-link
                    :to="{
                        name: 'single.product',
                        params: { slug: product.slug },
                    }"
                    class="group"
                >
                    <img
                        v-if="product.imageUrl"
                        class="productImage"
                        :alt="product.name"
                        :src="product.imageUrl"
                    />
                    <div class="flex justify-center pt-3">
                        <p
                            class="text-xl font-bold text-center cursor-pointer transition-colors duration-300 ease-in-out group-hover:text-blue-600"
                        >
                            {{ product.name }}
                        </p>
                    </div>
                    <div class="flex justify-center mt-2">
                        <div class="text-xl text-gray-900">
                            {{ formatPrice(product.price) }}
                        </div>
                    </div>
                    <div class="flex justify-center pt-3">
                        <base-button backgroundColor="bg-blue-600">
                            View Product
                        </base-button>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <div v-if="error">
        <h1 class="text-center text-3xl text-red-500 m-4 p-4 mt-8">
            Error loading products
        </h1>
    </div>
</template>

<script setup>
import useSWRV from "swrv";
import formatPrice from "../../utils/functions";

const fetcher = (key) => fetch(key).then((res) => res.json());
const { data, error } = useSWRV("/api/products", fetcher);
</script>
