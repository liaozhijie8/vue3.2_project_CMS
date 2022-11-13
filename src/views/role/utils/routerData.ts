import { privateRouter } from "@/router";
import { generateTitle } from "@/utils/i18n";
export const routerData = () => {
  const temp = [];
  privateRouter.forEach((item, index) => {
    const temp2 = [];
    item.children.forEach((children, y) => {
      temp2.push({
        id: `${index}-${y}`,
        permissionName: children.name,
        permissionMark: children.name,
        permissionDesc: children.meta.permissionDesc,
      });
    });
    temp.push({
      id: `${index}`,
      permissionName: item.meta.title,
      permissionMark: item.meta.title,
      permissionDesc: item.meta.permissionDesc,
      children: temp2,
    });
  });
  const map = {};
  const result = [];
  for (let i = 0; i < temp.length; i++) {
    let ai = temp[i];
    if (!map[ai.permissionName]) {
      result.push({
        id: i,
        permissionName: ai.permissionName,
        permissionMark: ai.permissionMark,
        permissionDesc: ai.permissionDesc,
        children: ai.children,
      });
      map[ai.permissionName] = ai;
    } else {
      for (let j = 0; j < result.length; j++) {
        const dj = result[j];
        if (dj.permissionName === ai.permissionName) {
          result[j].children.push(...ai.children);
        }
      }
    }
  }
  return result;
};

export const handlePermissionName = () => {
  const temp = [];
  routerData().forEach((item) => {
    item.permissionName = generateTitle(item.permissionName);
    for (let key of item.children) {
      key.permissionName = generateTitle(key.permissionName);
    }
    temp.push(item);
  });
  return temp;
};
