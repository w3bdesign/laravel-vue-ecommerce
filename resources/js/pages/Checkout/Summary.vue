<template>
  <div>
    <h1 class="h-10 p-6 text-4xl font-bold text-center">
      Order summary
    </h1>
    <div class="mt-4">
      <pre>{{ order }}</pre>
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

<style></style>
