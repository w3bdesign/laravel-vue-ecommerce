<template>
  <div>
    <div class="mt-4">
      <h2 class="h-10 p-6 text-2xl font-bold text-center">
        Thank you for your order with transaction ID {{ order.transaction_id }}
      </h2>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const order = computed(() => store.state.order);
    return {
      order,
    };
  },

};
</script>
