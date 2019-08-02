<template>
  <el-table class="base-table" :data="tableData">
    <el-table-column
      v-for="(item, index) in tableColumn"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <!--            todo 操作-->
        <span v-if="!item.prop">
          <el-button
            @click="getDetail(scope.row, $event)"
            size="mini"
            type="text"
            icon="el-icon-search"
            >详情</el-button
          >
        </span>
        <!--          todo 默认数据-->
        <span v-else>{{ scope.row[item.prop] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/**
 *  作者：0          时间：2019/7/30 14:37
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseTable",
  components: {},
  props: {
    tableData: Array,
    tableColumn: Array
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     *@fileOverview 获取当前行对象详情
     * @param id 行对象id
     * @param event 原生点击事件
     */
    getDetail(id, event) {
      this.$emit("getDetail", id, event);
    }
  }
};
</script>

<style lang="scss">
.base-table {
  width: 100%;
  flex: 1;
}
.el-table th {
  background-color: #1d477b;
  color: #a2ecff;
}
/*tbody*/
.el-table tr {
  background-color: transparent !important;
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

el-table th,
.el-table tr {
  background-color: transparent;
  color: #fff;
}
.el-table::before {
  background-color: transparent;
}
/*todo hover*/
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #10315b !important;
}
/*  底线*/
.el-table td,
.el-table th.is-leaf {
  border-color: #025691;
}
</style>
