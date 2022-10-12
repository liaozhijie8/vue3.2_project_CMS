<template>
  <el-menu
    :default-active="default_active"
    class="el-menu-vertical-demo"
    :collapse="app.sidebarOpened"
    :background-color="color.commonColor.menuBg"
    :text-color="color.commonColor.menuText"
    :active-text-color="color.commonColor.menuActiveText"
    router
  >
    <SidebarItem
      v-for="item in routesValue"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-menu>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import { colorStore, appStore } from "@/stores";
// 处理路由表函数
import { filterRouters, generateMenus } from "@/utils/route";
import SidebarItem from "./sidebarItem.vue";
const app = appStore();
const color = colorStore();
console.log(color.commonColor);
/* 动态路由表解析 */
const routes = computed(() => {
  const filter = filterRouters(router.getRoutes());
  return generateMenus(filter);
});
const routesValue = ref(routes.value);
/* 设置默认激活项 */
const route = useRoute();
const default_active = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="scss" scoped></style>
