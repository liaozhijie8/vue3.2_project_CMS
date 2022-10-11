<script setup lang="ts">
import SidebarMenu from "./sidebarMenu.vue";
</script>
<template>
  <div class="sidebar">
    <h1>头像信息</h1>
    <el-scrollbar>
      <SidebarMenu></SidebarMenu>
    </el-scrollbar>
  </div>
</template>
<style scoped lang="scss">
.sidebar {
  height: 100%;
}
</style>
