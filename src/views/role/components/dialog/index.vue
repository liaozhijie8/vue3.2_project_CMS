<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="props.tabelData.name || '添加角色'"
    width="30%"
    center
    draggable
    :show-close="false"
  >
    <FormTemplate :rule-form-data="props.tabelData"></FormTemplate>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmClick()">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import FormTemplate from "../form/index.vue";
const props = defineProps({
  is_open: {
    type: Boolean,
    default: false,
  },
  tabelData: {
    type: Object,
  },
});
const emit = defineEmits(["closeClick"]);
const centerDialogVisible = ref(false);
const cancelClick = () => {
  centerDialogVisible.value = false;
  emit("closeClick", false);
};
const confirmClick = () => {
  centerDialogVisible.value = false;
  emit("closeClick", false);
};
watch(
  () => props.is_open,
  (newVal, oldVal) => {
    if (newVal) {
      centerDialogVisible.value = newVal;
    }
  }
);
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
