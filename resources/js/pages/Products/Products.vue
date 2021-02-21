<template>
  <div>
    <div
      id="product-container"
      class="flex flex-wrap items-center"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="flex flex-col pr-6 mt-6 sm:w1/2 md:w-1/3 lg:1/4 xl:w-1/4"
      >
        <router-link
          :to="{
            name: 'single.product',
            params: { slug: product.slug },
          }"
        >
          <img
            v-if="product.imageUrl !== undefined"
            class="productImage"
            :alt="product.name"
            :src="product.imageUrl"
          >
          <img
            v-else
            class="productImage"
            :alt="product.name"
            :src="placeholderImage"
          >
          <div class="flex justify-center pt-3">
            <p class="text-xl font-bold text-center cursor-pointer">
              {{ product.name }}
            </p>
          </div>
          <div class="flex justify-center mt-2">
            <div class="ml-4 text-xl text-gray-900">
              {{ formatPrice(product.price) }}
            </div>
          </div>
          <button class="productButton">
            View Product
          </button>
        </router-link>
      </div>
    </div>

    <loading-spinner v-if="loading" />
  </div>
</template>

<script>
import { useStore } from 'vuex';

import {
  defineComponent, reactive, toRefs, onBeforeMount,
} from 'vue';

import { formatPrice } from '../../utils/functions';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.vue';

export default defineComponent({
  components: { LoadingSpinner },
  setup() {
    const store = useStore();
    const localState = reactive({
      loading: true,
      products: null,
    });

    const placeholderImage = process.env.MIX_PLACEHOLDER_SMALL_IMAGE_URL;

    const fetchProducts = () => {
      localState.products = store.state.products;
      localState.loading = false;
    };

    onBeforeMount(fetchProducts);

    return { ...toRefs(localState), formatPrice, placeholderImage };
  },
});
</script>

<style scoped>
.productButton {
  @apply w-full p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700;
}
</style>
