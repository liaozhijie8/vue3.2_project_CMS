<template>
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
    </template>
    <sidebarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebarItem>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
  </el-menu-item>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import MenuItem from "./menuItem.vue";
defineProps({
  route: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped lang="less"></style>
