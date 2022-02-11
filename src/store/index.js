import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/plugins/axios.js";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    token: "",
    account: "",
    role: 0,
    userInfo: { userName: "", aboutMe: "" },
    sColor: "",
    sText: "",
    userImg: { userImg: "" },
  },
  getters: {
    user(state) {
      return {
        isLogin: state.token.length > 0,
        isAdmin: state.role === 1,
        ...state,
      };
    },
  },
  mutations: {
    login(state, data) {
      state.userId = data._id;
      state.token = data.token;
      state.account = data.account;
      state.role = data.role;
      state.userInfo.userName = data.userName;
      state.userInfo.aboutMe = data.aboutMe;
      state.userImg.userImg = data.userImg;
    },
    logout(state) {
      state.userId = "";
      state.token = "";
      state.account = "";
      state.role = 0;
      state.userInfo.userName = "";
      state.userInfo.aboutMe = "";
      state.userImg.userImg = "";
    },
  },
  actions: {
    async login({ commit, state }, form) {
      try {
        const { data } = await api.post("/users/login", form);
        commit("login", data.result);
        state.sColor = "success";
        state.sText = "登入成功";
      } catch (error) {
        state.sColor = "red";
        state.sText = "帳號或密碼錯誤";
      }
    },
    async updateInfo({ state }) {
      try {
        await api.patch(`/users/${state.userId}`, state.userInfo);
      } catch (_) {
        _;
      }
    },
    async logout({ commit, state }) {
      try {
        await api.delete("/users/logout", {
          headers: {
            authorization: "Bearer " + state.token,
          },
        });
        commit("logout");
        router.push("/");
      } catch (_) {
        _;
      }
    },
  },
  modules: {},
});
