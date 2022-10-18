<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <div class="user-card">
          <ProjectCard></ProjectCard>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="tabs-card">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane :label="$t('msg.tabs.onsale')" name="first">
              <Chapter></Chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.tabs.turnover')" name="second">
              <Featrue></Featrue>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.tabs.account')" name="third">
              <Account></Account>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import ProjectCard from "./components/projectCard.vue";
import Chapter from "./components/chapter.vue";
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import Featrue from "./components/featrue.vue";
import Account from "./components/account.vue";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style scoped lang="scss">
.user-card {
  margin-right: 20px;
}
.tabs-card {
  padding: 10px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-card-border-radius);
  border: 1px solid var(--el-card-border-color);
  background-color: var(--el-card-bg-color);
  overflow: hidden;
  color: var(--el-text-color-primary);
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
