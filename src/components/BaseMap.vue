<template>
  <div id="baseMap"></div>
</template>

<script>
/**
 *  作者：0          时间：2019/8/1 16:59
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseMap",
  components: {},
  props: {},
  data() {
    return {
      map: Object
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.newMap();
  },
  methods: {
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

<style lang="scss"></style>
