import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import store from './store/index';

import Layout from './components/Layouts/Layout.vue';
import FooterContent from './components/Footer/FooterContent.vue';
import Cart from './components/Header/Cart.vue';
import CartContents from './components/Cart/CartContents.vue';
import Index from './components/Index.vue';
import Products from './components/Products/Products.vue';
import Categories from './components/Categories/Categories.vue';

require('./bootstrap');

const routes = [
  { path: '/', component: Index },
  { path: '/products', component: Products },
  { path: '/categories', component: Categories },
  { path: '/cart', component: CartContents },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp({
  components: {
    FooterContent, Cart, Layout, Index, Products, Categories, CartContents,
  },
})
  .use(store)
  .use(router)
  .mount('#app');
