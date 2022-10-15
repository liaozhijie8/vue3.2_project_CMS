const whiteList = ["/login"];

export function isTags(path) {
  return !whiteList.includes(path);
}
