import { ref } from "vue";
import { defineStore } from "pinia";

export const appStore = defineStore("app", () => {
  const sidebarOpened = ref(false);
  function triggerSidebarOpened() {
    sidebarOpened.value = !sidebarOpened.value;
  }

  return { sidebarOpened, triggerSidebarOpened };
});
