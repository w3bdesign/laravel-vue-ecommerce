<template>
    <div class="container mx-auto mt-12">
        <div v-if="store.cart.length">
            Cart:
            <pre>{{ cart }}</pre>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useCart } from "../../store/useCart";

const store = useCart();

const { cart } = storeToRefs(store);
</script>
