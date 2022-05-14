require("./bootstrap");

import { createApp } from "vue";
import { createPinia } from "pinia";

import HelloWorld from "./components/Welcome";
import ModalComponent from "./components/Modal.vue";
import TestComponent from "./components/Test.vue";
import MainComponent from "./components/Main.vue";

import "flowbite";

const app = createApp({});

app.component("hello-world", HelloWorld);
app.component("modal-component", ModalComponent);
app.component("test-component", TestComponent);
app.component("main-component", MainComponent);

app.use(createPinia());
app.mount("#app");
