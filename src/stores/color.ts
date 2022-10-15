import { computed } from "vue";
import { defineStore } from "pinia";
import { themeStore } from "./theme";
import { generateColors } from "@/utils/theme";
import { getItem } from "@/utils/storage";
import { MAIN_COLOR } from "@/constant";

export const colorStore = defineStore("color", () => {
  // 颜色对象合并(成员属性相同)
  const commonColor = computed(() => {
    return {
      ...themeStore().colorVariables,
      ...generateColors(getItem(MAIN_COLOR)),
    };
  });

  return { commonColor };
});
