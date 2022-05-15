// Pages
import Index from "../pages/Index.vue";
/*
import Products from '../pages/Products.vue';
import Categories from '../pages/Categories.vue';
import Checkout from '../pages/Checkout.vue';
import Success from '../pages/Success.vue';*/

// Components
//import SingleProduct from '../components/Products/SingleProduct.vue';

const routes = [
    { path: "/", component: Index }
    
    /*{ path: '/products', component: Products },
  {
    name: 'single.product',
    path: '/product/:slug',
    component: SingleProduct,
  },
  { path: '/categories', component: Categories },
  { path: '/checkout', component: Checkout },
  { path: '/success', component: Success },*/
];

export default routes;
