<template>
    <div class="container mx-auto">
        <transition name="fade">
            <router-link to="/checkout">
                <div v-if="store.getCartQuantity">
                    <img alt="Cart icon" class="h-12 ml-4 lg:ml-2" aria-label="Cart" src="../../../img/svg/Cart.svg" />
                    <div class="cartQuantity">
                        Quantity: {{ store.getCartQuantity }}
                    </div>
                </div>
            </router-link>
        </transition>
    </div>
</template>

<script setup>
import { useCart } from "../../store/useCart";

const store = useCart();
</script>

<style scoped>
.cartQuantity {
    @apply absolute w-6 h-6 pb-2 ml-16 -mt-12 text-center text-white bg-black rounded-full lg: ml-14;
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
