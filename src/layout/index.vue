<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/sidebar/index.vue";
import Appmain from "./components/Appmain.vue";
import { appStore, colorStore } from "@/stores";
const app = appStore();
const color = colorStore();
</script>
<template>
  <div class="app-wrapper" :class="{ hideSidebar: app.sidebarOpened }">
    <!-- 左侧menu -->
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: color.commonColor.menuBg }"
    ></Sidebar>
    <!-- 右侧 -->
    <div class="main-container">
      <!-- 顶部navbar -->
      <div class="fixed-header">
        <Navbar></Navbar>
      </div>
      <!-- 内容区 -->
      <Appmain></Appmain>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/mixin.scss";
@import "@/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width $sideBarDuration;
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
