<template>
  <show-products />
</template>

<script>
import { defineComponent } from 'vue';

import ShowProducts from '../components/Products/ShowProducts.vue';

export default defineComponent({
  components: { ShowProducts },
});
</script>
