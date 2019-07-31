import Vue from "vue";
import Router from "vue-router";
import Cookies from "js-cookie";

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

// todo 登录判定
router.beforeEach(function(to, from, next) {
  if (Cookies.get("isLogin")) {
    if (to.name === "login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.name !== "login") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
