import { sortStore, store } from "@/stores";
const sort = sortStore(store);
export const getSortName = (id) => {
  if (id !== null && id !== undefined) {
    let temp = "";
    const res = sort.allSortList.find((item) => {
      return item.id === id;
    });
    if (res !== undefined) {
      temp = res.sort_name;
    } else {
      temp = "未分类";
    }
    return temp;
  } else {
    return "未分类";
  }
};
