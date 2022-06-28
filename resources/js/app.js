require("./bootstrap");

import { createApp } from "vue";
import { createPinia } from "pinia";

import Layout from "./layout/Layout.vue";

import Cart from "./components/Header/Cart.vue";
import ShowAllProducts from "./components/Products/ShowAllProducts.vue";
import Hero from "./components/Index/Hero.vue";
import Navbar from "./components/Header/Navbar.vue";
import FooterContent from "./components/Footer/Footer.vue";
import OrderCheckout from "./components/Checkout/OrderCheckout.vue";
import OrderForm from "./components/Checkout/OrderForm.vue";

import { registerBaseComponents } from "./helpers/registerBaseComponents";

import router from "./router/index";

import "flowbite";
import piniaPersist from "pinia-plugin-persist";

const app = createApp({});
const pinia = createPinia();

registerBaseComponents(app);

app.component("hero-component", Hero);
app.component("nav-bar", Navbar);
app.component("footer-content", FooterContent);
app.component("cart-component", Cart);
app.component("layout-component", Layout);
app.component("showall-products", ShowAllProducts);
app.component("order-checkout", OrderCheckout);
app.component("order-form", OrderForm);

app.use(pinia);
app.use(router);
pinia.use(piniaPersist);
app.mount("#app");
