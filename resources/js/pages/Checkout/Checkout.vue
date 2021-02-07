<template>
  <div>
    This is the checkout page We will list products and have a checkout here
    <br>
    Cart: {{ $store.state.cart }}
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from 'vue';

import { loadStripe } from '@stripe/stripe-js';

export default defineComponent({
  setup() {
    const state = reactive({
      stripe: {},
      cardElement: {},
      customer: {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
      },
    });

    const cart = computed(() => this.$store.state.cart);

    onMounted(async () => {
      const stripe = await loadStripe(process.env.MIX_STRIPE_KEY);
      console.log('Stripe test: ');
      console.log(stripe);
      console.log('Cart computed: ');
      console.log(cart);
    });

    return { ...toRefs(state), cart };
  },
});
</script>
