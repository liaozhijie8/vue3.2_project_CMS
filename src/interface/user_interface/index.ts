export interface UserInfo {
  id: number;
  user_name: string;
  is_admin: boolean;
}
export interface LoginRes {
  result: string;
  message: string;
}

/* 修改密码 */
export interface ChangePassword {
  originalPassword: string;
  newPassword: string;
}
