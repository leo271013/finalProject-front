import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/plugins/axios.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    account: "",
    role: 0,
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
      state.email = data.email;
      state.cart = data.cart;
    },
  },
  actions: {
    async login({ commit }, form) {
      try {
        const { data } = await api.post("/users/login", form);
        commit("login", data.result);
        alert("登入成功");
      } catch (error) {
        alert("失敗");
      }
    },
  },
  modules: {},
});
