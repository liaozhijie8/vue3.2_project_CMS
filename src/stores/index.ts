import { createPinia } from "pinia";
import { colorStore } from "./color";
import { userStore } from "./user";
import { appStore } from "./app";
import { themeStore } from "./theme";
import { goodsStore } from "./goods";
import { roleStore } from "./role";
import { permissionStore } from "./permission";
import { imgStore } from "./img";
const store = createPinia();

export {
  store,
  colorStore,
  userStore,
  appStore,
  themeStore,
  goodsStore,
  roleStore,
  permissionStore,
  imgStore,
};
