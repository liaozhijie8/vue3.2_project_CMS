<template>
  <el-dialog
    :v-model="is_open"
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
const confirmClick = () => {
  emit("closeClick", false);
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
