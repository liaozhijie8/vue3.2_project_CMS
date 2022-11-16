<template>
  <el-drawer
    :model-value="modelValue"
    :direction="direction"
    @closed="closedEvent"
    :append-to-body="true"
    :close-delay="300"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot name="content">请使用插槽-content</slot>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const emits = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const direction = ref("rtl");
const closedEvent = () => {
  emits("update:modelValue", false);
};
</script>
