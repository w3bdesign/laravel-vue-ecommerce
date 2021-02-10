<template>
  <div>
    This is the checkout page We will list products and have a checkout here
    <br>
    Cart: {{ $store.state.cart }}
    <br>

    <div>
      <h1 class="h-10 p-6 text-3xl font-bold text-center">
        Cart
      </h1>
      <section class="mt-10">
        <div
          v-for="products in $store.state.cart"
          :key="products.id"
          class="container mx-auto mt-4 flex-container"
        >
          <div
            class="item"
          >
            <span class="block mt-2 font-extrabold">Remove: <br></span>
            <span class="item-content">
              X
            </span>
          </div>
          <div class="item">
            <span class="block mt-2 font-extrabold">Name: <br></span>
            <span class="item-content">{{ products.name }}</span>
          </div>
          <div class="item">
            <span class="block mt-2 font-extrabold">Quantity: <br> </span>
            <span class="item-content">
              {{ products.quantity }}
            </span>
          </div>
          <div class="item">
            <span class="block mt-2 font-extrabold">Subtotal: <br></span>
            <span class="item-content"> {{ products.total }} </span>
          </div>
        </div>
      </section>
      <h2
        v-if="!$store.state.cart.length"
        class="m-4 text-3xl text-center"
      >
        Cart is currently empty
      </h2>
      Checkout button
    </div>
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

    const processPayment = async () => {
      console.log('Process!');
    };

    onMounted(async () => {
      state.stripe = await loadStripe(process.env.MIX_STRIPE_KEY);
      console.log('Stripe test: ');
      console.log(state.stripe);
      console.log('Cart computed: ');
      console.log(cart);
    });

    return { ...toRefs(state), cart, processPayment };
  },
});
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  max-width: 1380px;
  @apply border border-gray-300 rounded-lg shadow;
}

.item {
  @apply lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto;
}

.item-content {
  @apply inline-block mt-4 w-20 h-12 md:w-full lg:w-full xl:w-full;
}

.removing {
  @apply animate-spin cursor-not-allowed;
}
</style>
