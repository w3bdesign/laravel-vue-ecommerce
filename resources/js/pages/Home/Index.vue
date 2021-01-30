<template>
  <div>
    <hero />
    <products />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import Hero from './Hero.vue';
import Products from '../../components/Products/Products.vue';

export default defineComponent({
  components: { Hero, Products },
});
</script>
