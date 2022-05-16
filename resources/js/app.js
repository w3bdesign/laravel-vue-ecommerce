require("./bootstrap");

import { createApp } from "vue";
import { createPinia } from "pinia";

import Layout from "./layout/Layout.vue";

import Cart from "./components/Header/Cart.vue";
import ShowAllProducts from "./components/Products/ShowAllProducts.vue"
import Hero from "./components/Index/Hero.vue";
import Navbar from "./components/Header/Navbar.vue";
import FooterContent from "./components/Footer/Footer.vue";

import router from "./router/index";

import "flowbite";

const app = createApp({});

app.component("hero-component", Hero);
app.component("nav-bar", Navbar);
app.component("footer-content", FooterContent);
app.component("cart-component", Cart);
app.component("layout-component", Layout);
app.component("showall-products", ShowAllProducts);

app.use(createPinia());
app.use(router);
app.mount("#app");
