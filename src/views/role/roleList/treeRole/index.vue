<template>
  <el-tree
    ref="treeRef"
    :data="data"
    show-checkbox
    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps"
    @check="test"
  />

  <div class="buttons">
    <el-button @click="getCheckedKeys">get by key</el-button>
    <el-button @click="setCheckedKeys">set by key</el-button>
    <el-button @click="resetChecked">reset</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { ElTree } from "element-plus";
import { routerData } from "../../utils/routerData";
import { addPermission, findPermission } from "@/api/role";
import { getIdArray } from "../utils";
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
const getCheckedKeys = () => {
  console.log(treeRef.value!.getCheckedKeys(false));
};
const test = async () => {
  const data = treeRef.value!.getCheckedKeys(false);
  await addPermission(props.roleId, { permission_id: data.toString() }).then(
    (res) => {
      console.log(res);
    }
  );
  console.log(treeRef.value!.getCheckedKeys(false));
};

const setCheckedKeys = () => {
  treeRef.value!.setCheckedKeys(["0"], false);
};
const resetChecked = () => {
  treeRef.value!.setCheckedKeys([], false);
};
</script>
