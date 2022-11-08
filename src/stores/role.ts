import { defineStore } from "pinia";
import { getAllRole, updateRole, removeRole, addRole } from "@/api/role";
import { ref, computed } from "vue";
export const roleStore = defineStore("role", () => {
  /* 获取角色列表 */
  const roleList = ref([]);
  const getRoleList = async () => {
    await getAllRole()
      .then((res) => {
        roleList.value = res.result;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hasRoleslist = computed(() => {
    return JSON.stringify(roleList.value) !== "[]";
  });
  /* 更改角色信息 */
  const updateRoleInfo = async (palyload) => {
    const { id, ...res } = palyload;
    return await updateRole(id, res)
      .then((res) => {
        getRoleList();
        return res;
      })
      .catch((err) => {
        return err;
      });
  };
  /* 删除角色 */
  const deleteRole = async (palyload: Number) => {
    return await removeRole(palyload)
      .then((res) => {
        getRoleList();
        return res.message;
      })
      .catch((err) => {
        return err.message;
      });
  };
  /* 添加角色 */
  const addRoleInfo = async (payload) => {
    return await addRole(payload)
      .then((res) => {
        getRoleList();
        return res.message;
      })
      .catch((err) => {
        return err.message;
      });
  };
  return {
    roleList,
    getRoleList,
    updateRoleInfo,
    deleteRole,
    addRoleInfo,
    hasRoleslist,
  };
});
