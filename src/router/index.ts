import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
/* 公开路由表 */
const publicRouter = [
  {
    /* 首页 */
    path: "/",
    component: Layout,
    redirect: "/profile",
    meta: { title: "home", icon: "House" },
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/user/profile/index.vue"),
        meta: {
          title: "profile",
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
  /* 角色管理 */
  {
    path: "/roles",
    component: Layout,
    redirect: "/roles/list",
    meta: { title: "roleManage", icon: "UserFilled" },
    children: [
      {
        path: "/roles/list",
        name: "roleList",
        component: () => import("@/views/role/roleList/index.vue"),
        meta: { title: "roleList", icon: "List" },
      },
    ],
  },
  /* 商品操作 */
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/list",
    meta: { title: "goods", icon: "Goods" },
    children: [
      {
        path: "/goods/list",
        name: "list",
        component: () => import("@/views/goods/list/index.vue"),
        meta: { title: "list", icon: "List" },
      },
      {
        path: "/goods/create",
        name: "create",
        component: () => import("@/views/goods/create/index.vue"),
        meta: { title: "create", icon: "Upload" },
      },
      {
        path: "/goods/update",
        name: "update",
        component: () => import("@/views/goods/update/index.vue"),
        meta: { title: "update", icon: "Sort" },
      },
    ],
  },
  /* 购物车操作 */
  {
    path: "/carts",
    component: Layout,
    redirect: "/carts/add",
    meta: { title: "carts", icon: "ShoppingTrolley" },
    children: [
      {
        path: "/carts/add",
        name: "carts",
        component: () => import("@/views/carts/index.vue"),
        meta: { title: "add", icon: "TrendCharts" },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRouter, ...privateRouter],
});

export default router;
