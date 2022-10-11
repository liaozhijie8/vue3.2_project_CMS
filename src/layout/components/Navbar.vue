<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "@/stores/user";
import { ElMessage } from "element-plus";
const user = userStore();
let ava_url = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
/* 退出登录 */
const logout = () => {
  user.logout();
  ElMessage.success("退出成功");
};
</script>
<template>
  <div class="navbar">
    <el-dropdown class="right-menu">
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="30" fit="cover" :src="ava_url" />
        <span>admin</span>
        <el-icon class="el-icon--right">
          <Setting />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <router-link to="#">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <router-link to="#">
            <el-dropdown-item disabled>管理员身份</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style scoped lang="scss">
.navbar {
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 50px;
  .right-menu {
    float: right;
    padding-right: 16px;
    .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: flex-end;
      span {
        padding-left: 5px;
      }
    }
  }
}
</style>
