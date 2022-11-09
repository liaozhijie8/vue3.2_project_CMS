import Layout from "@/layout/index.vue";

export default {
  path: "/roles",
  component: Layout,
  redirect: "/roles/list",
  name: "roleManage",
  meta: {
    title: "roleManage",
    icon: "UserFilled",
    permissionDesc: "角色管理菜单",
  },
  children: [
    {
      path: "/roles/list",
      name: "roleList",
      component: () => import("@/views/role/roleList/index.vue"),
      meta: { title: "roleList", icon: "List", permissionDesc: "角色列表" },
    },
  ],
};
