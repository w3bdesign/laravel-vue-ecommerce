<template>
  <div>
    Single product!
    <pre>
    Router params: {{ this.$route.params.slug }}
    Product: {{ product }}

    <br>
    </pre>
  </div>
</template>

<script>
import {
  defineComponent, toRefs, reactive, computed, onBeforeMount, // onMounted
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
      product: null,
    });
    const singleProduct = computed(
      () => store.state.products.find(
        // (product) => product.slug === this.$route.params.slug,
        (product) => product.slug === route.params.slug,
      ),
      // route params slug,
    );

    const fetchProduct = () => {
      // localState.products = store.state.products;
      localState.product = singleProduct;
      console.log(localState.product);
      localState.loading = false;

      console.log('Params: ');
      console.log(route.params.slug);
    };
    // onMounted(fetchProduct);
    onBeforeMount(fetchProduct);

    return { ...toRefs(localState) };
  },
});
</script>
