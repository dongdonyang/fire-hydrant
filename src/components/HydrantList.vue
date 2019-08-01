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
        </div>
        <div>
          <sub-title title="历史警情"></sub-title>
          <base-table :table-column="tableWeek.column"></base-table>
        </div>
        <div>
          <sub-title title="一周水泵"></sub-title>
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
      //  todo 一周水泵
      tableWeek: {
        column: [
          {
            prop: "area",
            label: "报警时间"
          },
          {
            prop: "createTime",
            label: "报警类型"
          },
          {
            prop: "title",
            label: "状态"
          }
        ]
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
    getHydrantDetail(id) {
      this.$refs.hydrantDetail.show = true;
      this.$refs.hydrantDetail.title = "消火栓详情";
      this.$axios
        .get(this.API.GET_FIRE_UNIT_INFO, {
          params: { id }
        })
        .then(res => {
          if (res.success) {
          }
        });
    }
  }
};
</script>

<style lang="scss">
.hydrant-list {
  /*消火栓*/
  &-hydrant {
    height: 446px;
    width: 760px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    & > :nth-child(2) {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 3;
    }
    & > div {
      border: 1px solid #1476bb;
      padding: 10px;
    }
  }
}
</style>
