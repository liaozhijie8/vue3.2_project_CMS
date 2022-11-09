import { defineStore } from "pinia";
import { publicRouter } from "@/router";
import { ref, computed } from "vue";
import { getUserRoleID } from "@/api/userRole";
import { findPermission } from "@/api/role";
import { ElMessage } from "element-plus";
import { getIdArray } from "@/views/role/roleList/utils";
export const permissionStore = defineStore("permission", () => {
  const routes = ref(publicRouter); //路由数据
  /* 增加路由 */
  const setRoutes = (payload) => {
    routes.value = [...publicRouter, ...payload];
  };
  const UserPermissionName = ref([]);
  const hasUserPermissionName = computed(() => {
    return UserPermissionName.value.length > 0;
  });
  /* 请求路由参数 */
  const getUserPermissionName = async (id: Number) => {
    // 查找用户拥有的角色
    await getUserRoleID(id)
      .then((res) => {
        const role_id_array = getIdArray(res.result.role_id);
        // 查找角色拥有的权限
        role_id_array.forEach(async (item) => {
          await findPermission(Number(item)).then((res) => {
            UserPermissionName.value.push(...getIdArray(res.result.permissionName));
          });
        });
      })
      .catch((err) => {
        ElMessage.error(err.message);
      });
  };
  return {
    routes,
    setRoutes,
    getUserPermissionName,
    UserPermissionName,
    hasUserPermissionName,
  };
});
