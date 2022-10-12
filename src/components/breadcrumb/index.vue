<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbData"
      :key="item.path"
    >
      <!-- 不可点击 -->
      <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{
        item.meta.title
      }}</span>
      <!-- 可点击 -->
      <span class="redirect" v-else @click="onLink(item)">{{
        item.meta.title
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { colorStore } from "@/stores";
const color = colorStore();
const route = useRoute();
let breadcrumbData = ref([]);
const getBreadcrumData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
};

watch(
  route,
  () => {
    getBreadcrumData();
  },
  {
    immediate: true,
  }
);
/* 背景色 */
const colorMenubg = ref(color.commonColor.menuBg);
/* 可点击事件 */
const onLink = () => {
  alert("11");
};
</script>
<style lang="scss" scoped>
.redirect {
  color: #666;
  font-weight: 800;
  &:hover {
    color: v-bind(colorMenubg);
    cursor: pointer;
  }
}
.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>
