import { defineStore } from "pinia";
import { publicRouter } from "@/router";
import { ref, computed } from "vue";
import { getUserRoleID } from "@/api/userRole";
import { findPermission } from "@/api/role";
import { getIdArray } from "@/views/role/roleList/utils";
import { privateRouter } from "@/router";
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
  /* 清空路由参数 */
  const removeUserPermissionName = () => {
    UserPermissionName.value = [];
  };
  /* 处理路由参数 */
  const handleRoutesData = async () => {
    const temp = [];
    UserPermissionName.value.forEach((item) => {
      const matchItem = privateRouter.filter((key) => {
        return key.children[0].name === item;
      });
      if (matchItem.length > 0) {
        temp.push(...matchItem);
      }
    });
    setRoutes(temp);
    return temp;
  };
  /* 查找当前角色拥有的权限名称 */
  const findPermissionEvent = (item) => {
    return new Promise((resolve, reject) => {
      findPermission(Number(item)).then((res) => {
        const { permissionName } = res.result;
        resolve(getIdArray(permissionName));
      }); // 查找角色拥有的权限
    });
  };
  const getUserPermissionName = async (id: number) => {
    const { result } = await getUserRoleID(id); // 查找用户拥有的角色
    const { role_id } = result;
    const temp = [];
    const role_id_array = getIdArray(role_id);
    return new Promise(async (resolve, reject) => {
      role_id_array.forEach(async (item) => {
        await temp.push(findPermissionEvent(item));
      });
      for await (const key of temp) {
        UserPermissionName.value.push(...key);
      }
      resolve(UserPermissionName.value);
    });
  };
  return {
    routes,
    setRoutes,
    getUserPermissionName,
    UserPermissionName,
    hasUserPermissionName,
    handleRoutesData,
    removeUserPermissionName,
  };
});
