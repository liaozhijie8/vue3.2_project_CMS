import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
/* 公开路由表 */
const publicRouter = [
  {
    path: "/",
    component: Layout,
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRouter,
});

export default router;
