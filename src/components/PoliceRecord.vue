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
      <div class="police-record-detail">
        <div>
          <sub-title title="警情信息"></sub-title>
          <el-form class="police-record-records">
            <el-form-item
              v-for="(item, index) in recordFormList"
              :key="index"
              :label="item.label"
              >{{ recordForm[item.value] }}
            </el-form-item>
          </el-form>
        </div>
        <div>
          <sub-title title="警情处理"></sub-title>
          <el-form class="police-record-records police-record-handle">
            <el-form-item
              v-for="(item, index) in recordFormHandle"
              :key="index"
              :label="item.label"
            >
              <!--              声音-->
              <div
                v-if="
                  index === 2 &&
                    recordForm.problemRemarkType === 2 &&
                    recordForm.problemRemark
                "
              >
                <audio style="width: 216px;height: 40px;" controls="controls">
                  <source
                    :src="
                      `http://fd.sctsjkj.com:5081${recordForm.problemRemark}`
                    "
                    type="audio/amr"
                  />
                </audio>
              </div>
              <!--              文字备注-->
              <div
                v-else-if="index === 2 && recordForm.problemRemarkType === 1"
              >
                {{ recordForm.problemRemark }}
              </div>
              <!--              照片-->
              <div v-if="index === 3">
                <el-image
                  v-for="index in recordForm.arr"
                  :key="index"
                  style="width: 170px; height: 110px;margin: 10px"
                  :src="index"
                  alt=""
                  :preview-src-list="recordForm.arr"
                >
                </el-image>
                <img />
              </div>

              <div v-else>{{ recordForm[item.value] }}</div>
            </el-form-item>
          </el-form>
        </div>
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
          value: "adress"
        },
        {
          label: "类型：",
          value: "title"
        },
        {
          label: "时间：",
          value: "creationTime"
        },
        {
          label: "位置：",
          value: "position"
        }
      ],
      recordFormHandle: [
        {
          label: "状态：",
          value: "sn"
        },
        {
          label: "时间：",
          value: "solutionTime"
        },
        {
          value: "problemRemark"
        },
        {
          value: "phtosPath"
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
            label: "状态",
            map: "policeRecord"
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
            //todo 根据经纬度获取具体位置信息
            this.$store.dispatch("getPositionName", res.result).then(res => {
              console.log(res.data);
              let p = res.data.regeocode.formatted_address;

              p.length
                ? this.$set(this.recordForm, "position", p)
                : "未获取到位置信息";
            });
            //  图片添加地址前缀
            if (this.recordForm.phtosPath.length) {
              this.recordForm.arr = this.recordForm.phtosPath.map(i => {
                return `http://fd.sctsjkj.com:5081${i}`;
              });
            }
          }
        });
    }
  }
};
</script>

<style lang="scss">
.police-record {
  &-detail {
    padding: 0 80px;
  }
  /*弹窗*/
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
      .el-form-item__content {
        color: #fff;
      }
    }
  }
  &-handle {
    & > :nth-child(3),
    :nth-child(4) {
      min-width: 100%;
    }
  }
  .el-icon-full-screen,
  .el-icon-c-scale-to-original,
  .el-image-viewer__btn,
  .el-image-viewer__next {
    min-width: 0 !important;
  }
}
</style>
