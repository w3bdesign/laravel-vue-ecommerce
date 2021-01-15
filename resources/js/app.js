require("./bootstrap");

import { createApp } from "vue";

import NewComponent from "./components/NewComponent.vue";

createApp({
    components: { NewComponent },
}).mount("#app");
