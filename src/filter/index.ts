import dayjs from "dayjs";

const dateFilter = (val: any, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!val) {
    return 0;
  } else {
    // 判断是否数
    if (!isNaN(val)) {
      val = parseInt(val);
    }
    return dayjs(val).format(format);
  }
};

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
  };
};
