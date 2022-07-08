<template>
  <div>
    <section class="mt-10">
      <div v-if="localState.orderError" class="h-10 p-4">
        <span class="text-lg text-center text-red-500"
          >Error during order. Please retry</span
        >
      </div>

      <cart-summary />

      

      <div
        v-for="{ id, name, quantity, price } in getCartContent"
        :key="id"
        class="container mx-auto mt-4 flex border border-gray-300 rounded-lg shadow flex-wrap flex-row justify-around items-center content-center"
      >
        <div class="lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto">
          <span class="block mt-2 text-xl font-bold">Remove: <br /></span>
          <span class="inline-block mt-4 lg:h-12 h-20 w-32 md:w-full lg:w-full xl:w-full">
            <a tabindex="0" @click="removeProductFromCart(product)">
              <img
                class="mt-2 ml-4 cursor-pointer"
                :class="{
                  removing: localState.removingCartItem,
                }"
                alt="Remove icon"
                aria-label="Remove"
                src="../../../img/svg/Remove.svg"
              />
            </a>
          </span>
        </div>
        <div class="lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto">
          <span class="block mt-2 text-xl font-bold">Name: <br /></span>
          <span
            class="text-lg inline-block mt-4 lg:h-12 h-20 w-32 md:w-full lg:w-full xl:w-full"
            >{{ name }}</span
          >
        </div>
        <div class="lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto">
          <span class="block mt-2 text-xl font-bold">Quantity: <br /> </span>
          <span
            class="text-lg inline-block mt-4 lg:h-12 h-20 w-32 md:w-full lg:w-full xl:w-full"
          >
            {{ quantity }}
          </span>
        </div>
        <div class="item">
          <span class="block mt-2 text-xl font-bold">Price: <br /></span>
          <span
            class="text-lg inline-block mt-4 lg:h-12 h-20 w-32 md:w-full lg:w-full xl:w-full"
          >
            {{ formatPrice(price) }}
          </span>
        </div>
      </div>
      <div
        v-if="getCartQuantity"
        class="container mx-auto mt-2 flex flex-wrap flex-row justify-end items-end content-center"
      >
        <span class="p-4 text-2xl font-extrabold text-right"
          >Total: {{ formatPrice(getCartTotal) }}</span
        >
      </div>
    </section>
    <h2 v-if="!getCartQuantity" class="m-4 text-3xl text-center">
      Cart is currently empty
    </h2>
    <div v-else>
      <div v-show="!getCustomerDetails.firstName">
        <order-form />
      </div>
      <transition name="fade">
        <div v-show="getCustomerDetails.firstName">
          <customer-details />
          <fakevisa-details />
          <!-- TODO: Refactor Stripe into separate component -->
          <h2 class="h-10 p-4 mt-6 text-2xl font-bold text-center">Stripe payment</h2>
          <div class="flex justify-center w-full align-center">
            <div id="card-element" class="w-full h-16 mt-6 lg:w-5/12 xl:w-5/12">
              Stripe
            </div>
          </div>
          <div class="flex justify-center w-full align-center">
            <button
              class="mt-6 px-6 py-2 font-semibold text-white rounded-md hover:opacity-90 transition-all duration-500 ease-in-out focus:outline-none bg-blue-600"
              :class="{
                disabledButton: localState.paymentIsProcessing,
              }"
              :disabled="localState.paymentIsProcessing"
              @click="checkout(product)"
            >
              Submit order
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { loadStripe } from "@stripe/stripe-js";

import { formatPrice } from "../../utils/functions";
import { useCart } from "../../store/useCart";

const localState = reactive({
  removingCartItem: false,
  paymentIsProcessing: false,
  stripe: {},
  cardElement: {},
  customer: {},
  orderError: false,
});

const store = useCart();

const { getCartQuantity, getCartContent, getCartTotal, getCustomerDetails } = storeToRefs(
  store
);

const removeProductFromCart = (product) => {
  localState.removingCartItem = true;
  store.removeFromCart(product);
  localState.removingCartItem = false;
};

onMounted(async () => {
  localState.stripe = await loadStripe(process.env.MIX_STRIPE_KEY);
  const stripeElements = localState.stripe.elements();

  localState.cardElement = stripeElements.create("card", {
    classes: {
      base:
        "bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out",
    },
  });

  localState.cardElement.mount("#card-element");
});

const checkout = async () => {
  const { paymentMethod, error } = await localState.stripe.createPaymentMethod(
    "card",
    localState.cardElement,
    {
      billing_details: {
        name: "Test test",
        email: "test@test.no",
        address: {
          line1: "Test",
          city: "City",
          state: "State",
          postal_code: "1234",
        },
      },
    }
  );

  if (error || !paymentMethod.id) {
    localState.orderError = "Error";
    return;
  }

  const kunde = {
    ...store.getCustomerDetails,
    cart: JSON.stringify(store.getCartContent),
    amount: 5000,
    payment_method_id: paymentMethod.id,
  };

  axios
    .post("/api/purchase", kunde)
    .then((response) => {
      localState.paymentIsProcessing = true;

      if (response.statusText === "Created") {
        localState.paymentIsProcessing = false;
        store.clearCart();
        store.clearCustomer();
      }
    })
    .catch(() => {
      localState.paymentIsProcessing = false;
      localState.orderError = true;
    });
};
</script>

<style>
.disabledButton {
  @apply cursor-not-allowed opacity-50;
}

.flex-container {
  @apply container mx-auto mt-4 flex border border-gray-300 rounded-lg shadow flex-wrap flex-row justify-around items-center content-center;
}

.item {
  @apply lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto;
}

.inline-block {
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
