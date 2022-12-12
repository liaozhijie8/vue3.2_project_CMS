<template>
  <el-select v-model="value" placeholder="颜色" @change="test">
    <slot name="options"></slot>
  </el-select>
</template>
<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(["options-value"]);
const value = ref("");
const test = (val) => {
  emits("options-value", val);
};
</script>
<style scoped lang="scss"></style>
