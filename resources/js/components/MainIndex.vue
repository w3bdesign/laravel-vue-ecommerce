<template>
    <div>
        <nav-bar />
        Laravel Vue 3 Ecommerce
        <loading-spinner v-if="loading" />
        <div v-if="products">
            <div v-for="product in products" :key="product.id">
                {{ product.id }} - {{ product.name }} -
                {{ product.description }} - {{ product.price }}
            </div>

            <button
                class="p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded"
                @click="$store.commit('addProductToCart', 'clicktestproduct')"
            >
                Add to cart button</button
            ><br />
            Cart: {{ $store.state.cart }}
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import NavBar from "./Header/Navbar";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

export default defineComponent({
    components: { LoadingSpinner, NavBar },
    setup() {
        const state = reactive({
            loading: true,
            products: null,
        });

        const fetchProducts = () => {
            axios
                .get("/api/products")
                .then((response) => {
                    // commit('updateProducts', response.data);
                    state.products = response.data;
                    state.loading = false;
                })
                .catch((error) => console.error(error));
        };

        onMounted(fetchProducts);

        return { ...toRefs(state) };
    },
});
</script>

<style></style>
