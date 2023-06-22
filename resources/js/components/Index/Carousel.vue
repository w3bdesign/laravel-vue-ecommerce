<template>
    <swiper
      :navigation="true"
      :modules="[Navigation]"
      class="w-full h-[400px]"
    >
      <swiper-slide
        v-for="(image, index) in images"
        :key="index"
        class="flex justify-center items-center bg-white w-full h-full"
      >
        <div class="relative w-full h-full">
          <img
            :src="image.src"
            :alt="'Image ' + (index + 1)"
            class="block w-full h-full object-cover"
          />
          <span
            class="z-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-xl md:text-2xl text-black bg-white rounded-lg mt-4"
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