<template>
  <div>
    <h1 class="h-10 p-6 text-4xl font-bold text-center">
      Checkout
    </h1>
    <section class="mt-10">
      <div
        v-if="orderError"
        class="h-10 p-4"
      >
        <span
          class="text-lg text-center text-red-500"
        >Error during order. Please retry</span>
      </div>
      <div
        v-for="products in cartContent"
        :key="products.id"
        class="container mx-auto mt-4 flex-container"
      >
        <div class="item">
          <span
            class="block mt-2 text-xl font-bold"
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
          <span
            class="block mt-2 text-xl font-bold"
          >Name: <br></span>
          <span class="text-lg item-content">{{
            products.name
          }}</span>
        </div>
        <div class="item">
          <span
            class="block mt-2 text-xl font-bold"
          >Quantity: <br>
          </span>
          <span class="text-lg item-content">
            {{ products.quantity }}
          </span>
        </div>
        <div class="item">
          <span
            class="block mt-2 text-xl font-bold"
          >Price: <br></span>
          <span class="text-lg item-content">
            {{ formatPrice(products.price) }}
          </span>
        </div>
      </div>
      <div
        v-if="cartLength"
        class="container mx-auto mt-2 flex-container-total"
      >
        <span
          class="p-4 text-2xl font-extrabold text-right"
        >Total: {{ formatPrice(cartTotal) }}</span>
      </div>
    </section>
    <h2
      v-if="!cartLength"
      class="m-4 text-3xl text-center"
    >
      Cart is currently empty
    </h2>
    <div v-if="cartLength">
      <h2 class="h-10 m-2 text-2xl font-bold text-center">
        Customer Details
      </h2>
      <div class="flex justify-center w-full align-center">
        <customer-details-form />
      </div>
      <transition name="fade">
        <div v-show="customerDetails.firstName || checkoutFormIsValid">
          <div class="flex justify-center w-full align-center">
            <span
              class="h-10 p-4 text-lg font-bold text-center text-red-500"
            >Use the following card details for testing:
              <br>4242424242424242 <br>CVC any 3
              digits <br>Any future date
              <br>Any zip code
            </span>
          </div>
          <h2 class="h-10 p-4 mt-32 text-2xl font-bold text-center">
            Stripe payment
          </h2>
          <div class="flex justify-center w-full p-4 align-center">
            <br>
            <div
              id="card-element"
              class="w-full h-16 mt-4 lg:w-5/12 xl:w-5/12"
            >
              Stripe
            </div>
          </div>
          <div class="flex justify-center w-full align-center">
            <button
              class="checkoutButton"
              :class="{ disabledButton: paymentIsProcessing }"
              :disabled="paymentIsProcessing"
              @click="checkout(products)"
            >
              Checkout
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {
  defineComponent, onMounted, reactive, computed, toRefs,
} from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';

import { formatPrice } from '../../utils/functions';

import CustomerDetailsForm from './CustomerDetailsForm.vue';

export default defineComponent({
  components: { CustomerDetailsForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const localState = reactive({
      removingCartItem: false,
      paymentIsProcessing: false,
      stripe: {},
      cardElement: {},
      customer: {},
      orderError: false,
    });

    const cartLength = computed(() => store.state.cart.length);
    const cartTotal = computed(() => store.getters.cartTotal);
    const cartContent = computed(() => store.state.cart);
    const customerDetails = computed(() => store.getters.customerDetails);
    const checkoutFormIsValid = computed(() => store.getters.checkoutFormIsValid);

    const removeProductFromCart = (product) => {
      localState.removingCartItem = true;
      store.dispatch('removeProductFromCart', product);
      localState.removingCartItem = false;
    };

    const checkout = async () => {
      const { customer } = store.state;
      const {
        paymentMethod,
        error,
      } = await localState.stripe.createPaymentMethod(
        'card',
        localState.cardElement,
        {
          billing_details: {
            name: `${customer.firstName} ${customer.lastName}`,
            email: customer.email,
            address: {
              line1: customer.address,
              city: customer.city,
              state: customer.state,
              postal_code: customer.zipcode,
            },
          },
        },
      );

      if (error) {
        localState.paymentIsProcessing = false;
        return;
      }
      localState.paymentIsProcessing = true;
      localState.customer = { ...customer };

      const stripeAmount = store.getters.cartTotal * 100;
      localState.customer.amount = stripeAmount;
      localState.customer.cart = JSON.stringify(store.state.cart);
      localState.customer.payment_method_id = paymentMethod.id;

      // Stripe amount must be a minimum of 3 kr
      if (stripeAmount > 300) {
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
          .catch(() => {
            localState.paymentIsProcessing = false;
            localState.orderError = true;
          });
      }
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
      checkoutFormIsValid,
      customerDetails,
    };
  },
});
</script>

<style scoped>
.disabledButton {
  @apply cursor-not-allowed opacity-50;
}

.checkoutButton {
  @apply p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700;
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

.flex-container-total {
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  align-content: center;
  max-width: 1380px;

  @apply flex;
}

.item {
  @apply lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto;
}

.item-content {
  @apply inline-block mt-4 lg:h-12 h-20 w-32 md:w-full lg:w-full xl:w-full;
}

.removing {
  @apply animate-spin cursor-not-allowed;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
