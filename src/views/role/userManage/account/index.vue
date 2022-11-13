<template>
  <div class="account-container">
    <div class="bnt-container">
      <el-button
        type="success"
        :icon="Refresh"
        @click="restoreClick"
        :disabled="multipleSelection.length == 0"
        >恢复账户</el-button
      >
      <el-button
        type="danger"
        :icon="Delete"
        @click="removeClick"
        :disabled="multipleSelection.length == 0"
        >禁用账户</el-button
      >
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      :row-style="{ height: 200 + 'px' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="10" />
      <el-table-column property="id" label="序号" :min-width="width" />
      <el-table-column property="user_name" label="用户名" :min-width="width" />
      <el-table-column label="用户身份">
        <template #default="scope">
          <!-- 身份显示 -->
          <div class="bntRole">
            <el-button
              type="primary"
              v-for="(item, index) in test2(scope.row.id)"
              :key="index"
              plain
              size="small"
              >{{ item }}</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户状态" :min-width="width">
        <template #default="scope">
          <p :style="{ color: scope.row.deletedAt ? red : green }">
            {{ scope.row.deletedAt ? "销户" : "正常" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="注册时间"
        show-overflow-tooltip
        :min-width="width"
      >
        <template #default="scope">
          <!-- 全局属性 -->
          {{ $filters.dateFilter(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column
        label="销户时间"
        show-overflow-tooltip
        :min-width="width"
      >
        <template #default="scope">
          {{ $filters.dateFilter(scope.row.deletedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="setRole(scope.row)"
            :disabled="scope.row.id === 1"
            >角色管理</el-button
          >
        </template>
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
    <!-- 对话框 -->
    <dialog-template
      v-model="openDialog"
      :title-name="titleName"
      @close-click="closeDialogEvent"
    >
      <check-box
        :role-list="allRoles"
        :user-id="userID"
        v-model="checkList"
        @update-role="updateRole"
      ></check-box>
    </dialog-template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { Refresh, Delete } from "@element-plus/icons-vue";
import { userStore } from "@/stores";
import type { User } from "@/interface/user_interface";
import dialogTemplate from "@/views/role/components/dialog/index.vue";
import checkBox from "@/views/role/userManage/chexkBox/index.vue";
import { roleStore } from "@/stores";
import { userhasRole } from "@/views/role/userManage/utils";
const role = roleStore();
const red = ref("#F56C6C");
const green = ref("#67C23A");
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
/* 先获取数据 */
/* 获取全部角色 */
const allRoles = computed(() => {
  return role.roleList;
});
// 当前已拥有的角色数据
const roleData = allRoles;

/* 获取用户列表数据 */
const width = ref(30);
const user = userStore();
const pageSize = Number(user.pageSize);
const total = Number(user.userCount);
let tableData: User[] = computed(() => {
  return user.userList;
});
// 获取用户角色
const allRolesBox = ref([]); //所有用户的拥有角色
const getUserRoleItem = async () => {
  user.userList.forEach(async (item) => {
    await userhasRole(item.id, roleData.value).then((res) => {
      allRolesBox.value.push([...res, item.id]);
    });
  });
};

// 剔除id
const test2 = (id) => {
  let temp = [];
  allRolesBox.value.forEach((item) => {
    if (item.includes(id)) {
      temp = item.filter((item) => {
        return item != id;
      });
    }
  });
  return temp;
};
// 子组件定义的事件，触发更新角色
const updateRole = () => {
  getUserRoleItem();
};
onMounted(() => {
  getUserRoleItem();
});
/* 点击页码变化 */
const currentPage = ref();
// 重新获取数据
const currentEvent = () => {
  user.getUser_list(currentPage.value);
};
/* 用户注销与恢复 */
const removeClick = () => {
  multipleSelection.value.forEach((item) => {
    if (!item.deletedAt) {
      user.remove_user(item.id);
    }
  });
  ElMessage.success("禁用账户成功");
};
// 恢复
const restoreClick = () => {
  multipleSelection.value.forEach((item) => {
    if (item.deletedAt) {
      user.restore_user(item.id);
    }
  });
  ElMessage.success("恢复账户成功");
};
/* 角色管理 */
const openDialog = ref(false);
const titleName = ref("角色管理");
const userID = ref(0);

// 选中角色数据处理
const checkList = ref([]);
// 打开角色管理
const setRole = async (val) => {
  const { id } = val;
  userID.value = id;
  await userhasRole(id, roleData.value).then((res) => {
    checkList.value = res;
  });
  openDialog.value = true;
};
const closeDialogEvent = (val) => {
  openDialog.value = val;
};
</script>

<style scoped lang="scss">
.account-container {
  width: 100%;
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
