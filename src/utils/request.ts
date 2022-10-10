import axios from "axios";
import { ElMessage } from "element-plus";
import { getItem } from "./storage";
const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + getItem("token");
    // 在发送请求之前做些什么
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
    const { message } = err.response.data;
    ElMessage.error(message);
    return Promise.reject(err.response.data);
  }
);

export default service;
