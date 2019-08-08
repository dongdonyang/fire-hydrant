import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入插件
import "./plugins/element";
import "./plugins/axios";
import "./plugins/BaseComponents";
import Cookies from "js-cookie";
import echarts from "echarts";


Vue.prototype.$cookies = Cookies;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

//todo 获取用户信息、然后存在vuex中、以供全局使用、目前根据session中的数据来判断有没有登录的，因为cookie后端设置前端获取不到
if (Cookies.get("userInfo")) {
  let info = JSON.parse(Cookies.get("userInfo"));
  let tok = Cookies.get("isLogin");
  console.log("token信息：", tok);
  console.log("用户信息：", info);
  store.commit("setUserInfo", info, tok);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
