<template>
  <div class="hamburger-container" @click="toggleClick">
    <el-icon v-if="app.sidebarOpened"><Operation /></el-icon>
    <el-icon v-else><Finished /></el-icon>
  </div>
</template>
<script setup lang="ts">
import { appStore } from "@/stores/app";
const app = appStore();
const toggleClick = () => {
  app.triggerSidebarOpened();
};
</script>
<style scoped lang="scss"></style>
