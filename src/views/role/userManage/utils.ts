import { getUserRoleID } from "@/api/userRole";

export const handleRoleData = (arrayData, stringData) => {
  const temp = [];
  if (stringData != undefined) {
    const newArray = stringData.split(",");
    newArray.forEach((item) => {
      arrayData.forEach((element) => {
        if (item == element.id) {
          temp.push(element.title);
        }
      });
    });
  }

  return temp;
};

/* 获取用户当前拥有的角色 */
export const userhasRole = (id, arrayData) => {
  return getUserRoleID(id).then((res) => {
    return handleRoleData(arrayData, res.result.role_id);
  });
};
