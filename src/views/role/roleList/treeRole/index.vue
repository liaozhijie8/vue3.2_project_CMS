<template>
  <el-tree
    ref="treeRef"
    :data="data"
    show-checkbox
    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps"
    @check="addpermissionEvent"
  />
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { ElMessage, ElTree } from "element-plus";
import { routerData } from "../../utils/routerData";
import { addPermission, findPermission } from "@/api/role";
import { getIdArray, getNodes } from "../utils";
const props = defineProps({
  roleId: {
    type: Number,
    required: true,
  },
});
interface Tree {
  id: String;
  permissionName: string;
  permissionMark: string;
  permissionDesc: string;
  children?: Tree[];
}

const treeRef = ref<InstanceType<typeof ElTree>>();
const data: Tree[] = routerData();
const defaultProps = {
  children: "children",
  label: "permissionName",
};
/* 查找角色的权限id */
const getRolePermission = async () => {
  const checkedKeys = await findPermission(props.roleId).then((res) => {
    return res.result.permission_id;
  });
  treeRef.value!.setCheckedKeys(getIdArray(checkedKeys), false);
};
// watch 无法监听到数据的变化,原因是每次关闭按钮到会销毁组件,该组件是按v-if显示
watchEffect(() => {
  getRolePermission();
});
/* 为角色添加权限id和名字 */
const addpermissionEvent = async () => {
  const data = treeRef.value!.getCheckedKeys(false);
  const dataNodes = treeRef.value!.getCheckedNodes(false, false);
  const permissionName = getNodes(dataNodes).toString();
  const permission_id = data.toString();
  await addPermission(props.roleId, { permission_id, permissionName })
    .then((res) => {
      ElMessage.success(res.message);
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
};
</script>
