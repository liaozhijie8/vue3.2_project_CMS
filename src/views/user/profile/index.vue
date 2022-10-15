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
</template>
<style scoped lang="scss"></style>
