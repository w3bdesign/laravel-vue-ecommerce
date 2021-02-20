<template>
  <div v-if="product">
    <section>
      <div
        class="container flex flex-wrap items-center pt-4 pb-12 mx-auto"
      >
        <div
          class="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2"
        >
          <img
            v-if="product.image !== undefined"
            id="product-image"
            class="h-auto p-8 transition duration-500 ease-in-out transform xl:p-2 md:p-2 lg:p-2 hover:grow hover:shadow-lg hover:scale-105"
            :alt="product.name"
            :src="product.image.sourceUrl"
          >
          <img
            v-else
            id="product-image"
            class="productImage"
            :alt="product.name"
            src="https://res.cloudinary.com/duelisue0/image/upload/v1595541416/Nextjs-Woocommerce/placeholder-616-616_beecp5.jpg"
          >
          <div class="ml-8">
            <p class="text-3xl font-bold text-left">
              {{ product.name }}
            </p>

            <p class="pt-1 mt-4 text-2xl text-gray-900">
              {{ formatPrice(product.price) }}
            </p>
            <br>
            <p class="pt-1 mt-4 text-2xl text-gray-900">
              {{ product.description }}
            </p>

            <div class="pt-1 mt-2">
              <button
                class="p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                @click="addProductToCart(product)"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  computed,
  onBeforeMount,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import { formatPrice } from '../../utils/functions';

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

    return { ...toRefs(localState), addProductToCart, formatPrice };
  },
});
</script>
