<template>
    <input
        class="w-full px-3 py-2 my-2 border-2 border-gray-300 rounded-md text-sm focus:border-blue-500 focus:outline-none transition-all duration-300"
        type="text" v-model="searchTerm" placeholder="Search" />

    <div v-if="data && data.length > 0 && searchTerm.length > 0">
        <div
            class="mt-6 md:mt-0 flex justify-center absolute bg-white left-0 right-0 h-auto mx-auto py-16 px-8 shadow-md overflow-y-auto overflow-x-hidden scrolling-touch z-50 max-w-screen-md">
            <div class="w-full">
                <div v-for="product in data" :key="product.id" class="border-t-2 border-b-2 border-grey-500 py-4 w-full">
                    <RouterLink :to="{
                        name: 'single.product',
                        params: { slug: product.slug },
                    }">
                        <div class="flex justify-end">
                            <div class="mr-8 md:mr-0">
                                <img v-if="product.imageUrl"
                                    class="transform scale-70 max-w-[90px] max-h-full transition ease-in-out duration-200 transform-origin-center left-0 w-65 h-auto object-contain"
                                    :alt="product.name" :src="product.imageUrl" />
                            </div>
                            <div class="w-[170px]">
                                <div class="product__name">
                                    <div class="product__title" :title="product.name">
                                        {{ product.name }}
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <div class="product__price">
                                        {{ product.price }},-
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import useSWRV from "swrv";

const fetcher = (key) => fetch(key).then((res) => res.json());

const searchTerm = ref("");

const { data } = useSWRV(
    () => (searchTerm.value ? `/api/products?q=${searchTerm.value}` : null),
    fetcher
);
</script>
