import { createApp } from "vue";
// 导入pinia
import { store } from "./stores";
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
// i18n
import i18n from "@/i18n";
// 导入svgicon
import installIcons from "@/components/SvgIcon";
import "virtual:svg-icons-register";
// 全局属性
import installFilter from "@/filter";
import installDirective from "@/directives";

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.use(i18n);
// 全局注册组件
installIcons(app);
installFilter(app);
installDirective(app);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
