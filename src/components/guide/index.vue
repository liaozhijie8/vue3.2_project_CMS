<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon icon="guide"></svg-icon>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { useI18n } from "vue-i18n";
</script>
<style scoped lang="scss"></style>
