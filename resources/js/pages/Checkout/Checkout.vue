<template>
  <div>
    This is the checkout page We will list products and have a checkout here
    <br>
    Cart: {{ $store.state.cart }}

    <table class="w-full text-left whitespace-no-wrap table-auto">
      <thead>
        <tr>
          <th class="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-200 rounded-tl rounded-bl title-font">
            Item
          </th>
          <th class="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-200 title-font">
            Quantity
          </th>
          <th class="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-200 title-font">
            Price
          </th>
          <th class="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-200 title-font">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in $store.state.cart"
          :key="item.id"
        >
          <td
            class="p-4"
            v-text="item.name"
          />
          <td
            class="p-4"
            v-text="item.quantity"
          />

          <td class="w-10 text-right">
            Remove
          </td>
        </tr>
        <tr>
          <td class="p-4 font-bold">
            Total Amount
          </td>
          <td
            class="p-4 font-bold"
            v-text="cartQuantity"
          />
          <td
            class="p-4 font-bold"
            v-text="cartTotal"
          />
          <td class="w-10 text-right" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from 'vue';

import { loadStripe } from '@stripe/stripe-js';

export default defineComponent({
  setup() {
    const state = reactive({
      stripe: {},
      cardElement: {},
      customer: {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
      },
    });

    const cart = computed(() => this.$store.state.cart);

    const processPayment = async () => {
      console.log('Process!');
    };

    onMounted(async () => {
      state.stripe = await loadStripe(process.env.MIX_STRIPE_KEY);
      console.log('Stripe test: ');
      console.log(state.stripe);
      console.log('Cart computed: ');
      console.log(cart);
    });

    return { ...toRefs(state), cart, processPayment };
  },
});
</script>
