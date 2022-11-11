import Layout from "@/layout/index.vue";

export default {
  path: "/goods",
  component: Layout,
  name: "list",
  redirect: "/goods/list",
  meta: { title: "goods", icon: "Goods", permissionDesc: "商品管理菜单" },
  children: [
    {
      path: "/goods/list",
      name: "list",
      component: () => import("@/views/goods/list/index.vue"),
      meta: { title: "list", icon: "List", permissionDesc: "商品列表" },
    },
  ],
};
