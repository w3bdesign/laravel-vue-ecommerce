require("./bootstrap");

import { createApp } from "vue";

import TestComponent from "./components/TestComponent.vue";
import NewComponent from "./components/NewComponent.vue";

createApp({
    components: { TestComponent, NewComponent },
}).mount("#app");
