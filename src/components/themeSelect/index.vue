<template>
  <div>
    <el-dropdown
      class="theme hover-effect"
      trigger="click"
      @command="handleSetTheme"
    >
      <div>
        <el-tooltip :content="$t('msg.navBar.themeChange')" placement="top">
          <svg-icon icon="change-theme"></svg-icon>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{
            $t("msg.theme.themeColorChange")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div>
    <SelectColor v-model="selectColorVisible"></SelectColor>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import SelectColor from "./components/selectColor.vue";
const selectColorVisible = ref(false);
const handleSetTheme = () => {
  selectColorVisible.value = true;
};
</script>
<style scoped lang="scss">
.theme {
  padding: 0 18px 0 0;
  font-size: 24px;
  color: #5a5e66;

  &.hover-effect {
    cursor: pointer;
  }
}
</style>
