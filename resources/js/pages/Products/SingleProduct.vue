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
  defineComponent, toRefs, reactive, onMounted, computed,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'SingleProduct',
  setup() {
    const store = useStore();
    const route = useRoute();
    const localState = reactive({
      loading: true,
      products: null,
    });

    const fetchProduct = () => {
      localState.products = store.state.products;
      localState.loading = false;

      console.log('Params: ');
      // console.log(this.$route.params.slug);
      console.log(route.params.slug);

      /* axios
        .get('/api/products')
        .then((response) => {
          console.log('Response: ');
          console.log(response.data);
          localState.products = response.data;
          console.log(response.data);
          localState.loading = false;
        })
        .catch((error) => console.error(error)); */
    };
    onMounted(fetchProduct);

    const singleProduct = computed(() => localState.products.find(
      (product) => product.slug === this.$route.params.slug,
      // (product) => product.slug === route.params.slug,
    ));

    console.log('Single product: ');
    console.log(singleProduct);

    return { ...toRefs(localState), singleProduct };
  },
});
</script>

<style></style>
