export const stringToArray = (string: String) => {
  let temp = [];
  const imgArray = [];
  if (string != undefined) {
    temp = string.split(",");
    temp.forEach((item) => {
      const res = item.split("=");
      const imgObject = {
        name: res[0],
        url: res[1],
      };
      imgArray.push(imgObject);
    });
  }
  return imgArray;
};

// 数组转化为字符串
export const arrayToString = (array) => {
  const temp = [];
  for (const value of array) {
    const res = `${value.name}=${value.url}`;
    temp.push(res);
  }
  return temp.toString();
};
