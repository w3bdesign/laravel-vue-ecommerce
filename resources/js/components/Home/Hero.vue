<template>
  <div
    id="hero"
    class="flex w-full mx-auto mt-16 bg-right bg-cover md:pt-0 md:items-center"
  >
    <div
      class="flex flex-col items-start justify-center w-full px-6 tracking-wide lg:w-1/2"
    >
      <span class="p-4 my-4 text-2xl text-black bg-white rounded-lg">
        MacBook Air 14 In Store now!
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
};
</script>

<style scoped>
#hero {
  background-image: url("../../../img/jpg/Hero.jpg");
  height: 24rem;
}
</style>
