<template>
  <div class="pan-item" :style="{ zIndex, height, width }">
    <!-- 内层 -->
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot></slot>
      </div>
    </div>
    <!-- 外层 -->
    <div class="pan-thumb" :style="{ backgroundImage: `url(${image})` }"></div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  image: {
    type: String,
  },
  zIndex: {
    type: Number,
  },
  width: {
    type: String,
    default: "150px",
  },
  height: {
    type: String,
    default: "150px",
  },
});
</script>
<style scoped lang="scss">
.pan-item {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    .pan-info-roles-container {
      padding: 20px;
      text-align: center;
    }
  }

  .pan-thumb {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
}
.pan-item:hover .pan-thumb {
  transform: rotate(-110deg);
}
.pan-item:hover .pan-info p a {
  opacity: 1;
  transform: translateX(0px) rotate(0deg);
}
</style>
