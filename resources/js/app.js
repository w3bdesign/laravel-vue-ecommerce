import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import store from './store/index';

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

const routes = [
  { path: '/', component: Index },
  { path: '/products', component: Products },
  {
    name: 'single.product',
    path: '/product/:slug',
    component: SingleProduct,
  },
  { path: '/categories', component: Categories },
  { path: '/checkout', component: Checkout },
  { path: '/thankyou', component: Summary },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

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
    store
      .dispatch('getProductsFromApi')
      .then(() => {})
      .catch((error) => console.error(error));
  },
})
  .use(store)
  .use(router)
  .mount('#app');
