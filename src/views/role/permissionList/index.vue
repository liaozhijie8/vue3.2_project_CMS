<template>
  <el-col :span="8">
    <el-card shadow="hover">
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          prop="permissionName"
          label="权限"
          sortable
          width="180"
        />
        <el-table-column
          prop="permissionMark"
          label="对应的权限关键字"
          sortable
          width="180"
        />
        <el-table-column
          prop="permissionDesc"
          label="描述"
          sortable
          width="180"
        />
      </el-table>
    </el-card>
  </el-col>
</template>
<script setup lang="ts">
import { handlePermissionName } from "../utils/routerData";
const tableData = handlePermissionName();
</script>
<style scoped lang="scss"></style>
