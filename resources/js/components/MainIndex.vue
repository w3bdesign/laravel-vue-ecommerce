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
            Add to cart:
            <button @click="this.$store.commit('addProductToCart', 'testproduct')">Add to cart</button
            ><br />
            Cart: {{ this.$store.state.cart }}
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "./Header/Navbar";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

export default defineComponent({
    components: { LoadingSpinner, NavBar },
    data() {
        return {
            loading: true,
            products: null,
        };
    },
    mounted() {
        axios
            .get("/api/products")
            .then((response) => {
                // commit('updateProducts', response.data);
                this.products = response.data;
                this.loading = false;
            })
            .catch((error) => console.error(error));
    },

    /*setup() {
        const products = {};
        return { products };
    },*/
});
</script>

<style></style>
