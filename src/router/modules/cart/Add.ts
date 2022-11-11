import Layout from "@/layout/index.vue";

export default {
  path: "/carts",
  component: Layout,
  redirect: "/carts/add",
  name: "add",
  meta: {
    title: "carts",
    icon: "ShoppingTrolley",
    permissionDesc: "购物车菜单",
  },
  children: [
    {
      path: "/carts/add",
      name: "add",
      component: () => import("@/views/carts/index.vue"),
      meta: { title: "add", icon: "TrendCharts", permissionDesc: "添加购物车" },
    },
  ],
};
