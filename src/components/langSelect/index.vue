<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetlanguage"
  >
    <div>
      <el-tooltip content="国际化" placement="top">
        <button>点击</button>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { computed } from "vue";
import SvgIcon from "../SvgIcon/index.vue";
import { useI18n } from "vue-i18n";
import { appStore } from "@/stores";
import { ElMessage } from "element-plus";
const app = appStore();
const i18n = useI18n();
const handleSetlanguage = (val: string) => {
  // 切换语言
  i18n.locale.value = val;
  app.setLanguage(val);
  ElMessage.success("修改成功");
};
// 系统中的语言设定值
const language = computed(() => {
  return app.language;
});
</script>
<style scoped lang="scss"></style>
