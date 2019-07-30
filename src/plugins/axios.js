"use strict";

import axios from "axios";
import Vue from "vue";
import API from "./api"; // 请求的地址

let config = {};
const _axios = axios.create(config);

// todo 添加请求拦截器
_axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// todo 添加响应拦截器
_axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

//todo 注册插件、axios、请求的路径
Plugin.install = function(Vue, option) {
  Vue.axios = _axios;
  Vue.API = API;
  window.axios = _axios;
  window.API = API;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
    API: {
      get() {
        return API;
      }
    },
    $API: {
      get() {
        return API;
      }
    }
  });
};
Vue.use(Plugin);
