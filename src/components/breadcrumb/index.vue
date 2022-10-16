<template>
  <el-breadcrumb
    class="breadcrumb"
    :separator-icon="ArrowRight"
    id="guide-breadcrumb"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{
          $t(`msg.route.${item.meta.title}`)
        }}</span>
        <!-- 可点击 -->
        <span class="redirect" v-else @click="onLink(item)">{{
          $t(`msg.route.${item.meta.title}`)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { colorStore } from "@/stores";
const color = colorStore();
const route = useRoute();
const router = useRouter();
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
const onLink = (item) => {
  router.push(item.path);
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
