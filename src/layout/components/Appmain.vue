<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { isTags } from "@/utils/tags";
import { appStore } from "@/stores";
import { generateTitle } from "@/utils/i18n";
const app = appStore();
const route = useRoute();
/* 生成title */
const getTitle = (route) => {
  let title = "";
  if (!route.meta) {
    const pathArr = route.path.split("/");
    title = pathArr[pathArr.length - 1];
  } else {
    title = generateTitle(route.meta.title);
  }
  return title;
};
watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return;
    const { fullpath, meta, name, params, path, query } = to;
    app.addTagsViewList({
      fullpath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    });
  },
  {
    immediate: true,
  }
);
</script>
<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
