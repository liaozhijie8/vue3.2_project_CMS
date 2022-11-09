import { ElMessage, ElMessageBox } from "element-plus";
export const openMessage = (content, title) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(content, title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        resolve("success");
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消删除",
        });
      });
  });
};
