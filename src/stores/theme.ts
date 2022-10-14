import { DEFAULT_COLOR, MAIN_COLOR } from "@/constant";
import { getItem, setItem } from "@/utils/storage";
import { defineStore } from "pinia";
import { ref } from "vue";

export const themeStore = defineStore("theme", () => {
  const mainColor = ref(getItem(MAIN_COLOR) || DEFAULT_COLOR);
  function setThemeColor(palyload: string) {
    setItem(MAIN_COLOR, palyload);
    mainColor.value = palyload;
  }
  return { mainColor, setThemeColor };
});
