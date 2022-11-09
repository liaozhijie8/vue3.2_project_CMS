<template>
  <el-tree
    ref="treeRef"
    :data="data"
    show-checkbox
    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps"
  />

  <div class="buttons">
    <el-button @click="getCheckedNodes">get by node</el-button>
    <el-button @click="getCheckedKeys">get by key</el-button>
    <el-button @click="setCheckedNodes">set by node</el-button>
    <el-button @click="setCheckedKeys">set by key</el-button>
    <el-button @click="resetChecked">reset</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElTree } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { routerData } from "../../utils/routerData";

interface Tree {
  id: number;
  permissionName: string;
  permissionMark: string;
  permissionDesc: string;
  children?: Tree[];
}

const treeRef = ref<InstanceType<typeof ElTree>>();

const getCheckedNodes = () => {
  console.log(treeRef.value!.getCheckedNodes(false, false));
};
const getCheckedKeys = () => {
  console.log(treeRef.value!.getCheckedKeys(false));
};
const setCheckedNodes = () => {
  treeRef.value!.setCheckedNodes(
    [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 9,
        label: "Level three 1-1-1",
      },
    ] as Node[],
    false
  );
};
const setCheckedKeys = () => {
  treeRef.value!.setCheckedKeys([3], false);
};
const resetChecked = () => {
  treeRef.value!.setCheckedKeys([], false);
};

const defaultProps = {
  children: "children",
  label: "permissionName",
};

const data: Tree[] = routerData();
</script>
