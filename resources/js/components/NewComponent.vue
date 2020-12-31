<template>
    <div>Testing out New Vue 3 components <br />Greeting: {{ greeting }}</div>
    <div>Foo: {{ foo }}</div>
</template>

<script>
export default {
    props: ["foo"],
    setup() {
        const greeting = "Greetings";
        return { greeting };
    },
};
</script>

<style></style>
