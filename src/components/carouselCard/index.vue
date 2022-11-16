<template>
  <el-carousel :interval="4000" type="card" height="600px">
    <el-carousel-item
      v-for="item in imgList"
      :key="item.id"
      class="carousel-container"
    >
      <slot name="content" :data="item"></slot>
    </el-carousel-item>
  </el-carousel>
</template>
<script lang="ts" setup>
defineProps({
  imgList: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>
<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
