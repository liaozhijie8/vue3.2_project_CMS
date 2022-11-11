import { createRouter, createWebHistory } from "vue-router";
import PermissionList from "./modules/role/PermissionLIst";
import RoleList from "./modules/role/RoleList";
import UserManage from "./modules/role/UserManage";
import GoodsCreate from "./modules/goods/GoodsCreate";
import GoodsList from "./modules/goods/GoodsList";
import GoodsUpdate from "./modules/goods/GoodsUpdate";
import Add from "./modules/cart/Add";
import Layout from "@/layout/index.vue";
import { permissionStore, userStore } from "@/stores";

/* 公开路由表 */
export const publicRouter = [
  {
    /* 首页 */
    path: "/",
    component: Layout,
    redirect: "/profile",
    name: "home",
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
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/errorPage/404.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/errorPage/404.vue"),
  },
  /* 登录页 */
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
];
export const privateRouter = [
  RoleList,
  UserManage,
  PermissionList,
  GoodsCreate,
  GoodsList,
  GoodsUpdate,
  Add,
];
/* 私有路由表 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRouter,
});
/* 重置路由表 */
export const resetRouter = () => {
  const permission = permissionStore();
  const user = userStore();
  if (user.userInfo && permission.hasUserPermissionName) {
    const menus = permission.UserPermissionName;
    menus.forEach((item) => {
      if (router.hasRoute(item)) {
        router.removeRoute(item);
      }
    });
  }
};
export default router;
