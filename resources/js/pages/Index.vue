<template>
    <carousel-component :images="carouselImages" />
    <showall-products />
</template>

<script setup>

import { ref } from 'vue';

const carouselImages = ref([
{ src: '/images/Hero.jpg', text: 'MacBook Air 12 In Store now!' },
{ src: '/images/Hero.jpg', text: 'MacBook Air 13 In Store now!' },
{ src: '/images/Hero.jpg', text: 'MacBook Air 14 In Store now!' },
]);
</script>
