<template>
  <div class="account-container">
    <div class="bnt-container">
      <el-button type="success" :icon="Refresh">恢复账户</el-button>
      <el-button type="danger" :icon="Delete">禁用账户</el-button>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="10" />
      <el-table-column property="id" label="序号" :min-width="width" />
      <el-table-column property="user_name" label="用户名" :min-width="width" />
      <el-table-column label="用户身份" :min-width="width">
        <template #default="scope">{{
          scope.row.is_admin ? "管理员" : "会员"
        }}</template>
      </el-table-column>
      <el-table-column label="用户状态" :min-width="width">
        <template #default="scope">{{
          scope.row.deletedAt ? "销户" : "正常"
        }}</template>
      </el-table-column>
      <el-table-column
        label="注册时间"
        property="createdAt"
        show-overflow-tooltip
        :formatter="dateFormat"
        :min-width="width"
      >
      </el-table-column>
      <el-table-column
        label="销户时间"
        show-overflow-tooltip
        :min-width="width"
      >
        <template #default="scope">{{ scope.row.deletedAt }}</template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        v-model:currentPage="currentPage"
        @current-change="currentEvent"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElTable } from "element-plus";
import { Refresh, Delete } from "@element-plus/icons-vue";
import { userStore } from "@/stores";
import dayjs from "dayjs";
interface User {
  id: number;
  user_name: string;
  is_admin: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
/* 获取用户列表数据 */
const width = ref(30);
const user = userStore();
const pageSize = Number(user.pageSize);
const total = Number(user.userCount);
const tableData: User[] = computed(() => {
  return user.userList;
});
// 格式化时间
const dateFormat = (row) => {
  var date = row.createdAt;
  if (date === undefined) {
    return "";
  }
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
/* 点击页码变化 */
const currentPage = ref();
// 重新获取数据
const currentEvent = () => {
  user.getUser_list(currentPage.value);
};
</script>

<style scoped lang="scss">
.account-container {
  width: 100%;
  height: 100vh;
}
.bnt-container {
  height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid var(--el-border-color);
}
.pagination-container {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
}
</style>
