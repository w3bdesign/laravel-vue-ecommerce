<template>
    <carousel-component :images="carouselImages" />
    <showall-products />
</template>

<script setup>

import { ref } from 'vue';

const carouselImages = ref([
    '/images/Hero.jpg',
    '/images/Hero.jpg',
    '/images/Hero.jpg',
]);
</script>
