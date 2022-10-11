/* 
获取时间戳
 */

import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from "@/constant";
import { getItem, setItem } from "./storage";

export function getTimeStamp() {
  return getItem(TIME_STAMP);
}

/* 设置时间戳 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now());
}

/* 判断是否超时 */
export function isTokenTimeout() {
  const currentTime = Date.now();
  return currentTime - getTimeStamp() > TOKEN_TIMEOUT_VALUE;
}
