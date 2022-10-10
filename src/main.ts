import { createApp } from "vue";
import { createPinia } from "pinia";
// element ui
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
//引入axios
import axios from "axios";
import VueAxios from "vue-axios";
import "@/styles/index.scss"; //全局css
// 路由守卫
import "@/permission";

const app = createApp(App);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
