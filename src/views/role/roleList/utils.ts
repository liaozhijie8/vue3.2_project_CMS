export const getIdArray = (val: String) => {
  let temp = [];
  if (val != undefined) {
    temp = val.split(",");
  }
  return temp;
};
