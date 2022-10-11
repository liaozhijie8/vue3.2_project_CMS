/* 弹出密码框验证 */
export const validateNewPassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入密码"));
  } else if (value.length > 6 && value < 12) {
    return callback(new Error("密码必须大于6位小于12位"));
  } else {
    return callback();
  }
};
