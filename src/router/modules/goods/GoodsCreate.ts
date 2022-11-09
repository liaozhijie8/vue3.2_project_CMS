import Layout from "@/layout/index.vue";

export default {
  path: "/goods",
  component: Layout,
  name: "goods",
  redirect: "/goods/list",
  meta: { title: "goods", icon: "Goods", permissionDesc: "商品管理菜单" },
  children: [
    {
      path: "/goods/create",
      name: "create",
      component: () => import("@/views/goods/create/index.vue"),
      meta: { title: "create", icon: "Upload", permissionDesc: "新建商品信息" },
    },
  ],
};
