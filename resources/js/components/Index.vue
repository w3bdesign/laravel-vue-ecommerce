<template>
  <div>
    <hero />
    <products />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import Hero from './Index/Hero.vue';
import Products from './Products/Products.vue';

export default defineComponent({
  components: { Hero, Products },
});
</script>
