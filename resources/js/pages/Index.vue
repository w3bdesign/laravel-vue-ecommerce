<template>
  <div>
    <error />
    <hero />
    <show-products />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import Hero from '../components/Home/Hero.vue';
import Error from '../components/Home/Error.vue';
import ShowProducts from '../components/Products/ShowProducts.vue';

export default defineComponent({
  components: { Hero, ShowProducts, Error },
});
</script>
