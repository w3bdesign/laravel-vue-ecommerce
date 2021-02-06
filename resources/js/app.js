import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import store from './store/index';

import Layout from './components/Layout/Layout.vue';
import FooterContent from './components/Layout/Footer/FooterContent.vue';
import Cart from './components/Layout/Header/Cart.vue';

import Index from './pages/Home/Index.vue';
import Products from './pages/Products/Products.vue';
import Categories from './pages/Categories/Categories.vue';
import Checkout from './pages/Checkout/Checkout.vue';

require('./bootstrap');

const routes = [
  { path: '/', component: Index },
  { path: '/products', component: Products },
  { path: '/categories', component: Categories },
  { path: '/checkout', component: Checkout },
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
    Categories,
    Checkout,
  },
})
  .use(store)
  .use(router)
  .mount('#app');
