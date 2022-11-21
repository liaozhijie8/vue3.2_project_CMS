<template>
  <el-button @click="openEdit" type="primary">添加</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="名称" prop="version_sort" width="100">
    </el-table-column>
    <el-table-column label="规格" prop="format_sort" width="120">
    </el-table-column>
    <el-table-column label="颜色" width="120">
      <template #default="scope">
        <SelectBox></SelectBox>
      </template>
    </el-table-column>
    <el-table-column label="价格" width="100"><p>价格</p> </el-table-column>
    <el-table-column label="库存" width="100"><p>库存</p> </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <DialogBox v-model="isEditDialog" width="28%">
    <template #title><h4>编辑参数</h4></template>
    <template #content>
      <EditFormBox @form-data="formData"></EditFormBox>
    </template>
  </DialogBox>
</template>

<script lang="ts" setup>
import SelectBox from "@/components/select/index.vue";
import DialogBox from "@/components/dialog/index.vue";
import EditFormBox from "../editForm/index.vue";
import type { Version } from "@/interface/form_table_interface";
import { ref } from "vue";
import { getGoodsVersion } from "@/utils/sort_handle";
const emits = defineEmits(["version-data"]);
const handleEdit = (index: number, row: Version) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: Version) => {
  console.log(index, row);
};

const tableData = ref([]);
// 显示添加框
const isEditDialog = ref(false);
// 打开添加
const openEdit = () => {
  isEditDialog.value = true;
};
const formData = (val) => {
  tableData.value.push(val);
  emits("version-data", tableData.value);
};
</script>
