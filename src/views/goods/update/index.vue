<template>
  <div class="update-container">
    <UploadPage :is_update="true"></UploadPage>
  </div>
</template>
<script setup lang="ts">
import UploadPage from "../../../components/uploadPage/index.vue";
</script>
<style scoped lang="scss">
@import "@/styles/mixin.scss";
.update-container {
  @include setBorder;
}
</style>
