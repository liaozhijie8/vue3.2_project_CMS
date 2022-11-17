<template>
  <div class="account-container">
    <div class="bnt-container">
      <el-button type="primary" :icon="Plus" @click="addClick"
        >添加商品</el-button
      >
      <el-button type="primary" :icon="Plus" @click="addExcelClick"
        >Excel导入</el-button
      >
      <el-button
        type="success"
        :icon="Top"
        @click="handleOnAll"
        :disabled="multipleSelection.length == 0"
        >全部上架</el-button
      >
      <el-button
        type="danger"
        :icon="Bottom"
        @click="handleOffAll"
        :disabled="multipleSelection.length == 0"
        >全部下架</el-button
      >
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="10" />
      <el-table-column label="类型" min-width="20">
        <template #default="scope">
          <el-button size="small">{{
            getSortName(scope.row.sort_id)
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column property="id" label="序号" min-width="20" />
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
      <el-table-column label="商品图片" :min-width="width">
        <template #default="scope">
          <el-icon
            :size="20"
            class="imgIcon"
            @click="checkImg(scope.row.img_url)"
            ><ZoomIn
          /></el-icon>
        </template>
      </el-table-column>
      <el-table-column
        label="上架时间"
        show-overflow-tooltip
        :min-width="width"
      >
        <template #default="scope">
          {{ $filters.dateFilter(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="商品状态" :min-width="width">
        <template #default="scope">
          <p :style="{ color: scope.row.deletedAt ? red : green }">
            {{ scope.row.deletedAt ? "已下架" : "在售中" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button
            size="small"
            type="success"
            v-show="scope.row.deletedAt"
            @click="handleOn(scope.row)"
            >上架</el-button
          >
          <el-button
            size="small"
            type="danger"
            style="margin: 0"
            v-show="!scope.row.deletedAt"
            @click="handleOff(scope.row)"
            >下架</el-button
          >
          <el-button
            size="small"
            type="primary"
            v-permission="['update']"
            @click="handleEdit(scope.row)"
            :disabled="is_display(scope.row)"
            >修改</el-button
          >
        </template>
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
    <!-- 图片墙 -->
    <DialogBox v-model="dialogVisible">
      <template #title>商品图片墙</template>
      <template #content
        ><CarouselCard :img-list="imgUrlList">
          <template #content="{ data }">
            <ImgBox :img-url="data.url"></ImgBox>
          </template> </CarouselCard
      ></template>
    </DialogBox>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { Bottom, Plus, Top } from "@element-plus/icons-vue";
import { goodsStore, imgStore } from "@/stores";
import type { GoodsList } from "@/interface/goods_interface";
import { useRouter } from "vue-router";
import DialogBox from "@/components/dialog/index.vue";
import CarouselCard from "@/components/carouselCard/index.vue";
import ImgBox from "@/components/imgBox/index.vue";
import { getSortName } from "@/utils/sort_handle";

const red = ref("#F56C6C");
const green = ref("#67C23A");
const goods = goodsStore();
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<GoodsList[]>([]);
const handleSelectionChange = (val: GoodsList[]) => {
  multipleSelection.value = val;
};
/* 是否禁用修改按钮 */
const is_display = (val: GoodsList) => {
  if (!val.deletedAt) {
    return false;
  } else {
    return true;
  }
};
/* 获取列表数据 */
const width = ref(30);

const pageSize = computed(() => {
  return Number(goods.goodsPageSize);
});
const total = computed(() => {
  return Number(goods.goodsTotal);
});
const tableData: GoodsList[] = computed(() => {
  return goods.goodList;
});
/* 点击页码变化 */
const currentPage = ref(1);
// 重新获取数据
const currentEvent = () => {
  goods.getGoods_list(currentPage.value);
};
/* 增加商品 */
const router = useRouter();
const addClick = () => {
  goods.is_excel = false;
  router.push("/goods/create");
};
const addExcelClick = () => {
  goods.is_excel = true;
  router.push("/goods/create");
};
/* 操作 */
const handleOn = (row: GoodsList) => {
  goods.setGoodsOn(row.id);
};
const handleOff = (row: GoodsList) => {
  goods.setGoodsOff(row.id);
};
// 修改商品
const handleEdit = (row: GoodsList) => {
  router.push({
    path: "/goods/update",
  });
  goods.injectInfo(row);
};

/* 多选操作 */
const handleOnAll = () => {
  multipleSelection.value.forEach((item) => {
    if (item.deletedAt) {
      goods.setGoodsOn(item.id, true);
    }
  });
  ElMessage.success("全部商品上架成功");
};
const handleOffAll = () => {
  multipleSelection.value.forEach((item) => {
    if (!item.deletedAt) {
      goods.setGoodsOff(item.id, true);
    }
  });
  ElMessage.success("全部商品下架成功");
};
// 获取改商品的所有图片
const dialogVisible = ref(false);
const imgUrlList = ref([]);
const checkImg = (url) => {
  imgUrlList.value = url;
  dialogVisible.value = true;
};
</script>

<style scoped lang="scss">
@import "@/styles/mixin.scss";
.account-container {
  @include setBorder;
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
.imgIcon {
  cursor: pointer;
}
</style>
