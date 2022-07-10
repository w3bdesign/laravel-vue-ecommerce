<template>
  <div v-if="getOrderDetails">
    <h1 class="h-64 mt-24 p-6 text-3xl font-bold text-center">
      Order completed with order ID #{{ getOrderDetails }}
    </h1>
  </div>
</template>

<script setup>
import { useCart } from "../store/useCart";

const store = useCart();

const { getOrderDetails, clearOrder } = store;

clearOrder();
</script>
