require("./bootstrap");

import { createApp } from "vue";
import { createPinia } from "pinia";

import HelloWorld from "./components/Welcome";

const app = createApp({});

app.component("hello-world", HelloWorld);
app.use(createPinia());
app.mount("#app");
