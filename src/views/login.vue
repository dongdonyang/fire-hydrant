<template>
  <div class="login">
    <div>
      <el-form label-width="38px" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入您的用户名">
            <img slot="prefix" src="../assets/login-form-3.png" alt="" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.region" placeholder="请输入您的密码">
            <img slot="prefix" src="../assets/login-form-1.png" alt="" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.type" placeholder="请输入验证码">
            <img slot="prefix" src="../assets/login-form-2.png" alt="" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <p>
        <img src="../assets/login-message.png" />
        <span>{{ message }}</span>
      </p>
    </div>
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/29 10:27
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      message:
        "粤公网安备 44010502000715号 | Copyright © 2010-2019广州凡科互联网科技股份有限公司 粤ICP备10235580号",
      form: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //    todo 登录
    submit() {}
  }
};
</script>

<style lang="scss">
.login {
  /*  登录背景*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url("../assets/load_img_bg.png");
  background-size: 100% 100%;
  /*  登录背景图*/
  & > :nth-child(1) {
    background-image: url("../assets/load_img_bg01.png");
    background-repeat: no-repeat;
    background-position: center;
    height: 367px;
    /*  登录表单*/
    .el-form {
      margin: auto;
      height: 287px;
      width: 294px;
      position: relative;
      left: 178px;
      padding: 40px 38px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & > div {
        margin-bottom: 0;
        button {
          width: 100%;
        }
      }
    }
  }
  /*网关信息*/
  & > :nth-child(2) {
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100vw;
  }
}
</style>
