<template>
    <div class="container mx-auto mt-12">
        <transition name="fade">
            <div v-if="store.getCartQuantity">
                Quantity: {{ store.getCartQuantity }}
            </div>
        </transition>
    </div>
</template>

<script setup>
//import { storeToRefs } from "pinia";

import { useCart } from "../../store/useCart";

const store = useCart();

// const { cart } = storeToRefs(store);
</script>

<style scoped>
.cartQuantity {
    @apply absolute w-6 h-6 pb-2 ml-16 -mt-12 text-center text-white bg-black rounded-full lg:ml-14;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 10.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
