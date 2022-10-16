<template>
  <div class="header-search" :class="{ show: isShow }">
    <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
      id="guide-search"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      remote
      default-first-option
      :remote-method="querySearch"
      placeholder="search"
      :loading="loading"
      @change="onSelectChange"
      @blur="closeCursor"
    >
      <el-option
        v-for="item in searchOptions"
        :key="item.item.path"
        :label="item.item.title.join('>')"
        :value="item.item"
      ></el-option>
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { filterRouters } from "@/utils/route";
import { generateRoutes } from "./fuseData";
import { appStore } from "@/stores";
import Fuse from "fuse.js";
/* 检索的数据源 */
const router = useRouter();
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  return generateRoutes(filterRoutes);
});
/**
 * 搜索库相关规则
 */
let fuse;
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配算法放弃的时机， 阈值 0.0 需要完美匹配（字母和位置），阈值 1.0 将匹配任何内容。
    threshold: 0.4,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "path",
        weight: 0.3,
      },
    ],
  });
};
// 初始化
initFuse(searchPool.value);
/* 国际化 */
const app = appStore();
// pinia的state必须要经过计算属性才有响应式
const temp = computed(() => {
  return app.language;
});
watch(temp, () => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes());
    return generateRoutes(filterRoutes);
  });
  initFuse(searchPool.value);
});
// el-select 实例
const headerSearchSelectRef = ref(null);
const isShow = ref(false);
const onShowClick = () => {
  isShow.value = !isShow.value;
  if (isShow.value) {
    headerSearchSelectRef.value.focus();
  } else {
    headerSearchSelectRef.value.blur();
  }
};
/* input失去焦点 */
const closeCursor = () => {
  if (isShow.value && !search.value) {
    setTimeout(() => {
      // 关闭搜索栏并清空检索文字
      isShow.value = false;
      search.value = "";
      searchOptions.value = [];
    }, 500);
  }
};
/* 选中时的触发回调 */
const onSelectChange = (val: string) => {
  router.push(val.path);
};

/* 搜索的数据 */
const search = ref("");
/* 搜索方法 */
const loading = ref(false);
const searchOptions = ref([]);
const querySearch = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      searchOptions.value = fuse.search(query);
    }, 500);
  } else {
    searchOptions.value = [];
  }
};

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
