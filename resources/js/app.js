import { createApp } from 'vue';

import store from './store/index';
import router from './router/index';

import Layout from './components/Layout/Layout.vue';
import FooterContent from './components/Layout/Footer/FooterContent.vue';
import Cart from './components/Layout/Header/Cart.vue';

import Index from './pages/Home/Index.vue';
import Products from './pages/Products/Products.vue';
import SingleProduct from './pages/Products/SingleProduct.vue';
import Categories from './pages/Categories/Categories.vue';
import Checkout from './pages/Checkout/Checkout.vue';
import Summary from './pages/Checkout/Summary.vue';

require('./bootstrap');

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
    Summary,
  },
  created() {
    if (store.state.products.length === 0) {
      store.dispatch('getProductsFromApi');
    }
  },
})
  .use(store)
  .use(router)
  .mount('#app');
