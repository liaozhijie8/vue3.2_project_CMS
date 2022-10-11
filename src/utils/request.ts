import { TOKEN } from "@/constant";
import axios from "axios";
import { ElMessage } from "element-plus";
import { getItem } from "./storage";
import { userStore } from "@/stores/user";
import { isTokenTimeout } from "./auth";
const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    const user = userStore();
    if (getItem(TOKEN)) {
      /* 前端判断token是否失效 */
      if (isTokenTimeout()) {
        // 超时，退出
        user.logout();
        return Promise.reject(new Error("token失效"));
      }
      config.headers["Authorization"] = "Bearer " + getItem(TOKEN);
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
/* 响应拦截器 */
service.interceptors.response.use(
  (res) => {
    const { message, result } = res.data;
    return { result, message };
  },
  (err) => {
    const user = userStore();
    if (err.response) {
      const { code, message } = err.response.data;
      /* 检测后端token出错处理 */
      if (code === "10101") {
        user.logout();
      }
      ElMessage.error(message);
      return Promise.reject(err.response.data);
    }
    ElMessage.error(err.message);
    return Promise.reject(err);
  }
);

export default service;
