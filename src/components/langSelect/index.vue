<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetlanguage"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" placement="top">
        <svg-icon icon="language" id="guide-lang"></svg-icon>
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
import { useI18n } from "vue-i18n";
import { appStore } from "@/stores";
import { ElMessage } from "element-plus";

const app = appStore();
const i18n = useI18n();

const handleSetlanguage = (val: string) => {
  // 切换语言
  i18n.locale.value = val;
  app.setLanguage(val);
  ElMessage.success(i18n.t("msg.toast.switchLangSuccess"));
};
// 设置浏览器缓存里面的语言标识
const language = computed(() => {
  return app.language;
});
</script>
<style scoped lang="scss"></style>
