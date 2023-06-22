<template>
    <swiper-container ref="swiperRef" class="swiper-container" slides-per-view="1" pagination-el=".swiper-pagination">
        <swiper-slide v-for="(image, index) in images" :key="index" class="swiper-slide">
            <img :src="image" :alt="'Image ' + (index + 1)" />
        </swiper-slide>
        <div class="swiper-pagination"></div>
    </swiper-container>
</template>
  
<script setup>
import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';
import { ref } from 'vue';

const props = defineProps({
    images: Array,
});

register();

const swiperRef = ref(null);
</script>
  
<style>
.swiper-slide img {
    width: 100%;
    height: auto;
}
</style>