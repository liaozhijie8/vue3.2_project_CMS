<script setup lang="ts">
import { generateNewStyle, writeNewStyle } from "@/utils/theme";
import { RouterView } from "vue-router";
import { themeStore } from "@/stores";
/* 主题色刷新依然生效 */
const theme = themeStore();
generateNewStyle(theme.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText);
});
</script>

<template>
  <RouterView></RouterView>
</template>
