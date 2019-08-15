<template>
  <div>
    <div id="baseMap" style="height: 100%;width: 100%"></div>

    <!--    todo 消火栓详情-->
    <base-dialog ref="hydrantDetail">
      <div class="map-list-hydrant">
        <!--        todo 基本信息-->
        <div>
          <sub-title title="基本信息"></sub-title>
          <el-form>
            <el-form-item
              v-for="(item, index) in formList"
              :key="index"
              :label="item.label"
            >
              <div v-if="index === 5" :class="getEleClass()">
                {{ `剩余电量 ${form[item.value] * 100} %` }}
              </div>
              <div v-else-if="index === 3">
                {{ getStatus[form[item.value]] }}
              </div>
              <div v-else>{{ form[item.value] }} {{ item.unit }}</div>
            </el-form-item>
          </el-form>
        </div>

        <!--        todo 历史警情list-->
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

        <!--        todo 图表-->
        <div>
          <sub-title title="一周水压"></sub-title>
          <div id="myChartIndex" style="height: 100%;width: 100%"></div>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/8/1 16:59
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseTable from "../components/BaseTable";
import BaseDialog from "../components/BaseDialog";
import BasePage from "../components/BasePage";
export default {
  name: "BaseMap",
  components: {
    BaseTable,
    BaseDialog,
    BasePage
  },
  props: {
    areaId: Number
  },
  data() {
    return {
      batteryArray: [1, 2, 3, 4, 5],
      getStatus: {
        0: "未指定",
        1: "正常在线",
        "-1": "部分离线",
        "-2": "异常",
        "-3": "离线"
      },
      //todo 表单
      form: {
        position: ""
      },
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
          value: "position"
        },
        {
          label: "状态：",
          value: "status"
        },
        {
          label: "水压：",
          value: "pressure",
          unit: "KPa"
        },
        {
          img: require("../assets/electric.png"),
          label: "电量：",
          info: "剩余电量 ",
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
            label: "状态",
            map: "policeRecord"
          }
        ],
        table: [],
        page: {
          MaxResultCount: 7,
          current: 1,
          total: 0
        }
      },
      map: Object,
      spotList: []
    };
  },
  computed: {},
  watch: {
    areaId: function(id) {
      this.getSpotMore(id);
    }
  },
  created() {},
  mounted() {
    this.newMap();
    this.setArea();
  },
  methods: {
    // todo 获取电池图标
    getEleClass() {
      let val = Math.ceil(Number(this.form.dumpEnergy) / 0.3);
      let v = `hydrant-list-hydrant-ele${this.batteryArray[val]}`;
      console.log("class", v);
      return v;
    },
    // todo 初始化地图
    newMap() {
      let that = this;
      this.map = new AMap.Map("baseMap", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        mapStyle: "amap://styles/darkblue", // 地图风格、极夜蓝
        showLabel: false
        // dragEnable: false,
        // zoomEnable: false,
        // keyboardEnable: false
      });
      // 平移结束后出发，打印中心点位置
      this.map.on("moveend", function() {
        console.log("中心点", that.map.getCenter());
      });
    },
    getUnitInfo(val) {
      this.getHydrantDetail(val.target.item);
    },
    // todo 获取地图点的标记、标记点
    getSpotMore(val) {
      this.map.remove(this.spotList); // 清除所有标记的点
      let that = this;
      this.$axios
        .get(this.API.GET_AREA_HYDRANT, {
          params: { AreaId: val, MaxResultCount: 9999999 }
        })
        .then(res => {
          let spotArray = [];
          // 创建 AMap.Icon 实例：
          let icon = new AMap.Icon({
            size: new AMap.Size(40, 50), // 图标尺寸
            image:
              "//datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/32a60b3e7d599f983aa1a604fb640d7e.gif" // Icon的图像
          });
          for (let item of res.result.getAreaHydrantList) {
            // todo 创建标记点
            let marker = new AMap.Marker({
              position: new AMap.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: item.info,
              offset: new AMap.Pixel(-10, -10),
              icon: icon
            });
            marker.item = item; // 自定义参数
            marker.on("click", that.getUnitInfo);
            spotArray.push(marker);
          }
          this.spotList = spotArray;
          this.map.add(spotArray);
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
            that.map.setZoom(13); // 设置缩放级别
            console.log("中心点", that.map.getCenter());
            that.map.setStatus({
              dragEnable: false,
              zoomEnable: false,
              keyboardEnable: false
            }); // 更改属性
            that.map.panTo([104.18586683839555, 30.68267255454134]); // 设置偏移量
          }
        });
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
            //todo 根据经纬度获取具体位置信息
            this.$store.dispatch("getPositionName", res.result).then(res => {
              console.log(res.data);
              let p = res.data.regeocode.formatted_address;
              this.form.position = p.length ? p : "未获取到位置信息";
            });

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
      let myChart = this.$echarts.init(document.getElementById("myChartIndex"));

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
/*消火栓*/
.map-list-hydrant {
  width: 760px;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr 220px;
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
      width: 100%;
    }
  }
  /*电量图标*/
  .battery {
    content: " 123 ";
    color: transparent;
    padding-right: 5px;
    background-repeat: no-repeat;
    background-position-y: -4px;
  }
  &-ele1::before {
    @extend .battery;
    background-image: url("../assets/element1.png");
  }
  &-ele2::before {
    @extend .battery;
    background-image: url("../assets/element2.png");
  }
  &-ele3::before {
    @extend .battery;
    background-image: url("../assets/element3.png");
  }
  &-ele4::before {
    @extend .battery;
    background-image: url("../assets/element4.png");
  }
  &-ele5::before {
    @extend .battery;
    background-image: url("../assets/element5.png");
  }
}
</style>
