<template>
  <show-all-products />
</template>

<script>
import { defineComponent } from 'vue';

import ShowAllProducts from '../components/Products/ShowAllProducts.vue';

export default defineComponent({
  components: { ShowAllProducts },
});
</script>
