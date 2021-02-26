<template>
  <div v-if="error">
    Error: {{ error }}
  </div>
</template>

<script>
import {
  defineComponent, computed, onErrorCaptured, ref,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({

  setup() {
    const store = useStore();
    const productStateLength = computed(() => store.getters.productStateLength);

    const error = ref(null);

    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });

    return { productStateLength, error };
  },

});
</script>

<style>

</style>
