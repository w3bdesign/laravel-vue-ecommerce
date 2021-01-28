require("./bootstrap");

import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import store from "./store/index";

import Layout from "./components/Layouts/Layout.vue";
import Index from "./components/Index.vue";
import Products from "./components/Products/Products.vue";
import Categories from "./components/Categories/Categories.vue";

const routes = [
    { path: "/", component: Index },
    { path: "/products", component: Products },
    { path: "/categories", component: Categories },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp({
    components: { Layout, Index, Products, Categories },
})
    .use(store)
    .use(router)
    .mount("#app");
