<template>
  <div class="login">
    <div>
      <el-form label-width="38px" :model="form" :rules="rules" ref="form">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="请输入您的用户名">
            <img slot="prefix" src="../assets/login-form-3.png" alt="" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入您的密码"
          >
            <img slot="prefix" src="../assets/login-form-1.png" alt="" />
          </el-input>
        </el-form-item>
        <!--          验证码-->
        <el-form-item prop="verifyCode" class="login-code">
          <el-input
            @keyup.enter.native="submit"
            placeholder="验证码"
            v-model="form.verifyCode"
          >
            <i slot="prefix" class="el-input__icon el-icon-key"></i>
          </el-input>
          <img :src="imgUrl" alt="" />
          <el-button @click="getCode" type="text" class="el-icon-refresh"
            >换一张</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
<!--    <div>-->
<!--      <p>-->
<!--        <img src="../assets/login-message.png" />-->
<!--        <span>{{ message }}</span>-->
<!--      </p>-->
<!--    </div>-->
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
      imgUrl: "",
      message:
        "粤公网安备 44010502000715号 | Copyright © 2010-2019广州凡科互联网科技股份有限公司 粤ICP备10235580号",
      form: {},
      rules: {
        account: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入用户密码" }],
        verifyCode: [{ required: true, message: "请输入验证码" }]
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getCode();
  },
  mounted() {},
  methods: {
    // todo 获取验证码、处理二进制流图片的显示问题
    getCode() {
      this.axios
        .get(this.API.GET_VERIFY_CODE, {
          responseType: "blob"
        })
        .then(res => {
          this.imgUrl = window.URL.createObjectURL(res);
        });
    },
    //    todo 登录
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios.post(this.API.USER_LOGIN, this.form).then(res => {
            let r = res.result;
            if (r.success) {
              sessionStorage.setItem("userInfo", JSON.stringify(r));
              this.$store.commit("setUserInfo", r);
              this.$cookies.set("isLogin", 1);
              this.$cookies.set("userInfo", JSON.stringify(r));
              this.$router.push({
                name: "home"
              });
            } else {
              this.$message.error(r.failCause);
            }
          });
        }
      });
    }
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
      .login-code div {
        display: flex;
        & > :nth-child(3) {
          width: 58px;
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
    color: #88cbff;
    font-size: 12px;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin: auto 5px;
      }
    }
  }
}
</style>
