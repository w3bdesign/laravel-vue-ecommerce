<template>
    <swiper :navigation="true" :modules="[Navigation]" class="mySwiper">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <div class="relative">
          <img :src="image.src" :alt="'Image ' + (index + 1)" class="w-full object-cover" />
          <span
            class="z-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-2xl text-black bg-white rounded-lg mt-4 hidden md:block"
          >
            {{ image.text }}
          </span>
        </div>
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