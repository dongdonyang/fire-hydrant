import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import API from "./plugins/api";

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
  actions: {
    //  todo 经纬度=》具体位置、使用的事web服务、返回一个promise对象、方便使用
    getPositionName(context, place) {
      let url = `http://restapi.amap.com/v3/geocode/regeo?key=e86bd3cdfc91ca7a46c44ddf62e1d80f&location=${
        place.lng
      },${place.lat}`;
      return axios.get(url)
    }
  }
});
