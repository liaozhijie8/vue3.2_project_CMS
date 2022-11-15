<template>
  <el-drawer
    :model-value="modelValue"
    :direction="direction"
    :before-close="handleClose"
    :append-to-body="true"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot name="content">请使用插槽-content</slot>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
const emits = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const direction = ref("rtl");
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure you want to close this?")
    .then(() => {
      emits("update:modelValue", false);
      done();
    })
    .catch(() => {
      // catch error
    });
};
function cancelClick() {
  emits("update:modelValue", false);
}
function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ?`)
    .then(() => {
      emits("update:modelValue", false);
    })
    .catch(() => {
      // catch error
    });
}
</script>
