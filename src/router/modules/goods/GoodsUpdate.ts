import Layout from "@/layout/index.vue";

export default {
  path: "/goods",
  component: Layout,
  name: "update",
  redirect: "/goods/list",
  meta: { title: "goods", icon: "Goods", permissionDesc: "商品管理菜单" },
  children: [
    {
      path: "/goods/update",
      name: "update",
      component: () => import("@/views/goods/update/index.vue"),
      meta: { title: "update", permissionDesc: "更新商品信息" },
    },
  ],
};
