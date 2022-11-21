<template>
  <el-dialog
    :model-value="modelValue"
    title="Warning"
    width="80%"
    :align-center="true"
    :append-to-body="true"
    :destroy-on-close="true"
    @close="closeEvent"
  >
    <template #header>
      <slot name="title">插槽写入标题</slot>
    </template>
    <slot name="content">插槽写入内容</slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue"]);

const closeEvent = () => {
  emits("update:modelValue", false);
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
