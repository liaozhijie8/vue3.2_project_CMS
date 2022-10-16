<template>
  <div class="tags-view-container">
    <div
      class="tag-box"
      v-for="(tag, index) in app.tagsViewList"
      :key="tag.fullpath"
      :style="{
        backgroundColor: isActice(tag) ? color.commonColor.menuBg : '',
        borderColor: isActice(tag) ? color.commonColor.menuBg : '',
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      <div class="tag-icon">
        <el-icon size="15px" v-show="isActice(tag)"><CaretBottom /></el-icon>
      </div>
      <RouterLink :to="tag.path" class="tags-view-item">
        {{ tag.title }}
      </RouterLink>
      <div class="tag-icon tag-close" @click.prevent="onCloseClicke(index)">
        <el-icon size="10px" v-show="!isActice(tag)"><Close /></el-icon>
      </div>
    </div>
  </div>
  <ContextMenu
    :index="menuIndex"
    v-show="is_openMenu"
    :style="menuPosition"
  ></ContextMenu>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { appStore, colorStore } from "@/stores";
import { ref } from "vue";
import ContextMenu from "./contextMenu.vue";
const color = colorStore();
const route = useRoute();
const app = appStore();
const isActice = (tag) => {
  return tag.path === route.path;
};
/* 关闭tag */
const onCloseClicke = (index) => {
  console.log(index);
};
/* 鼠标右键行为 */
const is_openMenu = ref(false);
const menuIndex = ref(0);
const menuPosition = ref({
  left: "",
  top: "",
});
const openMenu = (e, index) => {
  menuIndex.value = index;
  is_openMenu.value = true;
  const { x, y } = e;
  menuPosition.value.left = x + "px";
  menuPosition.value.top = y + "px";
};
</script>
<style scoped lang="scss">
.tags-view-container {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  line-height: 50px;
  padding: 5px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .tag-box {
    display: flex;
    align-items: center;
    height: 70%;
    min-width: 100px;
    margin-left: 10px;
    border-radius: 2px;
    border: 1px solid #000;
    &:hover {
      background-color: rgb(239, 242, 244);
    }
    .tag-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0.5;
      width: 20px;
      align-items: center;
    }
    .tag-close {
      &:hover {
        cursor: pointer;
        background-color: bisque;
      }
    }
    .tags-view-item {
      align-items: center;
    }
  }
}
</style>
