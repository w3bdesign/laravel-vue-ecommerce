require("./bootstrap");

import { createApp } from "vue";

import store from "./store/index";
import MainIndex from "./components/MainIndex.vue";

createApp({
    components: { MainIndex },
})
    .use(store)
    .mount("#app");

//app.use(store);
