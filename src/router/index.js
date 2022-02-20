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
    component: () =>
      import(/* webpackChunkName: "memberpage" */ "../views/MemberPage.vue"),
    children: [
      {
        path: "",
        name: "memberpage",
        component: () =>
          import(
            /* webpackChunkName: "memberpage" */ "../views/MemberInfo.vue"
          ),
        meta: {
          title: "會員專區 | 購物網",
          login: true,
        },
      },
      {
        path: "memberpost",
        name: "memberpost",
        component: () =>
          import(
            /* webpackChunkName: "memberpage" */ "../views/MemberPost.vue"
          ),
        meta: {
          title: "商品刊登 | 購物網",
          login: true,
        },
      },
      {
        path: "postedit",
        name: "postedit",
        component: () =>
          import(/* webpackChunkName: "memberpage" */ "../views/PostEdit.vue"),
        meta: {
          title: "商品管理 | 購物網",
          login: true,
        },
      },
      {
        path: "membermessage",
        name: "membermessage",
        component: () =>
          import(
            /* webpackChunkName: "memberpage" */ "../views/MemberMessage.vue"
          ),
        meta: {
          title: "訊息 | 購物網",
          login: true,
        },
      },
    ],
  },
  {
    path: "/productpage",
    name: "productpage",
    component: () =>
      import(/* webpackChunkName: "productpage" */ "../views/ProductPage.vue"),
    meta: {
      title: "商品頁 | Swapper",
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const user = store.getters["user"];
  if (to.meta.login && !user.isLogin) {
    next("/");
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
