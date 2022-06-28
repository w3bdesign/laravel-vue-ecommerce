<template>
    <div v-if="product">
        <section>
            <div class="container z-0 flex flex-wrap items-center pt-4 pb-12 mx-auto">
                <div class="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
                    <img v-if="product.imageUrl !== undefined" id="product-image" class="productImage"
                        :alt="product.name" :src="product.imageUrl" />
                    <img v-else id="product-image"
                        class="h-auto p-8 transition duration-500 ease-in-out transform xl:p-2 md:p-2 lg:p-2 hover:shadow-lg hover:scale-105"
                        :alt="product.name" :src="placeholderImage" />
                    <div class="ml-8">
                        <p class="text-3xl font-bold text-left">
                            {{ product.name }}
                        </p>
                        <p class="pt-1 mt-4 text-2xl text-gray-900">
                            {{ formatPrice(product.price) }}
                        </p>
                        <p class="pt-1 mt-4 text-2xl text-gray-900">
                            {{ product.description }}
                        </p>
                        <div class="pt-1 mt-2">
                            <base-button backgroundColor="bg-blue-600" @click="store.addToCart({ item: product })">Add
                                To Cart</base-button>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    </div>
</template>

<script setup>
//import { computed, reactive, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";


import { useCart } from "../../store/useCart";
import { formatPrice } from "../../utils/functions"

const store = useCart();
const route = useRoute();


const product = store.getSingleProduct(route.params.slug);


</script>

