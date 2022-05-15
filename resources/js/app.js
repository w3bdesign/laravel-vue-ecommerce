require("./bootstrap");

import { createApp } from "vue";
import { createPinia } from "pinia";

import Layout from "./layout/Layout.vue";

import Cart from "./components/Cart";

import Hero from "./components/Hero.vue";

import Navbar from "./components/Navbar.vue";
import FooterContent from "./components/Footer.vue";

import router from "./router/index";

import "flowbite";

const app = createApp({});

app.component("hero-component", Hero);


app.component("nav-bar", Navbar);
app.component("footer-content", FooterContent);
app.component("cart-component", Cart);


app.component("layout-component", Layout);

app.use(createPinia());
app.use(router);
app.mount("#app");
