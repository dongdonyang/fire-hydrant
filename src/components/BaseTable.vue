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
            icon="el-icon-document"
            >详情</el-button
          >
        </span>

        <!--          todo 中文映射表map]-->
        <span
          v-else-if="item.map"
          :class="getName(scope.row[item.prop], item, 'className')"
        >
          {{ getName(scope.row[item.prop], item, "label") }}
        </span>

        <!--        todo  电量百分比-->
        <span v-else-if="item.num"
          >{{ scope.row[item.prop] * 100 }}{{ item.unit }}</span
        >

        <!--          todo 默认数据-->
        <span v-else>{{ scope.row[item.prop] }}{{ item.unit }}</span>
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
    return {
      //  消火栓状态
      hydrantStatus: [
        {
          label: "未指定",
          value: 0
        },
        {
          label: "在线",
          value: 1,
          className: "normal"
        },
        {
          label: "离线",
          value: -1,
          className: "correctNow"
        },
        {
          label: "异常",
          value: -2,
          className: "shutDown"
        },
        {
          label: "部分离线",
          value: -3,
          className: "shutDown"
        }
      ],
      //  警情状态
      policeRecord: [
        {
          label: "未定义",
          value: 0
        },
        {
          label: "待处理",
          value: 1,
          className: "correctNow"
        },
        {
          label: "处理中",
          value: 2
        },
        {
          label: "已解决",
          value: 3,
          className: "normal"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     *@fileOverview 获取中文 /获取样式 样式映射表，根据不同的类型和不同的值返回不同的class样式name
     * @param val 当前行对象的具体数字、可能是数字、中文、来赋上不同颜色
     * @param item columnList对象中的map匹配对象名称
     * @param nature 返回label中文名还是classname样式名
     */
    getName(val, item, nature) {
      let name = this[item.map].find(i => {
        return i.value === val;
      });
      return name ? name[nature] : "";
    },
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
/*  todo 中文样式映射表、为了最大的扩展性、虽然现在只存在颜色不同、但这种情况下可以添加各种不同的样式、比单独传一个颜色值要好的多*/
/* 单位列表部分名称显示为黄色*/
.badName {
  color: #e6a23c;
}
.normal {
  color: #67c23a;
}
.shutDown {
  color: #f56c6c;
}
.correct {
  color: chocolate;
}
.correctNow {
  color: #e6a23c;
}
.off-line {
  color: #f56c6c;
}
</style>
