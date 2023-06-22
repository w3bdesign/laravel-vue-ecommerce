<template>
    <swiper :navigation="true" :modules="[Navigation]" class="mySwiper">
        <swiper-slide v-for="(image, index) in images" :key="index">
            <img :src="image" :alt="'Image ' + (index + 1)" />
        </swiper-slide>
    </swiper>
</template>
  
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

const props = defineProps({
    images: Array,
});

defineExpose({
    Swiper,
    SwiperSlide,
});
</script>
  
<style>
.mySwiper {
    width: 100%;
    height: 350px;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide images vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>