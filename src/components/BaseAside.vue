<template>
  <el-menu class="base-aside" @select="handleSelect">
    <el-menu-item :index="`${titleId}`">
      <span slot="title">{{ title }}</span>
    </el-menu-item>
    <el-menu-item
      v-for="(item, index) in menuList"
      :key="index"
      :index="`${item.areaID}`"
    >
      <span slot="title">{{ item.areaName }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
/**
 *  作者：0          时间：2019/7/29 15:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseAsider",
  components: {},
  model: {},
  props: {},
  data() {
    return {
      title: "",
      titleId: "",
      menuList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    // todo 选择某个菜单
    handleSelect(index) {
      console.log(index);
      this.$emit("getList", index);
    },
    //    todo 获取菜单列表
    getList() {
      this.axios
        .get(this.API.GET_USER_AREA_FOR_PC, {
          params: { UserID: this.$store.state.userInfo.userId }
        })
        .then(res => {
          if (res.success) {
            ({
              areaName: this.title,
              areaID: this.titleId,
              sonlist: this.menuList
            } = res.result);
            // 初始化页面数据
            this.$emit("getList", this.titleId);
          }
        });
    }
  }
};
</script>

<style lang="scss">
.base-aside {
  background-color: transparent;
  position: absolute;
  width: 140px;
  left: 120px;
  top: 200px;
  z-index: 1;
  border-right-width: 0;
  .el-menu-item {
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #718fab;
  }
  /*菜单选中*/
  .el-menu-item.is-active {
    color: #fff;
    font-size: 16px;
    background-color: transparent;
  }
  /*菜单hover*/
  .el-menu-item:hover {
    transition: all 0.5s ease 0s;
    background-color: transparent !important;
    color: #fff;
    font-size: 16px;
  }
}
</style>
