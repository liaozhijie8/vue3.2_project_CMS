<template>
  <div class="account-container">
    <div class="bnt-container">
      <el-button
        type="success"
        :icon="Refresh"
        @click="restoreClick"
        :disabled="multipleSelection.length == 0"
        >恢复账户</el-button
      >
      <el-button
        type="danger"
        :icon="Delete"
        @click="removeClick"
        :disabled="multipleSelection.length == 0"
        >禁用账户</el-button
      >
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="10" />
      <el-table-column property="id" label="序号" :min-width="width" />
      <el-table-column
        property="goods_name"
        label="商品名称"
        :min-width="width"
      />
      <el-table-column
        property="goods_price"
        label="商品价格"
        :min-width="width"
      />
      <el-table-column
        property="goods_num"
        label="商品数量"
        :min-width="width"
      />
      <el-table-column
        property="goods_img"
        label="商品图片"
        :min-width="width"
      />
      <el-table-column
        label="上架时间"
        property="createdAt"
        show-overflow-tooltip
        :formatter="dateFormat"
        :min-width="width"
      >
      </el-table-column>
      <el-table-column
        label="下架时间"
        property="deletedAt"
        show-overflow-tooltip
        :formatter="dateFormat"
        :min-width="width"
      >
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        v-model:currentPage="currentPage"
        @current-change="currentEvent"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { ElTable } from "element-plus";
import { Refresh, Delete } from "@element-plus/icons-vue";
import { userStore, goodsStore } from "@/stores";
import dayjs from "dayjs";
import type { GoodsList } from "@/interface/goods_interface";
const red = ref("#F56C6C");
const green = ref("#67C23A");
const goods = goodsStore();
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<GoodsList[]>([]);
const handleSelectionChange = (val: GoodsList[]) => {
  multipleSelection.value = val;
};
/* 获取用户列表数据 */
const width = ref(30);
const user = userStore();

const pageSize = Number(goods.goodsPageSize);
const total = Number(goods.goodsTotal);
let tableData: GoodsList[] = computed(() => {
  return goods.goodList;
});
// 格式化时间
const dateFormat = (row, val) => {
  if (row[val.property] === null) {
    return "0";
  }
  var date = row[val.property];
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
/* 点击页码变化 */
const currentPage = ref();
// 重新获取数据
const currentEvent = () => {
  user.getUser_list(currentPage.value);
};
/* 用户注销与恢复 */
const removeClick = () => {
  multipleSelection.value.forEach((item) => {
    user.remove_user(item.id);
  });
};
const restoreClick = () => {
  multipleSelection.value.forEach((item) => {
    user.restore_user(item.id);
  });
};
</script>

<style scoped lang="scss">
.account-container {
  width: 100%;
  height: 100vh;
  padding: 10px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-card-border-radius);
  border: 1px solid var(--el-card-border-color);
  background-color: var(--el-card-bg-color);
  overflow: hidden;
  color: var(--el-text-color-primary);
}
.bnt-container {
  height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid var(--el-border-color);
}
.pagination-container {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
}
</style>
