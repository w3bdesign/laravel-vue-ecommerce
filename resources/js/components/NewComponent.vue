<template>
    <div>Testing out API</div>
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
            })
            .catch((error) => console.error(error));
    },
    // props: ["foo"],
    setup() {
        const greeting = "Greetings";
        return { greeting };
    },
};
</script>

<style></style>
