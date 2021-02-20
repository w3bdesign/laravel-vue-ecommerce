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
              :class="{ removing: localState.removingCartItem }"
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
          <span class="item-content">
            {{ formatPrice(cartTotal) }}
          </span>
        </div>
      </div>
    </section>
    <h2
      v-if="!cartLength"
      class="m-4 text-3xl text-center"
    >
      Cart is currently empty
    </h2>
    <div v-if="cartLength">
      <div class="flex justify-center w-full p-4 align-center">
        FORM here!
        <input
          v-model="value"
          type="text"
        >
        <span>{{ errorMessage }}</span>
      </div>
      <h2 class="h-10 p-6 text-2xl font-bold text-center">
        Stripe payment
      </h2>
      <div class="flex justify-center w-full p-4 align-center">
        <br>
        <div
          id="card-element"
          class="w-1/2 h-32 mt-4"
        >
          Stripe
        </div>
      </div>
      <div class="flex justify-center w-full align-center">
        <button
          class="p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          :class="{ disabledButton: paymentIsProcessing }"
          :disabled="paymentIsProcessing"
          @click="checkout(products)"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent, onMounted, reactive, computed, toRefs,
} from 'vue';
import { useField } from 'vee-validate';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';

import { formatPrice } from '../../utils/functions';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const localState = reactive({
      removingCartItem: false,
      paymentIsProcessing: false,
      stripe: {},
      cardElement: {},
      customer: {
        first_name: 'Firstname',
        last_name: 'Lastname',
        email: 'test@test.com',
        address: 'Address',
        city: 'City',
        state: 'NA',
        zipcode: '1234',
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
      const {
        paymentMethod,
        error,
      } = await localState.stripe.createPaymentMethod(
        'card',
        localState.cardElement,
        {
          billing_details: {
            name: 'Firstname Lastname', // this.customer.first_name + ' ' + this.customer.last_name,
            email: 'test@test.com', // this.customer.email,
            address: {
              line1: 'Address', // this.customer.address,
              city: 'City', // this.customer.city,
              state: 'State', // this.customer.state,
              postal_code: '1234', // this.customer.zip_code
            },
          },
        },
      );

      if (error) {
        localState.paymentIsProcessing = false;
        return;
      }
      localState.paymentIsProcessing = true;

      // const totalAmount = 99.00;
      // const amount = totalAmount.toLocaleString('nb-NO', { style: 'currency', currency: 'NOK' });
      // console.log('Currency locale: ');
      // console.log(process.env.CASHIER_CURRENCY_LOCALE);

      localState.customer.amount = 9900;
      localState.customer.cart = JSON.stringify(store.state.cart);
      localState.customer.payment_method_id = paymentMethod.id;

      axios
        .post('/api/purchase', localState.customer)
        .then((response) => {
          localState.paymentIsProcessing = false;
          if (response.statusText === 'Created') {
            store.dispatch('emptyCart');
            store.commit('UPDATE_ORDER', response.data);
            router.push('/thankyou');
          }
        })
        .catch((orderError) => {
          localState.paymentProcessing = false;
          console.log('Order NOT placed. Error: ');
          console.error(orderError);
        });
    };

    onMounted(async () => {
      localState.stripe = await loadStripe(process.env.MIX_STRIPE_KEY);
      const elements = localState.stripe.elements();
      localState.cardElement = elements.create('card', {
        classes: {
          base:
                        'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out',
        },
      });
      localState.cardElement.mount('#card-element');
    });

    const isRequired = (value) => {
      if (value && value.trim()) {
        return true;
      }
      return 'This is required';
    };

    const { errorMessage, value } = useField('fieldName', isRequired);

    return {
      ...toRefs(localState),
      localState,
      store,
      cartLength,
      cartTotal,
      cartContent,
      removeProductFromCart,
      checkout,
      formatPrice,
      errorMessage,
      value,
    };
  },
});
</script>

<style scoped>
.disabledButton {
  @apply cursor-not-allowed opacity-50;
}

.flex-container {
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  max-width: 1380px;

  @apply flex border border-gray-300 rounded-lg shadow;
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
