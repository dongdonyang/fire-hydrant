<template>
  <el-container class="home-index">
    <el-header>
      <base-header></base-header>
    </el-header>
    <el-container>
      <el-aside width="140px">
        <base-aside></base-aside>
      </el-aside>
      <el-main>
        <div id="baseMap"></div>
        <div class="home-index-tab">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="消火栓列表" name="first">
              <base-table :table-column="tableColumn"></base-table>
            </el-tab-pane>
            <el-tab-pane label="警情记录" name="second">
              <base-table :table-column="tableColumn_2"></base-table>
            </el-tab-pane>
            <el-tab-pane label="管理人员" name="third">角色管理</el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
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
export default {
  name: "index",
  components: {
    BaseHeader,
    BaseAside,
    BaseTable
  },
  props: {},
  data() {
    return {
      activeName: "first",
      map: Object,
      tableColumn: [
        {
          prop: "",
          label: "编码"
        },
        {
          prop: "",
          label: "区域"
        },
        {
          prop: "",
          label: "电量"
        },
        {
          prop: "",
          label: "状态"
        },
        {
          label: "详情"
        }
      ],
      tableColumn_2: [
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
      ]
    };
  },
  computed: {},
  watch: {
    activeName: function(val) {}
  },
  created() {
    this.getRecordList();
  },
  mounted() {
    this.newMap();
    this.setArea();
  },
  methods: {
    // todo 获取消火栓列表
    getRecordList() {
      this.axios.get(this.API.GET_AREA_HYDRANT).then(res => {
        if (res.success) {
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
