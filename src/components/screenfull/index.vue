<template>
  <div @click="onToggle">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      id="guide-full"
    ></svg-icon>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import screenfull from "screenfull";
const isFullscreen = ref(false);
const onToggle = () => {
  screenfull.toggle();
};
const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};
onMounted(() => {
  screenfull.on("change", change);
});
onUnmounted(() => {
  screenfull.off("change", change);
});
</script>
<style scoped lang="scss"></style>
