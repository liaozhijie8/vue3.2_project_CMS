<template>
  <el-dialog
    :title="tips"
    width="22%"
    :model-value="modelValue"
    @close="closedClick"
  >
    <div class="content">
      <p class="title">{{ $t("msg.theme.themeColorChange") }}</p>
      <el-color-picker v-model="mColor" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closedClick">{{
          $t("msg.universal.cancel")
        }}</el-button>
        <el-button type="primary" @click="confirmClick">{{
          $t("msg.universal.confirm")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { themeStore } from "@/stores";
import { generateNewStyle, writeNewStyle } from "@/utils/theme";
const i18n = useI18n();
const tips = computed(() => {
  return i18n.t("msg.theme.themeChange");
});
/* 控制弹出层开关 */
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const theme = themeStore();
/* 自定义事件 */
const emits = defineEmits(["update:modelValue"]);

const mColor = ref(theme.mainColor);

const closedClick = () => {
  emits("update:modelValue", false);
};
const confirmClick = async () => {
  theme.setThemeColor(mColor.value);
  // 给颜色标记
  const newStyle = await generateNewStyle(mColor.value);
  // 重写css样式
  writeNewStyle(newStyle);
  closedClick();
};
</script>
<style scoped lang="scss">
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
