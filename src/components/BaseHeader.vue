<template>
  <div class="base-header">
    <div>
      <img src="../assets/head_img_01.png" alt="" />
      <span>{{ $store.state.userInfo.name }}</span>
    </div>
    <div>
      <el-button type="text" @click="setting"
        ><img src="../assets/head_img_02.png"
      /></el-button>
      <el-button type="text" @click="logout"
        ><img src="../assets/head_img_03.png"
      /></el-button>
    </div>
    <base-dialog ref="BaseDialog">
      <div class="base-header-dia">
        <sub-title title="水压报警阈值设置"></sub-title>
        <div class="base-header-dia-main">
          <span>上线：</span>
          <el-input v-model="form.pressureMin">
            <span slot="suffix">KPa</span>
          </el-input>
          <span>高于设定值则报警，不填写表示无上限</span>
        </div>
        <div class="base-header-dia-main">
          <span>下线：</span>
          <el-input v-model="form.pressureMax">
            <span slot="suffix">KPa</span>
          </el-input>
          <span>低于设定值则报警，不填写表示无下限</span>
        </div>
        <sub-title title="电池电量报警阈值设置"></sub-title>
        <div class="base-header-dia-main">
          <span>下线：</span>
          <el-input v-model="form.dumpEnergy">
            <span slot="suffix">%</span>
          </el-input>
          <span>低于设定值则报警，不填写表示无下限</span>
        </div>
        <div>
          <el-button type="primary">确定</el-button>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/29 15:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
import BaseDialog from "../components/BaseDialog";
export default {
  name: "BaseHeader",
  components: {
    BaseDialog
  },
  props: {},
  data() {
    return {
      form: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 设置
    setting() {
      this.$refs.BaseDialog.show = true;
      this.$refs.BaseDialog.title = "系统设置";
    },
    // todo 提交
    submit() {
      this.axios.put(this.API.UPDATE_HYRANT_SET, this.form).then(res => {
        if (res.success) {
          this.$message.success("保存设置成功");
          this.$refs.BaseDialog.show = false;
        }
      });
    },
    //  todo 退出
    logout() {
      this.$axios.post(this.API.USER_LOGOUT).then(res => {
        if (res.success) {
          this.$message.success("退出成功！");
          this.$store.commit("setUserInfo");
          sessionStorage.clear();
          this.$cookies.remove("isLogin");
          this.$cookies.remove("userInfo");
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.base-header {
  height: 60px;
  padding: 0 30px;
  background-image: url("../assets/head_img_topBg.png");
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*  用户信息*/
  & > :nth-child(1) {
    span {
      color: #7ec9fe;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  &-dia {
    padding: 10px 70px;
    &-main {
      margin: 30px auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      /* 单位垂直居中*/
      .el-input__suffix {
        top: 10px;
      }
      & > :nth-child(1) {
        color: #fff;
        font-size: 14px;
      }
      & > :nth-child(2) {
        width: 300px;
      }
      & > :nth-child(3) {
        color: #86afe8;
        font-size: 14px;
      }
    }
    /*提交按钮*/
    & > :last-child {
      text-align: center;
      .el-button {
        width: 140px;
        height: 50px;
        background-color: #1686d5;
        border-color: #1686d5;
      }
    }
  }
}
</style>
