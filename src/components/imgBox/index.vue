<template>
  <div class="img-container">
    <el-image :src="imgUrl" class="img-box" alt="Preview Image" />
  </div>
</template>
<script setup lang="ts">
defineProps({
  imgUrl: {
    type: String,
    default: "",
  },
});
</script>
<style scoped lang="scss">
.img-container {
  height: 100%;
  text-align: center;
  .img-box {
    height: 100%;
  }
}
</style>
