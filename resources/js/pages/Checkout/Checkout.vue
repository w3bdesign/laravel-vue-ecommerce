<template>
  <div>
    <h1 class="h-10 p-6 text-4xl font-bold text-center">
      Checkout
    </h1>
    <section class="mt-10">
      <div
        v-for="products in cartContent"
        :key="products.id"
        class="container mx-auto mt-4 flex-container"
      >
        <div class="item">
          <span
            class="block mt-2 font-extrabold"
          >Remove: <br></span>
          <span class="item-content">
            <img
              class="mt-2 ml-4 cursor-pointer"
              :class="{ removing: removingCartItem }"
              alt="Remove icon"
              aria-label="Remove"
              src="../../../img/svg/Remove.svg"
              @click="removeProductFromCart(products)"
            >
          </span>
        </div>
        <div class="item">
          <span class="block mt-2 font-extrabold">Name: <br></span>
          <span class="item-content">{{ products.name }}</span>
        </div>
        <div class="item">
          <span
            class="block mt-2 font-extrabold"
          >Quantity: <br>
          </span>
          <span class="item-content">
            {{ products.quantity }}
          </span>
        </div>
        <div class="item">
          <span
            class="block mt-2 font-extrabold"
          >Subtotal: <br></span>
          <span class="item-content"> ${{ cartTotal }} </span>
        </div>
      </div>
    </section>
    <h2
      v-if="!cartLength"
      class="m-4 text-3xl text-center"
    >
      Cart is currently empty
    </h2>
    <button
      v-if="cartLength"
      class="p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      @click="checkout(products)"
    >
      Checkout
    </button>
  </div>
</template>

<script>
import {
  defineComponent, onMounted, reactive, toRefs, computed,
} from 'vue';

import { useStore } from 'vuex';

import { loadStripe } from '@stripe/stripe-js';

export default defineComponent({
  setup() {
    const store = useStore();

    const localState = reactive({
      removingCartItem: false,
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

    const cartLength = computed(() => store.state.cart.length);
    const cartTotal = computed(() => store.getters.cartTotal);
    const cartContent = computed(() => store.state.cart);

    const removeProductFromCart = (product) => {
      localState.removingCartItem = true;
      store.dispatch('removeProductFromCart', product);
      localState.removingCartItem = false;
    };

    const checkout = async () => {
      console.log('Checkout process!');
    };

    onMounted(async () => {
      localState.stripe = await loadStripe(process.env.MIX_STRIPE_KEY);
      console.log('Stripe test: ');
      console.log(localState.stripe);
    });

    return {
      ...toRefs(localState),
      store,
      cartLength,
      cartTotal,
      cartContent,
      removeProductFromCart,
      checkout,
    };
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
