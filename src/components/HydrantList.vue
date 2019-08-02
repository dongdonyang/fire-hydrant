<template>
  <div class="hydrant-list">
    <base-table
      @getDetail="getHydrantDetail"
      :table-column="tableHydrant.column"
      :table-data="tableHydrant.table"
    ></base-table>
    <base-page
      v-bind:prop-pag.sync="tableHydrant.page"
      @currentChange="getRecordList"
    ></base-page>

    <!--    todo 消火栓详情-->
    <base-dialog ref="hydrantDetail">
      <div class="hydrant-list-hydrant">
        <div>
          <sub-title title="基本信息"></sub-title>
          <el-form>
            <el-form-item
              v-for="(item, index) in formList"
              :key="index"
              :label="item.label"
              >{{ form[item.value] }}</el-form-item
            >
          </el-form>
        </div>
        <div>
          <sub-title title="历史警情"></sub-title>
          <base-table
            :table-column="tableWeek.column"
            :table-data="tableWeek.table"
          ></base-table>
          <base-page
            v-bind:prop-pag.sync="tableWeek.page"
            @currentChange="getHistory"
          ></base-page>
        </div>
        <div>
          <sub-title title="一周水泵"></sub-title>
          <div id="myChart" style="height: 100%;width: 100%"></div>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/8/1 16:37
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseTable from "../components/BaseTable";
import BaseDialog from "../components/BaseDialog";
import BasePage from "../components/BasePage";
export default {
  name: "HydrantList",
  components: {
    BaseTable,
    BaseDialog,
    BasePage
  },
  props: {
    activeName: String,
    areaId: Number
  },
  data() {
    return {
      //todo 表单
      form: {},
      formList: [
        {
          label: "编号：",
          value: "sn"
        },
        {
          label: "区域：",
          value: "areaName"
        },
        {
          label: "位置：",
          value: ""
        },
        {
          label: "状态：",
          value: ""
        },
        {
          label: "水压：",
          value: "pressure"
        },
        {
          label: "电量：",
          value: "dumpEnergy"
        }
      ],
      //  todo 报警历史
      tableWeek: {
        column: [
          {
            prop: "creationTime",
            label: "报警时间"
          },
          {
            prop: "title",
            label: "报警类型"
          },
          {
            prop: "handleStatus",
            label: "状态"
          }
        ],
        table: [],
        page: {
          MaxResultCount: 6,
          current: 1,
          total: 0
        }
      },
      // todo 消火栓
      tableHydrant: {
        column: [
          {
            prop: "sn",
            label: "编码"
          },
          {
            prop: "area",
            label: "区域"
          },
          {
            prop: "dumpEnergy",
            label: "电量"
          },
          {
            prop: "status",
            label: "状态"
          },
          {
            label: "详情"
          }
        ],
        table: [],
        page: {
          current: 1,
          total: 0,
          MaxResultCount: 10
        }
      }
    };
  },
  computed: {},
  watch: {
    activeName: function(val) {
      val === "first" && this.getRecordList();
    },
    areaId: function(id) {
      this.tableHydrant.page.AreaId = id;
      this.getRecordList();
    }
  },
  created() {},
  mounted() {},
  methods: {
    // todo 获取消火栓列表
    getRecordList() {
      this.axios
        .get(this.API.GET_AREA_HYDRANT, {
          params: this.tableHydrant.page
        })
        .then(res => {
          if (res.success) {
            this.tableHydrant.table = res.result.getAreaHydrantList;
            this.tableHydrant.page.total = res.result.totalCount;
          }
        });
    },
    // todo 查看消火栓详情
    getHydrantDetail(item) {
      this.$axios
        .get(this.API.GET_INFO_BYID, {
          params: { id: item.id }
        })
        .then(res => {
          if (res.success) {
            this.tableWeek.page.id = item.id;
            this.getHistory();
            this.getHisPress(item.id);
            this.form = res.result;
            this.$refs.hydrantDetail.show = true;
            this.$refs.hydrantDetail.title = "消火栓详情";
          }
        });
    },
    // todo 获取30天历史警情
    getHistory() {
      this.axios
        .get(this.API.GET_NEARBY_ALARMBYID, {
          params: this.tableWeek.page
        })
        .then(res => {
          this.tableWeek.table = res.result.items;
          this.tableWeek.page.total = res.result.totalCount;
        });
    },
    // todo 获取历史水压统计信息
    getHisPress(id) {
      this.$axios
        .get(this.API.GET_HYDRANT_PRESS_HISTORY, {
          params: { id }
        })
        .then(res => {
          this.creatCharts(res);
        });
    },
    //  todo 创建图表
    creatCharts(res) {
      let that = this;
      let yAxisData = [],
        seriesData = [];
      for (let item of res) {
        yAxisData.unshift(item.x.slice(5, 10)); // 截取时间月日
        seriesData.unshift(item.y);
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));

      // 指定图表的配置项和数据
      let option = {
        textStyle: {
          color: "#86afe8"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: yAxisData
        },
        color: ["#0099FF"],
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: seriesData,
            type: "line",
            areaStyle: {
              normal: {
                color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#0099FF" },
                  { offset: 0.5, color: "#409EFF" },
                  { offset: 1, color: "#00CCFF" }
                ])
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss">
.hydrant-list {
  display: flex;
  flex-direction: column;
  /*消火栓*/
  &-hydrant {
    height: 446px;
    width: 760px;
    display: grid;
    grid-template-columns: 376px 376px;
    grid-template-rows: 226px 226px;
    grid-gap: 10px;
    & > :nth-child(2) {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 3;
      display: flex;
      flex-direction: column;
    }
    & > div {
      border: 1px solid #1476bb;
      padding: 10px;
    }
    /*表单*/
    form {
      display: flex;
      flex-wrap: wrap;
      & > div {
        min-width: 50%;
        margin-bottom: 0;
        .el-form-item__label {
          color: #86afe8;
        }
        .el-form-item__content {
          color: #fff;
        }
      }
      & > :nth-child(3),
      :last-child {
        min-width: 100%;
      }
    }
  }
}
</style>
