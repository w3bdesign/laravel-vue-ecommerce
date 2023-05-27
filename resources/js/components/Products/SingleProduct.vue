<template>
    <div v-if="data">
        <section>
            <div
                class="container z-0 flex flex-wrap items-center pt-4 pb-12 mx-auto"
            >
                <div
                    class="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2"
                >
                    <img
                        v-if="data.imageUrl"
                        id="product-image"
                        class="productImage"
                        :alt="data.name"
                        :src="data.imageUrl"
                    />
                    <img
                        v-else
                        id="product-image"
                        class="h-auto p-8 transition duration-500 ease-in-out transform xl:p-2 md:p-2 lg:p-2 hover:shadow-lg hover:scale-105"
                        :alt="data.name"
                        :src="placeholderImage"
                    />
                    <div class="ml-8">
                        <p class="text-3xl font-bold text-left">
                            {{ data.name }}
                        </p>
                        <p class="pt-1 mt-4 text-2xl text-gray-900">
                            {{ formatPrice(data.price) }}
                        </p>
                        <p class="pt-1 mt-4 text-2xl text-gray-900">
                            {{ data.description }}
                        </p>
                        <div class="pt-1 mt-2">
                            <base-button
                                backgroundColor="bg-blue-600"
                                @click="store.addToCart({ item: data })"
                                >Add To Cart</base-button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import useSWRV from "swrv";

import { useRoute } from "vue-router";

import { useCart } from "../../store/useCart";
import { formatPrice } from "../../utils/functions";

const route = useRoute();
const store = useCart();

const fetcher = (key) => fetch(key).then((res) => res.json());
const { data, error } = useSWRV(`/api/product/${route.params.slug}`, fetcher);
</script>
