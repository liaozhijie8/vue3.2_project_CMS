import { createI18n } from "vue-i18n";
import zhLocale from "./language/zh";
import enLocale from "./language/en";
import { appStore, store } from "@/stores";
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
