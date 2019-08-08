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
              v-if="
                recordForm.handleStatus === 0 || recordForm.handleStatus === 1
              "
              label="状态"
            >
              <span>待处理</span>
            </el-form-item>
            <el-form-item
              v-else
              v-for="(item, index) in recordFormHandle"
              :key="index"
              :label="item.label"
            >
              <!--              状态-->
              <div v-if="index === 0">
                {{ handleStatus[recordForm[item.value]] }}
              </div>

              <!--              声音-->
              <div
                v-else-if="
                  index === 4 &&
                    recordForm.problemRemarkType === 2 &&
                    recordForm.problemRemark
                "
              >
                <el-button
                  class="police-record-records-but"
                  v-if="playTime"
                  type="success"
                  size="mini"
                  @click="playVoice"
                >
                  <img height="14px" src="../assets/zbxc_img_04.png" />
                  <span>{{ `${playTime}''` }}</span>
                </el-button>
              </div>
              <!--              文字备注-->
              <div
                v-else-if="index === 4 && recordForm.problemRemarkType === 1"
              >
                {{ recordForm.problemRemark }}
              </div>
              <!--              照片-->
              <div v-else-if="index === 5">
                <el-image
                  v-for="index in recordForm.arr"
                  :key="index"
                  style="width: 170px; height: 110px;margin: 10px"
                  :src="index"
                  alt=""
                  fit="cover"
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
      amr: Object,
      playerUrl: Object,
      playTime: "",
      handleStatus: ["未定义", "未处理", "处理中", "已解决"],
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
          value: "handleStatus"
        },
        {
          label: "时间：",
          value: "solutionTime"
        },
        {
          label: "处理人：",
          value: "handleUser"
        },
        {
          label: "联系方式：",
          value: "phone"
        },
        {},
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
      this.tableRecord.page.SkipCount = 0;
      this.tableRecord.page.current = 1;
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
      let that = this;
      that.playTime = 0;
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
            //  todo 图片添加地址前缀
            if (this.recordForm.phtosPath.length) {
              this.recordForm.arr = this.recordForm.phtosPath.map(i => {
                return `http://fd.sctsjkj.com:5081${i}`;
              });
            }
            //  todo 创建语音对象
            if (
              this.recordForm.problemRemarkType === 2 &&
              this.recordForm.problemRemark
            ) {
              this.playerUrl = `http://fd.sctsjkj.com:5081${
                this.recordForm.problemRemark
              }`;
              // todo、转码创建音频播放对象
              let BenzAMRRecorder = require("benz-amr-recorder");
              this.amr = new BenzAMRRecorder(); //创建
              this.amr.initWithUrl(this.playerUrl).then(function() {
                that.playTime = that.amr.getDuration(); // 时长
              });
            }
          }
        });
    },
    // todo 语音播放 ，解码
    playVoice() {
      let that = this;
      this.amr.play(); //播放
      this.amr.onEnded(function() {
        that.$message.success("播放完毕");
      });
    }
  }
};
</script>

<style lang="scss">
.police-record {
  &-detail {
    padding: 0 80px;
    & > :first-child {
      form > :last-child {
        width: 100%;
      }
    }
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
    /*语音按钮*/
    &-but {
      margin-left: 10px;
      & > :first-child {
        display: flex;
        align-items: center;
        img {
          margin-right: 5px;
        }
      }
    }
  }
  &-handle {
    & > :nth-child(5),
    :nth-child(6) {
      min-width: 100%;
    }
  }
  /*照片详情*/
  .el-icon-full-screen,
  .el-icon-c-scale-to-original,
  .el-image-viewer__btn,
  .el-image-viewer__next,
  .el-icon-refresh-left {
    min-width: 0 !important;
  }
}
</style>
