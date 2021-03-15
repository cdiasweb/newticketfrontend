import { createApp } from "vue";
import mitt from "mitt";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import customAxios from "@/libs/customAxios";


const app = createApp(App);

app.provide("request", customAxios);
app.provide("emitter", mitt());

app.use(router);
app.use(store);

app.mount("#app");
