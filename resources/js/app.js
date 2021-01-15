require("./bootstrap");

import { createApp } from "vue";

import MainIndex from "./components/MainIndex.vue";

createApp({
    components: { MainIndex },
}).mount("#app");
