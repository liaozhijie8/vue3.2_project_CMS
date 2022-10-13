import { ref } from "vue";
import { defineStore } from "pinia";
import { LANG } from "@/constant";
import { getItem, setItem } from "@/utils/storage";

export const appStore = defineStore("app", () => {
  const sidebarOpened = ref(false);
  const language = ref(getItem(LANG) || "zh");
  function triggerSidebarOpened() {
    sidebarOpened.value = !sidebarOpened.value;
  }
  // 设置语言
  function setLanguage(palyload: string) {
    setItem(LANG, palyload);
    language.value = palyload;
  }

  return { sidebarOpened, triggerSidebarOpened, language, setLanguage };
});
