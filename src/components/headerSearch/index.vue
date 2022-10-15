<template>
  <div class="header-search" :class="{ show: isShow }">
    <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { filterRouters, generateMenus } from "@/utils/route";
import { generateRoutes } from "./fuseData";
/* 检索的数据源 */
const router = useRouter();
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  return generateRoutes(filterRoutes);
});
console.log(searchPool);
/**
 * 搜索库相关
 */
// let fuse;
// const initFuse = (searchPool) => {
//   fuse = new Fuse(searchPool, {
//     // 是否按优先级进行排序
//     shouldSort: true,
//     // 匹配算法放弃的时机， 阈值 0.0 需要完美匹配（字母和位置），阈值 1.0 将匹配任何内容。
//     threshold: 0.4,
//     // 匹配长度超过这个值的才会被认为是匹配的
//     minMatchCharLength: 1,
//     // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
//     // name：搜索的键
//     // weight：对应的权重
//     keys: [
//       {
//         name: "title",
//         weight: 0.7,
//       },
//       {
//         name: "path",
//         weight: 0.3,
//       },
//     ],
//   });
// };
// initFuse(searchPool.value);
// el-select 实例
const headerSearchSelectRef = ref(null);
const isShow = ref(false);
const onShowClick = () => {
  isShow.value = !isShow.value;
};
/* 搜索的数据 */
const search = ref("");
/* 搜索方法 */
const querySearch = () => {
  console.log("qu");
};
/* 选中时的触发回调 */
const onSelectChange = () => {
  console.log("onselect");
};
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>
<style scoped lang="scss">
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      // border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
