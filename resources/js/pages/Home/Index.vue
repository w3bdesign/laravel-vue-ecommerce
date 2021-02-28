<template>
  <div>
    <error />
    <hero />
    <products />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import Hero from './Hero.vue';
import Error from './Error.vue';
import Products from '../Products/Products.vue';

export default defineComponent({
  components: { Hero, Products, Error },
});
</script>
