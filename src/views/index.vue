<template>
  <el-container class="home-index">
    <el-header>
      <base-header></base-header>
    </el-header>
    <el-container>
      <base-aside @getList="setAreaId"></base-aside>
      <el-main>
        <base-map></base-map>
        <div class="home-index-tab">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="消火栓列表" name="first"
              ><hydrant-list
                :activeName="activeName"
                :areaId="areaId"
              ></hydrant-list
            ></el-tab-pane>

            <el-tab-pane label="警情记录" name="second">
              <police-record
                :activeName="activeName"
                :areaId="areaId"
              ></police-record>
            </el-tab-pane>

            <el-tab-pane label="管理人员" name="third">
              <manage-user
                :activeName="activeName"
                :areaId="areaId"
              ></manage-user>
            </el-tab-pane>
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
import BaseMap from "../components/BaseMap";
import BaseHeader from "../components/BaseHeader";
import BaseAside from "../components/BaseAside";
import HydrantList from "../components/HydrantList";
import PoliceRecord from "../components/PoliceRecord";
import ManageUser from "../components/ManageUser";
export default {
  name: "index",
  components: {
    BaseHeader,
    BaseAside,
    HydrantList,
    PoliceRecord,
    BaseMap,
    ManageUser
  },
  props: {},
  data() {
    return {
      activeName: "first",
      areaId: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // todo id 赋值
    setAreaId(id) {
      this.activeName = "first";
      this.areaId = +id;
    }
  }
};
</script>

<style lang="scss">
.home-index {
  /*选项卡*/
  &-tab {
    position: absolute;
    right: 15px;
    top: 80px;
    /*height: calc(100vh - 400px);*/
    .el-tabs__nav {
      border-color: #2495e6 !important;
    }
    .el-tabs__item {
      width: 183px !important;
      text-align: center;
      color: #fff;
      border-color: #2495e6 !important;
    }
    .is-active {
      background-color: #2495e6;
    }
    /*分局置于末尾*/
    .el-tabs {
      height: 100%;
      display: flex;
      flex-direction: column;
      .el-tabs__content {
        flex: 2 0 auto;
        & > div {
          height: 100%;
          & > div {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
}
.el-header {
  padding: 0;
}
/*内容*/
.el-main {
  height: 100%;
  padding: 0;
  background-color: #00060e;
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
