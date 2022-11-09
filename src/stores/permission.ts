import { defineStore } from "pinia";
import { publicRouter } from "@/router";
import { ref } from "vue";
export const permissionStore = defineStore("permission", () => {
  const routes = ref(publicRouter); //路由数据
  /* 增加路由 */
  const setRoutes = (payload) => {
    routes.value = [...publicRouter, ...payload];
  };
  /* 请求路由参数 */
  return { routes, setRoutes };
});
