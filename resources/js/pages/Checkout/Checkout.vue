<template>
  <div>
    This is the checkout page We will list products and have a checkout here
    <br>
    Cart: {{ $store.state.cart }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup(_, { emit }) {
    console.log('Emit: ');
    console.log(emit);
  },

});

</script>
