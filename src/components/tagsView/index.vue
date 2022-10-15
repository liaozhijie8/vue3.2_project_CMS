<template>
  <div class="tags-view-container">
    <RouterLink
      :to="tag.path"
      v-for="(tag, index) in app.tagsViewList"
      :key="tag.fullpath"
      class="tags-view-item"
      :class="isActice(tag) ? 'active' : ''"
    >
      {{ tag.title }}
      <i
        v-show="!isActice(tag)"
        class="el-icon-close"
        @click.prevent="onCloseClicke(index)"
        ><el-icon><Close /></el-icon>
      </i>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { appStore } from "@/stores";
const route = useRoute();
const app = appStore();
const isActice = (tag) => {
  return tag.path === route.path;
};
const onCloseClicke = (index) => {
  console.log(index);
};
</script>
<style scoped lang="scss"></style>
