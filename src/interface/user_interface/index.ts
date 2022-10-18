export interface UserInfo {
  id?: number;
  user_name?: string;
  is_admin?: boolean;
}
export interface LoginRes {
  result: object;
  message: string;
}

/* 修改密码 */
export interface ChangePassword {
  originalPassword: string;
  newPassword: string;
}
/* 登录信息 */
export interface Login {
  user_name: string;
  password: string;
}
