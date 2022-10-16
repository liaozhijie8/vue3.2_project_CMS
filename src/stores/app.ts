import { ref } from "vue";
import { defineStore } from "pinia";
import { LANG, TAGS_VIEW } from "@/constant";
import { getItem, setItem } from "@/utils/storage";

export const appStore = defineStore("app", () => {
  /* 控制侧边栏 */
  const sidebarOpened = ref(false);
  /* 设置语言 */
  const language = ref(getItem(LANG) || "zh");
  function triggerSidebarOpened() {
    sidebarOpened.value = !sidebarOpened.value;
  }
  // 设置语言
  function setLanguage(palyload: string) {
    setItem(LANG, palyload);
    language.value = palyload;
  }
  /* tags相关 */
  const tagsViewList = ref(getItem(TAGS_VIEW) || []);
  // 添加tags
  function addTagsViewList(tag) {
    const isFind = tagsViewList.value.find((item) => {
      return item.path === tag.path;
    });
    if (!isFind) {
      tagsViewList.value.push(tag);
      setItem(TAGS_VIEW, tagsViewList.value);
    }
  }
  // 修改指定index的title
  function changeTagsView({ index, tag }) {
    tagsViewList.value[index] = tag;
    setItem(TAGS_VIEW, tagsViewList.value);
  }

  return {
    sidebarOpened,
    triggerSidebarOpened,
    language,
    setLanguage,
    addTagsViewList,
    tagsViewList,
    changeTagsView,
  };
});
