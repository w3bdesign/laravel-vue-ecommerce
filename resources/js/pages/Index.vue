<template>
    <carousel-component :images="carouselImages" />
    <showall-products />
</template>

<script setup>

import { ref } from 'vue';

const carouselImages = ref([
    'https://via.placeholder.com/800x300?text=Image+1',
    'https://via.placeholder.com/800x300?text=Image+2',
    'https://via.placeholder.com/800x300?text=Image+3',
]);
</script>
