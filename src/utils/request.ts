import axios from "axios";
import { ElNotification } from "element-plus";
import { userStore } from "@/stores";
import { isTokenTimeout } from "./auth";
import type { LoginRes } from "@/interface/user_interface";
const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    const user = userStore();
    if (user.user_token) {
      /* 前端判断token是否失效 */
      if (isTokenTimeout()) {
        // 超时，退出
        user.logout();
        return Promise.reject(new Error("token失效"));
      }
      config.headers["Authorization"] = "Bearer " + user.user_token;
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
    const temp: LoginRes = {
      message,
      result,
    };
    return temp;
  },
  (err) => {
    const user = userStore();
    if (err.response) {
      const { code, message } = err.response.data;
      /* 检测后端token出错处理 */
      if (code === "10101") {
        user.logout();
      }
      ElNotification.error(message);
      return Promise.reject(err.response.data);
    }
    ElNotification.error(err.message);
    return Promise.reject(err);
  }
);

export default service;
