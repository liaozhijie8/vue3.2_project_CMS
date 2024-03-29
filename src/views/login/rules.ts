import i18n from "@/i18n";
/* 定义规则 */
export const checkUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入你的用户名"));
  } else {
    return callback();
  }
};
export const validatePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入密码"));
  } else if (value.length < 6) {
    return callback(new Error(i18n.global.t("msg.login.passwordRule")));
  } else {
    return callback();
  }
};
