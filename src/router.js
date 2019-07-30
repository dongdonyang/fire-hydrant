import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    //  主页
    {
      path: "/",
      name: "home",
      component: () => import("./views")
    },
    //  登录页
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login")
    }
  ]
});

export default router;
