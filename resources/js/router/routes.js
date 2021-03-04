import Index from '../pages/Home/Index.vue';
import Products from '../pages/Products/Products.vue';
import SingleProduct from '../pages/Products/SingleProduct.vue';
import Categories from '../pages/Categories/Categories.vue';
import Checkout from '../pages/Checkout/Checkout.vue';
import Summary from '../pages/Checkout/Summary.vue';

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

export default routes;
