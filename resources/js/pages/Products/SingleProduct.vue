<template>
  <div>
    Single product!
    <pre>

    Router params: {{ this.$route.params.slug }}
    <br>

    </pre>
  </div>
</template>

<script>
import {
  defineComponent, toRefs, reactive, onMounted,
} from 'vue';
// import { useStore } from 'vuex';
import axios from 'axios';

export default defineComponent({
  name: 'SingleProduct',
  setup() {
    // const store = useStore();
    const localState = reactive({
      loading: true,
      products: null,
    });

    const fetchProducts = () => {
      axios
        .get('/api/products')
        .then((response) => {
          console.log('Response: ');
          console.log(response.data);
          localState.products = response.data;
          console.log(response.data);
          localState.loading = false;
        })
        .catch((error) => console.error(error));
    };
    onMounted(fetchProducts);
    // return { ...toRefs(state) };

    /* const singleProduct = computed(() => localState.products.find(
      (product) => product.slug === this.$route.params.slug,
    )); */
    return { ...toRefs(localState) };
  },
});
</script>

<style></style>
