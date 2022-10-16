<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick"></svg-icon>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import steps from "./steps";
import { appStore } from "@/stores";
const app = appStore();
const i18n = useI18n();
/* 初始化引导 */
onMounted(() => {
  initDriver();
});
/* 监听是否改变了语言 */
const temp = computed(() => {
  return app.language;
});
watch(temp, () => {
  initDriver();
});
/* 设置引导 */
let driver;
const initDriver = () => {
  driver = new Driver({
    animate: false,
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t("msg.guide.close"),
    nextBtnText: i18n.t("msg.guide.next"),
    prevBtnText: i18n.t("msg.guide.prev"),
  });
};
/* 点击开启引导 */
const onClick = () => {
  driver.defineSteps(steps(i18n)); //引导的步骤
  driver.start();
};
</script>
<style scoped lang="scss"></style>
