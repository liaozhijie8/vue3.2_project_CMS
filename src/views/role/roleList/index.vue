<template>
  <div class="role-container">
    <div class="addRole">
      <el-button type="primary" :icon="CirclePlus" @click="addRoleClick"
        >添加角色</el-button
      >
    </div>
    <div class="tableBox">
      <TableTemplate
        :accep-table-data="allRoles"
        :prop-array="titleArray"
        :action-data="actionArray"
        @edit-event="editAction"
      ></TableTemplate>
    </div>

    <!-- 弹出框 -->
    <DialogTemplate
      :is_open="openDialog"
      :tabel-data="dialogData"
      @close-click="closeEvent"
    ></DialogTemplate>
  </div>
</template>
<script setup lang="ts">
import { CirclePlus } from "@element-plus/icons-vue";
import TableTemplate from "../components/table/index.vue";
import DialogTemplate from "../components/dialog/index.vue";
import { roleStore } from "@/stores";
import { ElMessage } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { openMessage } from "@/components/messageBox";
const role = roleStore();
//渲染tabel的数据数组
const titleArray = ref([
  { prop: "id", label: "编号", width: 100 },
  { prop: "title", label: "角色", width: 150 },
  { prop: "describe", label: "功能", width: 400 },
]);
//渲染tabel的操作按钮
const actionArray = ref([
  { id: 1, name: "分配权限", type: "permission", color: "primary" },
  { id: 2, name: "修改角色", type: "update", color: "warning" },
  { id: 3, name: "删除角色", type: "delete", color: "danger" },
]);
//弹出修改框
const openDialog = ref(false);
const dialogData = ref({});
/* 获取全部角色 */
const allRoles = computed(() => {
  return role.roleList;
});
//先获取数据
onMounted(() => {
  role.getRoleList();
});
const editAction = async (val) => {
  if (val.type === "update") {
    openDialog.value = true;
    dialogData.value = val;
  }
  if (val.type === "delete") {
    openMessage("这个操作将是不可逆的,你确定要删除吗？", "警告").then(() => {
      role.deleteRole(val.id).then((res) => {
        ElMessage({
          type: "success",
          message: res,
        });
      });
    });
  }
};
const closeEvent = (val) => {
  openDialog.value = val;
};
/* 添加角色 */
const addRoleClick = () => {
  openDialog.value = true;
  dialogData.value = {
    title: "",
    describe: "",
  };
};
</script>
<style scoped lang="scss">
@import "@/styles/mixin.scss";
.role-container {
  @include setBorder;
  .addRole {
    padding: 20px;
  }
  .tableBox {
    width: 1000px;
  }
}
</style>
