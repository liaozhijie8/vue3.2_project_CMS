import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
/* 公开路由表 */
const publicRouter = [
  {
    /* 首页 */
    path: "/",
    component: Layout,
    redirect: "/profile",
    meta: { title: "首页", icon: "House" },
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/user/profile/index.vue"),
        meta: {
          title: "个人中心",
          icon: "User",
        },
      },
    ],
  },
  /* 登录页 */
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
];
/* 私有路由表 */
const privateRouter = [
  /* 商品操作 */
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/create",
    meta: { title: "商品", icon: "Goods" },
    children: [
      {
        path: "/goods/create",
        name: "create",
        component: () => import("@/views/goods/index.vue"),
        meta: { title: "上传商品信息", icon: "Upload" },
      },
      {
        path: "/goods/update",
        name: "update",
        component: () => import("@/views/goods/index.vue"),
        meta: { title: "更新商品信息", icon: "Sort" },
      },
      {
        path: "/goods/off",
        name: "off",
        component: () => import("@/views/goods/index.vue"),
        meta: { title: "下架商品", icon: "Bottom" },
      },
      {
        path: "/goods/on",
        name: "on",
        component: () => import("@/views/goods/index.vue"),
        meta: { title: "上架商品", icon: "Top" },
      },
      {
        path: "/goods/list",
        name: "list",
        component: () => import("@/views/goods/index.vue"),
        meta: { title: "商品列表", icon: "Expand" },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRouter, ...privateRouter],
});

export default router;
