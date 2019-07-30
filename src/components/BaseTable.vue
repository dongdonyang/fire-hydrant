<template>
  <el-table class="base-table" :data="tableData" style="width: 100%">
    <el-table-column
      v-for="(item, index) in tableColumn"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      align="center"
    >
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
  methods: {}
};
</script>

<style lang="scss">
.el-table th {
  background-color: #1d477b;
  color: #a2ecff;
}
</style>
