<template>
  <div
    v-if="products"
    class="mt-12"
  >
    <div
      v-for="product in products"
      :key="product.id"
    >
      <div class="flex flex-col mt-6 sm:w1/2 md:w-1/3 lg:1/4 xl:w-1/4">
        <img
          class="container mx-auto transition duration-500 ease-in-out transform cursor-pointer hover:scale-105"
          :alt="product.name"
          src="../../../img/jpg/product-image.jpg"
        >
        <div class="flex justify-center pt-3">
          <p class="text-xl font-bold text-center cursor-pointer">
            {{ product.name }}
          </p>
        </div>
        <div class="flex justify-center mt-2">
          <div class="ml-4 text-xl text-gray-900">
            ${{ product.price }}
          </div>
        </div>

        <button
          class="p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          @click="$store.commit('ADD_PRODUCT_TO_CART', product)"
        >
          Add To Cart
        </button>
      </div>
    </div>
    Cart: {{ $store.state.cart }}
  </div>
  <loading-spinner v-if="loading" />
</template>

<script>
import {
  defineComponent, reactive, toRefs, onMounted,
} from 'vue';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default defineComponent({
  components: { LoadingSpinner },
  setup() {
    const state = reactive({
      loading: true,
      products: null,
    });
    const fetchProducts = () => {
      axios
        .get('/api/products')
        .then((response) => {
          // commit('updateProducts', response.data);
          state.products = response.data;
          state.loading = false;
        })
        .catch((error) => console.error(error));
    };

    onMounted(fetchProducts);

    return { ...toRefs(state) };
  },
});
</script>

<style></style>
