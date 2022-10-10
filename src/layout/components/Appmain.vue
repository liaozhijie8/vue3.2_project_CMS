<script setup lang="ts">
import { userStore } from "@/stores/user";
const user = userStore();
const test = () => {
  console.log(user.userInfo);
};
</script>
<template>
  <div class="app-main">
    app
    <button @click="user.getProfile">点击</button>
    <button @click="test">token</button>
  </div>
</template>
<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
