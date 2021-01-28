<template>
    <div>
        <transition name="cart">
            <span
                v-if="cartLength"
                class="text-xl text-white no-underline lg:text-black is-active"
            >
                <img
                    alt="Cart icon"
                    class="h-12 ml-4 lg:ml-2"
                    aria-label="Cart"
                    src="../../../img/svg/Cart.svg"
            /></span>
        </transition>
        <transition name="cart">
            <div>
                <span
                    class="absolute w-6 h-6 pb-2 ml-16 -mt-12 text-center text-white bg-black rounded-full lg:ml-14"
                >
                    {{ cartLength }}
                </span>
                <span>Total: 0 </span>
            </div>
        </transition>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const cartLength = computed(() => store.state.cart.length);

        return { cartLength };
    },
};
</script>

<style scoped>
.cart-enter-active,
.cart-leave-active {
    transition: all 0.5s;
}
.cart-enter,
.cart-leave-active {
    opacity: 0;
    transform: translateX(-50px);
    transform: translateY(-50px);
}
</style>
