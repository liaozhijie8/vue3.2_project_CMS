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
/* 分页数据 */
export interface Page {
  pageNum: number;
  pageSize: number;
}
/* 用户列表信息 */
export interface User {
  id: number;
  user_name: string;
  is_admin: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

/* 列表返回类型 */
export interface List {
  pageNum: string;
  pageSize: string;
  total: number;
}
