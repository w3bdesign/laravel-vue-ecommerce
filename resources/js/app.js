require("./bootstrap");

import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import { createAutoAnimatePlugin } from "@formkit/addons";

import Layout from "./layout/Layout.vue";

import Cart from "./components/Header/Cart.vue";
import ShowAllProducts from "./components/Products/ShowAllProducts.vue";
import CustomerDetails from "./components/Checkout/CustomerDetails.vue";
import FakeVisaDetails from "./components/Checkout/FakeVisaDetails.vue";

import Carousel from "./components/Index/Carousel.vue";

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

app.component("customer-details", CustomerDetails);
app.component("fakevisa-details", FakeVisaDetails);

app.component("carousel-component", Carousel);

app.component("nav-bar", Navbar);
app.component("footer-content", FooterContent);
app.component("cart-component", Cart);
app.component("layout-component", Layout);
app.component("showall-products", ShowAllProducts);
app.component("order-checkout", OrderCheckout);
app.component("order-form", OrderForm);

app.use(pinia);
app.use(router);
app.use(
    plugin,
    defaultConfig({
        plugins: [createAutoAnimatePlugin()],
        theme: "genesis",
    })
);

pinia.use(piniaPersist);

app.mount("#app");
