<script setup lang="ts">
import SidebarMenu from "./sidebarMenu.vue";
import { appStore } from "@/stores/app";
import { userStore } from "@/stores/user";
import { ref } from "vue";
const app = appStore();
const user = userStore();
let ava_url = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
</script>
<template>
  <div class="sidebar" id="guide-sidebar">
    <div class="logo-container" :class="{ hideSidebar: app.sidebarOpened }">
      <el-avatar
        shape="square"
        :size="app.sidebarOpened ? 30 : 60"
        fit="cover"
        :src="ava_url"
      />
      <span class="user_name" v-if="!app.sidebarOpened">{{
        user.userInfo.user_name
      }}</span>
    </div>
    <el-scrollbar>
      <SidebarMenu></SidebarMenu>
    </el-scrollbar>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/variables.module.scss";
.sidebar {
  height: 100%;
  .logo-container {
    width: $sideBarWidth;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .user_name {
      margin-top: 10px;
      font-weight: bold;
      color: aliceblue;
    }
  }
  .hideSidebar {
    width: $hideSideBarWidth;
  }
}
</style>
