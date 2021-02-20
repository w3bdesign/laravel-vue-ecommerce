<template>
  <div
    v-if="product"
    class="mt-12"
  >
    Product: {{ product }}

    <br>
    <button
      class="p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      @click="addProductToCart(product)"
    >
      Add To Cart
    </button>
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  computed,
  onBeforeMount, // onMounted
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
    const singleProduct = computed(() => store.state.products.find(
      (product) => product.slug === route.params.slug,
    ));

    const fetchProduct = () => {
      localState.product = singleProduct;
      localState.loading = false;
    };

    const addProductToCart = (product) => store.dispatch('addProductToCart', product);

    onBeforeMount(fetchProduct);

    return { ...toRefs(localState), addProductToCart };
  },
});
</script>
