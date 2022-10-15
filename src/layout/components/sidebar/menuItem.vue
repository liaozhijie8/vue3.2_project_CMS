<template>
  <el-icon>
    <component :is="icon"></component>
  </el-icon>
  <span>{{ $t(`msg.route.${title}`) }}</span>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>
<style scoped lang="less"></style>
