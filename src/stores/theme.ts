import { DEFAULT_COLOR, MAIN_COLOR } from "@/constant";
import { getItem, setItem } from "@/utils/storage";
import variables from "@/styles/variables.module.scss";
import { defineStore } from "pinia";
import { ref } from "vue";

export const themeStore = defineStore("theme", () => {
  const mainColor = ref(getItem(MAIN_COLOR) || DEFAULT_COLOR);
  const colorVariables = ref(variables);
  function setThemeColor(palyload: any) {
    setItem(MAIN_COLOR, palyload);
    mainColor.value = palyload;
    colorVariables.value = palyload;
  }
  return { mainColor, setThemeColor, colorVariables };
});
