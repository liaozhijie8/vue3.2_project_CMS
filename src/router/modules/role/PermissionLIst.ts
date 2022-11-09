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
      path: "/roles/premission",
      name: "permissionList",
      component: () => import("@/views/role/permissionList/index.vue"),
      meta: {
        title: "permissionList",
        icon: "List",
        permissionDesc: "权限管理",
      },
    },
  ],
};
