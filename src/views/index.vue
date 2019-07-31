<template>
  <el-container class="home-index">
    <el-header>
      <base-header></base-header>
    </el-header>
    <el-container>
      <el-aside width="140px">
        <base-aside @getList="getRecordList"></base-aside>
      </el-aside>
      <el-main>
        <div id="baseMap"></div>
        <div class="home-index-tab">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="消火栓列表" name="first">
              <base-table
                @getDetail="getHydrantDetail"
                :table-column="tableHydrant.column"
                :table-data="tableHydrant.table"
              ></base-table>
            </el-tab-pane>
            <el-tab-pane label="警情记录" name="second">
              <base-table :table-column="tableRecord.column"></base-table>
            </el-tab-pane>
            <el-tab-pane label="管理人员" name="third">角色管理</el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
    <!--    todo 消火栓详情-->
    <base-dialog ref="hydrantDetail">
      <div class="home-index-hydrant">
        <div>
          <div class="home-index-hydrant-title">
            <img src="../assets/home_img_01.png" />
            <span>基本信息</span>
          </div>
        </div>
        <div>
          <div class="home-index-hydrant-title">
            <img src="../assets/home_img_01.png" />
            <span>历史警情</span>
          </div>
        </div>
        <div>
          <div class="home-index-hydrant-title">
            <img src="../assets/home_img_01.png" />
            <span>一周水泵</span>
          </div>
        </div>
      </div>
    </base-dialog>
  </el-container>
</template>

<script>
/**
 *  作者：0          时间：2019/7/29 10:27
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseHeader from "../components/BaseHeader";
import BaseAside from "../components/BaseAside";
import BaseTable from "../components/BaseTable";
import BaseDialog from "../components/BaseDialog";
export default {
  name: "index",
  components: {
    BaseHeader,
    BaseAside,
    BaseTable,
    BaseDialog
  },
  props: {},
  data() {
    return {
      activeName: "first",
      map: Object,
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
        page: {}
      },
      // todo 警情记录
      tableRecord: {
        column: [
          {
            prop: "",
            label: "区域"
          },
          {
            prop: "",
            label: "报警时间"
          },
          {
            prop: "",
            label: "报警类型"
          },
          {
            prop: "",
            label: "状态"
          },
          {
            label: "详情"
          }
        ],
        table: [],
        page: {}
      }
    };
  },
  computed: {},
  watch: {
    activeName: function(val) {}
  },
  created() {},
  mounted() {
    this.newMap();
    this.setArea();
  },
  methods: {
    // todo 获取消火栓列表
    getRecordList(val) {
      this.tableHydrant.page.AreaID = val;
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
    // todo 获取报警记录列表
    getHydrantList() {
      this.axios.get(this.API.GET_AREA_HYDRANT_ALARM_LIST).then(res => {
        if (res.success) {
        }
      });
    },
    // todo 获取人员列表
    getAdminList() {
      this.axios.get(this.API.GET_AREA_USER_LIST).then(res => {
        if (res.success) {
        }
      });
    },
    // todo 查看消火栓详情
    getHydrantDetail(id) {
      this.$refs.hydrantDetail.show = true;
      return;
      this.$axios
        .get(this.API.GET_FIRE_UNIT_INFO, {
          params: { id }
        })
        .then(res => {
          if (res.success) {
            let b = this.$refs.BaseDialog;
            b.show = true;
            b.title = "EDIT_UNIT_LIST";
            this.form = res.result;
            this.isDeit = 1;
          }
        });
    },
    // todo 初始化地图
    newMap() {
      this.map = new AMap.Map("baseMap", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        mapStyle: "amap://styles/darkblue"
      });
    },
    // todo 行政区的划分
    setArea() {
      let that = this;
      AMap.plugin("AMap.DistrictSearch", function() {
        // 创建行政区查询对象
        let district = new AMap.DistrictSearch({
          // 返回行政区边界坐标等具体信息
          extensions: "all",
          // 设置查询行政区级别为 区
          level: "district"
        });
        district.search("成华区", function(status, result) {
          // 获取朝阳区的边界信息
          let bounds = result.districtList[0].boundaries;
          let polygons = [];
          if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
              //生成行政区划polygon
              let polygon = new AMap.Polygon({
                map: that.map,
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0.1,
                fillColor: "#CCF3FF",
                strokeColor: "#62a5f4"
              });
              polygons.push(polygon);
            }
            // 地图自适应
            that.map.setFitView();
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
.home-index {
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
    &-title {
      color: #17cbff;
      font-size: 16px;
      span {
        margin-left: 10px;
      }
    }
    & > div {
      border: 1px solid #1476bb;
      padding: 10px;
    }
  }
  /*选项卡*/
  &-tab {
    margin-left: 10px;
    .el-tabs__item {
      width: 183px !important;
      text-align: center;
      color: #fff;
    }
    .is-active {
      background-color: #2495e6;
    }
  }
}
.el-header {
  padding: 0;
  margin-bottom: 10px;
}
/*内容*/
.el-main {
  margin-left: 10px;
  background-color: #00060e;
  padding: 10px;
  display: flex;
  & > :nth-child(1) {
    flex: 1 0 auto;
    background-color: #00060e !important;
  }
  & > :nth-child(2) {
    width: 552px;
  }
}
</style>
