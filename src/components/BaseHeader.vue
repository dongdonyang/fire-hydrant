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
  </div>
</template>

<script>
/**
 *  作者：0          时间：2019/7/29 15:45
 *  1,常量从js文件引入，不要定义魔术变量
 */
export default {
  name: "BaseHeader",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  todo 设置
    setting() {},
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
}
</style>
