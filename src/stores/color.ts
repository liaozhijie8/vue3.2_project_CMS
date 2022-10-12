import { ref } from "vue";
import { defineStore } from "pinia";
import variables from "@/styles/variables.module.scss";

export const colorStore = defineStore("color", () => {
  const commonColor = ref(variables);

  return { commonColor };
});
