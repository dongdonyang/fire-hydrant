import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {}, // 用户登录信息
    token: 0 // 保存的登录token信息
  },
  // todo this.$store.commit("increment")
  mutations: {
    // 设置用户信息
    setUserInfo(state, payload = {}, token = 0) {
      state.userInfo = payload ? payload : {};
      state.token = token;
    }
  },
  actions: {}
});
