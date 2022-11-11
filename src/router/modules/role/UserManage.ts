import Layout from "@/layout/index.vue";

export default {
  path: "/roles",
  component: Layout,
  redirect: "/roles/list",
  name: "userManage",
  meta: {
    title: "roleManage",
    icon: "UserFilled",
    permissionDesc: "角色管理菜单",
  },
  children: [
    {
      path: "/roles/userManage",
      name: "userManage",
      component: () => import("@/views/role/userManage/index.vue"),
      meta: { title: "userManage", icon: "List", permissionDesc: "用户管理" },
    },
  ],
};
