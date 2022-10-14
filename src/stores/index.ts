import { createPinia } from "pinia";
import { colorStore } from "./color";
import { userStore } from "./user";
import { appStore } from "./app";
const store = createPinia();

export { store, colorStore, userStore, appStore };
