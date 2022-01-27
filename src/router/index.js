import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Swapper",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      title: "關於我們 | Swapper",
    },
  },
  {
    path: "/grouppage",
    name: "grouppage",
    component: () =>
      import(/* webpackChunkName: "grouppage" */ "../views/GroupPage.vue"),
    meta: {
      title: "團體募集 | Swapper",
    },
  },
  {
    path: "/memberpage",
    name: "memberpage",
    component: () =>
      import(/* webpackChunkName: "memberpage" */ "../views/MemberPage.vue"),
    meta: {
      title: "會員專區 | Swapper",
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const user = store.getters["user/user"];
  if (to.meta.login && !user.isLogin) {
    next("/login");
  } else if (to.meta.admin && !user.isAdmin) {
    next("/");
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
