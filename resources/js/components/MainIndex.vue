<template>
    <div>
        <nav-bar />
        Laravel Ecommerce
        <loading-spinner v-if="loading" />
        <div v-if="products">
            <div v-for="product in products" :key="product.id">
                {{ product.id }} - {{ product.name }} -
                {{ product.description }} - {{ product.price }}
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "./Header/Navbar";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

export default {
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
                console.log("We got a response!");
                console.log(response.data);
                this.products = response.data;
                this.loading = false;
                console.log(this.products);
            })
            .catch((error) => console.error(error));
    },

    /*setup() {
        const products = {};
        return { products };
    },*/
};
</script>

<style></style>
