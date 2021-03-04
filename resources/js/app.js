import { createApp } from 'vue';

import store from './store/index';
import router from './router/index';

import Layout from './layouts/Layout.vue';

import FooterContent from './components/Footer/FooterContent.vue';
import Cart from './components/Header/Cart.vue';
import SingleProduct from './components/Products/SingleProduct.vue';

import Index from './pages/Index.vue';
import Products from './pages/Products.vue';
import Categories from './pages/Categories.vue';
import Checkout from './pages/Checkout.vue';
import Success from './pages/Success.vue';

require('./bootstrap');

const emptyCart = store.state.products.length === 0;

createApp({
  components: {
    FooterContent,
    Cart,
    Layout,
    Index,
    Products,
    SingleProduct,
    Categories,
    Checkout,
    Success,
  },
  created() {
    if (emptyCart) {
      store.dispatch('getProductsFromApi');
    }
  },
})
  .use(store)
  .use(router)
  .mount('#app');
