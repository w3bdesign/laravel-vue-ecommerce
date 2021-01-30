<template>
  <div>
    <products />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import Products from '../../components/Products/Products.vue';

export default defineComponent({
  components: { Products },
});
</script>
