<template>
  <order-checkout />
</template>

<script>
import { defineComponent } from 'vue';

import OrderCheckout from '../components/Checkout/OrderCheckout.vue';

export default defineComponent({
  components: { OrderCheckout },
});
</script>
