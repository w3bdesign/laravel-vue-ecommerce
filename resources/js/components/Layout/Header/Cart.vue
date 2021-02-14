<template>
  <div>
    <transition name="fade">
      <span
        v-if="cartQuantity"
        class="text-xl text-white no-underline lg:text-black is-active"
      >
        <router-link to="/checkout">
          <img
            alt="Cart icon"
            class="h-12 ml-4 lg:ml-2"
            aria-label="Cart"
            src="../../../../img/svg/Cart.svg"
          >
        </router-link>
      </span>
    </transition>
    <transition name="fade">
      <div v-if="cartQuantity">
        <router-link to="/checkout">
          <span class="cartQuantity">
            {{ cartQuantity.quantity }}
          </span>
          <span>Total: 0 </span>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const cartQuantity = computed(() => (store.state.cart.length ? store.state.cart.reduce(
      (item, value) => item.quantity + value.quantity,
    ) : 0));
    /* const cartTotal = computed(() => store.state.cart.reduce(
      (item, value) => item.price * value.price,
    )); */
    return { cartQuantity };
  },
};
</script>

<style scoped>
.cartQuantity {
    @apply absolute w-6 h-6 pb-2 ml-16 -mt-12 text-center text-white bg-black rounded-full lg:ml-14;
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
