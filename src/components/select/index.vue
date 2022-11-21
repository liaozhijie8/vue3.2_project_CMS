<template>
  <el-select v-model="value" placeholder="Select" @change="test">
    <el-option
      v-for="item in options"
      :key="item.color_name"
      :label="item.color_name"
      :value="item.color_name"
    />
  </el-select>
</template>
<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  optionsData: {
    type: Array,
    default() {
      return [];
    },
  },
});
const value = ref("");
const options = props.optionsData;
const test = (val) => {
  console.log(val);
};
</script>
<style scoped lang="scss"></style>
