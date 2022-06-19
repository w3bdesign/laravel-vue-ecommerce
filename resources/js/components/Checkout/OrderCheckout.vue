<template>
    <div>
        <h1 class="h-10 p-6 text-4xl font-bold text-center">Checkout</h1>
        <section class="mt-10">
            <div v-if="localState.orderError" class="h-10 p-4">
                <span class="text-lg text-center text-red-500">Error during order. Please retry</span>
            </div>
            <div v-for="products in cartContent" :key="products.id"
                class="container mx-auto mt-4 flex border border-gray-300 rounded-lg shadow flex-wrap flex-row justify-around items-center content-center">
                <div class="item">
                    <span class="block mt-2 text-xl font-bold">Remove: <br /></span>
                    <span class="item-content">
                        <a tabindex="0" @click="removeProductFromCart(products)">
                            <img class="mt-2 ml-4 cursor-pointer" :class="{
                                removing: localState.removingCartItem,
                            }" alt="Remove icon" aria-label="Remove" src="../../../img/svg/Remove.svg" />
                        </a>
                    </span>
                </div>
                <div class="item">
                    <span class="block mt-2 text-xl font-bold">Name: <br /></span>
                    <span class="text-lg item-content">{{
                            products.name
                    }}</span>
                </div>
                <div class="item">
                    <span class="block mt-2 text-xl font-bold">Quantity: <br />
                    </span>
                    <span class="text-lg item-content">
                        {{ products.quantity }}
                    </span>
                </div>
                <div class="item">
                    <span class="block mt-2 text-xl font-bold">Price: <br /></span>
                    <span class="text-lg item-content">
                        {{ formatPrice(products.price) }}
                    </span>
                </div>
            </div>
            <div v-if="cartLength"
                class="container mx-auto mt-2 flex flex-wrap flex-row justify-end items-end content-center">
                <span class="p-4 text-2xl font-extrabold text-right">Total: {{ formatPrice(localState.cartTotal)
                }}</span>
            </div>
        </section>
        <h2 v-if="!cartLength" class="m-4 text-3xl text-center">
            Cart is currently empty
        </h2>
        <div v-if="cartLength">
            <h2 class="h-10 m-2 text-2xl font-bold text-center">
                Customer Details
            </h2>
            <div class="flex justify-center w-full align-center">
                customer-details-form
            </div>
            <transition name="fade">
                <div v-show="
                    customerDetails.firstName &&
                    localState.checkoutFormIsValid
                ">
                    <div class="flex justify-center w-full align-center">
                        <span class="h-10 p-4 text-lg font-bold text-center text-red-500">Use the following card details
                            for testing:
                            <br />4242424242424242 <br />CVC any 3 digits
                            <br />Any future date <br />Any zip code
                        </span>
                    </div>
                    <h2 class="h-10 p-4 mt-32 text-2xl font-bold text-center">
                        Stripe payment
                    </h2>
                    <div class="flex justify-center w-full p-4 align-center">
                        <br />
                        <div id="card-element" class="w-full h-16 mt-4 lg:w-5/12 xl:w-5/12">
                            Stripe
                        </div>
                    </div>
                    <div class="flex justify-center w-full align-center">
                        <button
                            class="p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700;"
                            :class="{
                                disabledButton: localState.paymentIsProcessing,
                            }" :disabled="localState.paymentIsProcessing" @click="checkout(products)">
                            Checkout
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

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

const cartLength = store.getCartQuantity;

const cartContent = store.getCartContent;

const customerDetails = store.getCustomerDetails;
</script>

<style>
.disabledButton {
    @apply cursor-not-allowed opacity-50;
}



.flex-container {
    @apply container mx-auto mt-4 flex border border-gray-300 rounded-lg shadow flex-wrap flex-row justify-around items-center content-center;
}



.item {
    @apply lg: m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto;
}

.item-content {
    @apply inline-block mt-4 lg: h-12 h-20 w-32 md:w-full lg:w-full xl:w-full;
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
