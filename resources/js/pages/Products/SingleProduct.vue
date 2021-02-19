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
      console.log(route.params.slug);
    };
    onMounted(fetchProduct);

    const singleProduct = computed(() => localState.products.find(
      (product) => product.slug === this.$route.params.slug,
      // route params slug,
    ));

    return { ...toRefs(localState), singleProduct };
  },
});
</script>
