<template>
  <el-dialog
    :v-model="is_open"
    :title="props.titleName"
    width="30%"
    center
    draggable
    :show-close="false"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmClick()">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
const props = defineProps({
  is_open: {
    type: Boolean,
    default: false,
  },
  titleName: {
    type: String,
    default: "对话框标题",
  },
});
const emit = defineEmits(["closeClick"]);
const confirmClick = () => {
  emit("closeClick", false);
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
