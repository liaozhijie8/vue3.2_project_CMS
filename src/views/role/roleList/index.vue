<template>
  <el-col :span="12" class="role-container">
    <el-card shadow="hover">
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
        v-model="openDialog"
        :title-name="dialogName"
        @close-click="closeEvent"
      >
        <TreeTemplate v-if="permissionBnt" :role-id="roleId"></TreeTemplate>
        <FormTemplate :rule-form-data="dialogData" v-else></FormTemplate>
      </DialogTemplate>
    </el-card>
  </el-col>
</template>
<script setup lang="ts">
import { CirclePlus } from "@element-plus/icons-vue";
import TableTemplate from "../components/table/index.vue";
import DialogTemplate from "../components/dialog/index.vue";
import FormTemplate from "../components/form/index.vue";
import { roleStore } from "@/stores";
import { ElMessage } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { openMessage } from "@/components/messageBox";
import TreeTemplate from "./treeRole/index.vue";
const role = roleStore();
//渲染tabel的数据数组
const titleArray = ref([
  { prop: "id", label: "编号", width: 100 },
  { prop: "title", label: "角色", width: 150 },
  { prop: "describe", label: "功能", width: 300 },
]);
//渲染tabel的操作按钮
const actionArray = ref([
  { id: 1, name: "分配权限", type: "permission", color: "primary" },
  { id: 2, name: "修改角色", type: "update", color: "warning" },
  { id: 3, name: "删除角色", type: "delete", color: "danger" },
]);
/* 先获取数据 */
onMounted(() => {
  role.getRoleList();
});
/* 获取全部角色 */
const allRoles = computed(() => {
  return role.roleList;
});
/* 修改角色 */
//弹出修改框
const openDialog = ref(false);
const dialogName = ref("");
const dialogData = ref({});
// 分配权限按钮
const permissionBnt = ref(false); //显示分配权限对话框
const roleId = ref();
const editAction = async (val) => {
  if (val.type === "update") {
    openDialog.value = true;
    dialogData.value = val;
    dialogName.value = `修改用户角色---${val.title}`;
  }
  // 删除角色
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
  // 权限分配
  if (val.type === "permission") {
    roleId.value = val.id;
    permissionBnt.value = true;
    openDialog.value = true;
    dialogName.value = `分配权限---${val.title}`;
  }
};
const closeEvent = (val) => {
  openDialog.value = val;
  permissionBnt.value = val;
};
/* 添加角色 */
const addRoleClick = () => {
  openDialog.value = true;
  dialogName.value = "添加角色";
  dialogData.value = {
    title: "",
    describe: "",
  };
};
</script>
<style scoped lang="scss">
@import "@/styles/mixin.scss";
.role-container {
  .addRole {
    padding: 20px;
  }
}
</style>
