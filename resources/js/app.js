require("./bootstrap");

import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import store from "./store/index";

import MainIndex from "./components/MainIndex.vue";
import Navbar from "./components/Header/Navbar.vue";
import Products from "./components/Products/Products.vue";

const routes = [
    { path: "/", component: Navbar },
    { path: "/products", component: Products },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp({
    components: { Navbar, MainIndex, Products },
})
    .use(store)
    .use(router)
    .mount("#app");
