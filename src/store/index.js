import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/plugins/axios.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    token: "",
    account: "",
    role: 0,
    userInfo: { userName: "", aboutMe: "", image: "" },
    userImg: "",
    sColor: "",
    sText: "",
    uploadText: "上傳成功，請稍後重新整理頁面",
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
      state.userImg = data.image;
    },
    logout(state) {
      state.userId = "";
      state.token = "";
      state.account = "";
      state.role = 0;
      state.userInfo.userName = "";
      state.userInfo.aboutMe = "";
      state.userImg = "";
    },
    getInfo(state, data) {
      state.userId = data._id;
      state.account = data.account;
      state.role = data.role;
      state.userInfo.userName = data.userName;
      state.userInfo.aboutMe = data.aboutMe;
      state.userImg = data.image;
    },
    extend(state, data) {
      state.token = data;
    },
    uploadimg(state, data) {
      state.userInfo.image = data.image;
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
    async updateInfo({ state }, data) {
      this.commit("uploadimg", data);
      const fd = new FormData();
      for (const key in state.userInfo) {
        if (key !== "_id") {
          fd.append(key, state.userInfo[key]);
        }
      }
      try {
        const { data } = await api.patch("/users/" + state.userId, fd, {
          headers: {
            authorization: "Bearer " + state.token,
          },
        });
        state.userInfo[state.userInfo.index] = {
          ...state.userInfo,
          image: data.result.image,
        };
      } catch (error) {
        console.log(error);
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
      } catch (_) {
        _;
      }
    },
    async getInfo({ commit, state }) {
      if (state.token.length === 0) return;
      try {
        const { data } = await api.get("/users/me", {
          headers: {
            authorization: "Bearer " + state.token,
          },
        });
        commit("getInfo", data.result);
      } catch (error) {
        commit("logout");
      }
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: "user",
      paths: ["token"],
    }),
  ],
});
