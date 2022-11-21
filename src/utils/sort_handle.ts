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

// 处理过滤分类
export const getFilter = (val) => {
  const temp = [];
  val.forEach((item) => {
    const arrObject = { text: item.sort_name, value: item.sort_name };
    temp.push(arrObject);
  });
  return temp;
};

// 商品版本数据处理
export const getGoodsVersion = (val) => {
  console.log(val);
  const temp = [];
  return temp;
};
