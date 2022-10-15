import { createI18n } from "vue-i18n";
import zhLocale from "./language/zh";
import enLocale from "./language/en";
import { appStore } from "@/stores";
import { createPinia } from "pinia";
const store = createPinia();
const locale = appStore(store).language;
const messages = {
  en: {
    msg: {
      ...enLocale,
    },
  },
  zh: {
    msg: {
      ...zhLocale,
    },
  },
};

const i18n = createI18n({
  // 使用composition API需要关掉
  warnHtmlMessage: false,
  legacy: false,
  // 全局注入$t函数
  globalInjection: true,
  locale,
  messages,
});

export default i18n;
