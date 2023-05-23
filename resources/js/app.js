require("./bootstrap");

import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import { createAutoAnimatePlugin } from "@formkit/addons";

import Layout from "./layout/Layout.vue";

import Cart from "./components/Header/Cart.vue";
import Navbar from "./components/Header/Navbar.vue";
import MobileMenu from "./components/Header/MobileMenu.vue";
import Search from "./components/Header/Search.vue";

import ShowAllProducts from "./components/Products/ShowAllProducts.vue";
import SingleProduct from "./components/Products/SingleProduct.vue";

import CustomerDetails from "./components/Checkout/CustomerDetails.vue";
import FakeVisaDetails from "./components/Checkout/FakeVisaDetails.vue";
import CartSummary from "./components/Checkout/CartSummary.vue";

import Carousel from "./components/Index/Carousel.vue";

import FooterContent from "./components/Footer/Footer.vue";
import OrderCheckout from "./components/Checkout/OrderCheckout.vue";
import OrderForm from "./components/Checkout/OrderForm.vue";

import { registerBaseComponents } from "./helpers/registerBaseComponents";

import router from "./router/index";

import "flowbite";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp({});
const pinia = createPinia();

registerBaseComponents(app);

app.component("customer-details", CustomerDetails);
app.component("fakevisa-details", FakeVisaDetails);
app.component("cart-summary", CartSummary);

app.component("carousel-component", Carousel);
app.component("mobile-menu", MobileMenu);

app.component("nav-bar", Navbar);
app.component("search", Search);
app.component("footer-content", FooterContent);
app.component("cart-component", Cart);
app.component("layout-component", Layout);
app.component("showall-products", ShowAllProducts);
app.component("order-checkout", OrderCheckout);
app.component("order-form", OrderForm);
app.component("single-product", SingleProduct);

app.use(pinia);
app.use(router);
app.use(
    plugin,
    defaultConfig({
        plugins: [createAutoAnimatePlugin()],
        theme: "genesis",
    })
);

pinia.use(piniaPluginPersistedstate);

app.mount("#app");
