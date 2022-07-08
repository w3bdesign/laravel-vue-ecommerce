<template>
  <div class="container mx-auto">
    <transition name="fade">
      <div v-if="getCartQuantity">
        <router-link to="/checkout">
          <img
            alt="Cart icon"
            class="h-12 ml-4 lg:ml-2"
            aria-label="Cart"
            src="../../../img/svg/Cart.svg"
          />
          <span class="absolute w-6 h-6 pb-2 ml-16 -mt-12 text-center text-white bg-black rounded-full lg:ml-14">
            {{ getCartQuantity }}
          </span>
          <span>Total: {{ formatPrice(getCartTotal) }}</span>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useCart } from "../../store/useCart";
import { formatPrice } from "../../utils/functions";

const store = useCart();

const { getCartQuantity, getCartTotal } = storeToRefs(store);
</script>

<style scoped>
.cartQuantity {
  @apply absolute w-6 h-6 pb-2 ml-16 -mt-12 text-center text-white bg-black rounded-full lg:ml-14;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
