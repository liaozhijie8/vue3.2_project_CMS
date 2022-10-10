<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore();
</script>
<template>
  <div class="home-container">
    主页{{ counter.count }} <button @click="counter.increment">+</button>
    <button @click="counter.change">-</button>
  </div>
</template>
<style scoped lang="less">
.home-container {
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
}
</style>
