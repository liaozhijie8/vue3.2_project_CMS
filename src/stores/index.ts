import { createPinia } from "pinia";
import { colorStore } from "./color";
import { userStore } from "./user";
import { appStore } from "./app";
import { themeStore } from "./theme";
import { goodsStore } from "./goods";
import { roleStore } from "./role";
const store = createPinia();

export {
  store,
  colorStore,
  userStore,
  appStore,
  themeStore,
  goodsStore,
  roleStore,
};
