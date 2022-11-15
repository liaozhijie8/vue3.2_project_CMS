import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import requireTransform from "vite-plugin-require-transform";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "node:path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    requireTransform({
      fileRegex: /.ts$|.tsx$|.vue$/,
      //   fileRegex:/.js$|.jsx$|.vue$/
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(__dirname, "src/icons/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
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
      "/v3": {
        target: "https://run.mocky.io",
      },
    },
  },
});
