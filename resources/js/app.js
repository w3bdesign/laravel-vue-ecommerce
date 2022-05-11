require("./bootstrap");

import { createApp } from "vue";
import HelloWorld from "./components/Welcome";

const app = createApp({});

app.component("hello-world", HelloWorld);

app.mount("#app");
