<template>
  <el-dialog
    class="base-dialog"
    :visible.sync="show"
    width="800px"
    center
    :title="title"
    :show-close="false"
  >
    <img
      class="base-dialog-img"
      src="../assets/home_btn_close.png"
      alt=""
      @click="show = false"
    />
    <slot>弹窗内容</slot>
  </el-dialog>
</template>

<script>
/**
 *  作者：0          时间：2019/7/31 15:04
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseDialog",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      title: "标题"
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.base-dialog {
  &-img {
    cursor: pointer;
    position: absolute;
    top: -30px;
    right: -30px;
  }
  .el-dialog {
    background-color: #0c274c;
    border: {
      image: url("../assets/home_img_bg.png") 32 37 fill / 1 / 0 stretch;
      style: solid;
      width: 12px 12px;
    }
  }
  .el-dialog__header {
    padding: 10px 20px;
    background: url("../assets/home_img_bg01.png") center no-repeat;
    .el-dialog__title {
      font-size: 22px;
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 15px;
  }
}
</style>
