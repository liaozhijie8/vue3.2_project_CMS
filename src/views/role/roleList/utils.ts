export const getIdArray = (val: String) => {
  let temp = [];
  if (val != undefined) {
    temp = val.split(",");
  }
  return temp;
};

export const getNodes = (val: Array) => {
  const temp = [];
  if (val != undefined) {
    val.forEach((item) => {
      temp.push(item.permissionName);
    });
  }
  return temp;
};
