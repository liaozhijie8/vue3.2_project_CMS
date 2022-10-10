import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import 'src/styles/mixin.scss';`,
  //     },
  //   },
  // },
  server: {
    proxy: {
      // 代理转发axios.defaults.baseURL = "/api";
      "/api": {
        // api地址
        target: "http://127.0.0.1:8001",
      },
    },
  },
});
