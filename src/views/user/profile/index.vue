<script setup lang="ts">
import { ref, watch } from "vue";
import { appStore } from "@/stores";
import { computed } from "@vue/reactivity";
const app = appStore();
const test = ref(1);
const add = () => {
  test.value++;
};
const temp = computed(() => {
  return app.language;
});
watch(temp, () => {
  console.log("222");
});
</script>
<template>
  <div>
    <svg-icon icon="user"></svg-icon>
    <div>{{ $t("msg.login.title") }}</div>
    <el-row class="mb-4">
      <p>{{ test }}</p>
      <el-button>Default</el-button>
      <el-button type="primary" @click="add">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <div class="example-pagination-block">
      <div class="example-demonstration">When you have more than 7 pages</div>
      <el-pagination layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
