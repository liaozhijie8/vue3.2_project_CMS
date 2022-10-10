<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/sidebar/index.vue";
import Appmain from "./components/Appmain.vue";
import variables from "@/styles/variables.module.scss";
console.log(variables);
</script>
<template>
  <div class="app-wrapper">
    <!-- 左侧menu -->
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
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
  // right: 0;
  z-index: 9;
  width: calc(100%-#{$sideBarWidth});
}
</style>
