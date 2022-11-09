import Layout from "@/layout/index.vue";

export default {
  path: "/goods",
  component: Layout,
  name: "goods",
  redirect: "/goods/list",
  meta: { title: "goods", icon: "Goods", permissionDesc: "商品管理菜单" },
  children: [
    {
      path: "/goods/update",
      name: "update",
      component: () => import("@/views/goods/update/index.vue"),
      meta: { title: "update", icon: "Sort", permissionDesc: "更新商品信息" },
    },
  ],
};
