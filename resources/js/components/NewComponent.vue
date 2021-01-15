<template>
    <div>
        Testing out API
        <div v-if="products">
            Products is true ...
            <div v-for="product in products" :key="product.id">
                Echoing out name:
                {{ product.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        axios
            .get("/api/products")
            .then((response) => {
                // commit('updateProducts', response.data);
                console.log("We got a response!");
                console.log(response.data);
                this.products = response.data;
            })
            .catch((error) => console.error(error));
    },
    // props: ["foo"],
    setup() {
        //const greeting = "Greetings";
        const products = {};
        return { products };
    },
};
</script>

<style></style>
