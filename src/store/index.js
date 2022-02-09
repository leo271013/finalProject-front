import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/plugins/axios.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    account: "",
    role: 0,
    userName: "",
    aboutMe: "",
    sColor: "success",
    sText: "",
    userImg: "",
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
      state.token = data.token;
      state.account = data.account;
      state.role = data.role;
      state.userName = data.userName;
      state.aboutMe = data.aboutMe;
      state.userImg = data.userImg;
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
  },
  modules: {},
});
