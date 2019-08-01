<template>
  <div class="police-record">
    <base-table
      :table-column="tableRecord.column"
      :table-data="tableRecord.table"
      @getDetail="getHydrantListDetail"
    ></base-table>
    <base-page
      v-bind:prop-pag.sync="tableRecord.page"
      @currentChange="getHydrantList"
    ></base-page>

    <!--    todo 报警记录详情-->
    <base-dialog ref="recordsDetail">
      <div>
        <sub-title title="警情信息"></sub-title>
        <el-form class="police-record-records">
          <el-form-item
            v-for="(item, index) in recordFormList"
            :key="index"
            :label="item.label"
            >{{ item.value }}
          </el-form-item>
        </el-form>
      </div>
      <div>
        <sub-title title="警情处理"></sub-title>
      </div>
    </base-dialog>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/8/1 16:38
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseTable from "../components/BaseTable";
import BaseDialog from "../components/BaseDialog";
import BasePage from "../components/BasePage";
export default {
  name: "PoliceRecord",
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
      //警情记录详情
      recordForm: {},
      recordFormList: [
        {
          label: "编号：",
          value: "sn"
        },
        {
          label: "区域：",
          value: ""
        },
        {
          label: "位置：",
          value: "adress"
        },
        {
          label: "类型：",
          value: ""
        },
        {
          label: "时间：",
          value: ""
        }
      ],
      // todo 警情记录
      tableRecord: {
        column: [
          {
            prop: "area",
            label: "区域"
          },
          {
            prop: "createTime",
            label: "报警时间"
          },
          {
            prop: "title",
            label: "报警类型"
          },
          {
            prop: "handleStatus",
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
      val === "second" && this.getHydrantList();
    },
    areaId: function(id) {
      this.tableRecord.page.AreaId = id;
      this.getHydrantList();
    }
  },
  created() {},
  mounted() {},
  methods: {
    // todo 获取报警记录列表
    getHydrantList() {
      this.axios
        .get(this.API.GET_AREA_HYDRANT_ALARM_LIST, {
          params: this.tableRecord.page
        })
        .then(res => {
          if (res.success) {
            this.tableRecord.table = res.result.alarmList;
            this.tableRecord.page.total = res.result.totalCount;
          }
        });
    },
    // todo 查看警情列表详情
    getHydrantListDetail(item) {
      this.$axios
        .get(this.API.GET_HYDRANT_ALARM_INFO, {
          params: { AlarmID: item.alarmId }
        })
        .then(res => {
          if (res.success) {
            this.$refs.recordsDetail.show = true;
            this.$refs.recordsDetail.title = "警情记录详情";
            this.recordForm = res.result;
          }
        });
    }
  }
};
</script>

<style lang="scss">
.police-record {
  /*  警情详情-form*/
  &-records {
    display: flex;
    flex-wrap: wrap;
    .el-form-item__label {
      color: #86afe8;
    }
    & > div {
      min-width: 50%;
      margin-bottom: 10px;
    }
  }
}
</style>
