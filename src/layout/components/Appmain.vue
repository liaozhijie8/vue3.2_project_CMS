<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from "vue";
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
/* 监听路由变化 */
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
/* 监听语言变化 */
const temp = computed(() => {
  return app.language;
});
watch(temp, () => {
  app.tagsViewList.forEach((route, index) => {
    // 改变title
    app.changeTagsView({
      index,
      tag: {
        ...route,
        title: getTitle(route),
      },
    });
  });
});
</script>
<style scoped lang="scss">
.app-main {
  z-index: 0;
  height: 2000px;
  margin-top: 50px;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 80px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
