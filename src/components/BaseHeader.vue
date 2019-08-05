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
      <el-button type="text" @click="sure"
        ><img src="../assets/head_img_03.png"
      /></el-button>
    </div>

    <!--    todo 系统设置-->
    <base-dialog ref="BaseDialog">
      <div class="base-header-dia">
        <sub-title title="水压报警阈值设置"></sub-title>
        <div class="base-header-dia-main">
          <span>上限：</span>
          <el-input
            type="number"
            step="0.01"
            max="999"
            v-model="form.pressureMin"
          >
            <span slot="suffix">KPa</span>
          </el-input>
          <span>高于设定值则报警，不填写表示无上限</span>
        </div>
        <div class="base-header-dia-main">
          <span>下限：</span>
          <el-input
            type="number"
            step="0.01"
            min="-999"
            v-model="form.pressureMax"
          >
            <span slot="suffix">KPa</span>
          </el-input>
          <span>低于设定值则报警，不填写表示无下限</span>
        </div>
        <sub-title title="电池电量报警阈值设置"></sub-title>
        <div class="base-header-dia-main">
          <span>下限：</span>
          <el-input
            type="number"
            step="1"
            min="0"
            max="100"
            v-model="form.dumpEnergy"
          >
            <span slot="suffix">%</span>
          </el-input>
          <span>低于设定值则报警，不填写表示无下限</span>
        </div>
        <div>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </base-dialog>

    <!--    todo 退出弹窗-->
    <el-dialog :visible.sync="show" class="base-header-out" center>
      <div>你确定要注销吗？</div>
      <div>
        <el-button @click="show = false">取消</el-button>
        <el-button @click="logout">确定</el-button>
      </div>
    </el-dialog>
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
      show: false,
      form: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // todo 获取消火栓设置
    setting() {
      this.axios.get(this.API.GET_HYRANT_SET).then(res => {
        if (res.success) {
          this.form = res.result;
          this.$refs.BaseDialog.show = true;
          this.$refs.BaseDialog.title = "系统设置";
        }
      });
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
    //todo 退出前的确认
    sure() {
      this.show = true;
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
  /*确认框*/
  &-out {
    .el-dialog {
      width: 500px;
      height: 300px;
      background-color: #0c274c;
    }
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      height: 100%;
      color: #fff;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      & > :nth-child(1) {
        font-size: 18px;
      }
      /*按钮*/
      & > :nth-child(2) {
        & > :nth-child(1) {
          background-color: #04a8c6;
          border-color: #04a8c6;
          height: 50px;
          width: 140px;
          color: #fff;
          font-size: 16px;
        }
        & > :nth-child(2) {
          background-color: #1686d5;
          border-color: #1686d5;
          height: 50px;
          width: 140px;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  &-dia {
    padding: 10px 70px;
    &-main {
      margin: 30px auto;
      display: flex;
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
        width: 120px;
        margin: 0 20px;
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
