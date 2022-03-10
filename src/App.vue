<template>
  <v-app>
    <div id="bg" class="px-xl-16 pt-10">
      <v-app-bar
        elevation="1"
        fixed
        src="~./assets/bar.svg"
        :height="Appheight"
      >
        <v-app-bar-nav-icon
          dark
          @click="drawer = true"
          class="d-sm-none"
        ></v-app-bar-nav-icon>
        <router-link class="logo mt-sm-6" to="/"
          ><v-img src="~./assets/logo.svg" alt="logo" contain
        /></router-link>
        <v-dialog
          v-model="dialog"
          :close-on-content-click="false"
          :max-width="'30vh'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-tabs
              right
              hide-slider
              dark
              height="80"
              class="mt-6 d-none d-sm-block"
              active-class="fontColor"
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab class="px-md-6" to="/"> <h2>商品</h2> </v-tab>
              <v-tab class="px-md-6" to="/grouppage" disabled>
                <h2>團體募集</h2>
              </v-tab>

              <v-tab
                class="px-md-6 none"
                v-bind="attrs"
                v-on="on"
                v-show="!user.isLogin"
              >
                <h2>會員登入</h2>
              </v-tab>

              <v-menu
                bottom
                offset-y
                open-on-hover
                :close-on-click="true"
                :close-on-content-click="true"
                v-if="user.isLogin"
                transition="fade-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-tab
                    class="px-md-6"
                    v-bind="attrs"
                    v-on="on"
                    to="/memberpage"
                  >
                    <h2>會員專區</h2>
                  </v-tab>
                </template>
                <v-list class="text-center py-0">
                  <v-list-item-group>
                    <span v-for="(list, index) in lists" :key="index">
                      <v-list-item
                        v-if="index == 3"
                        @click="logout"
                        class="red--text"
                      >
                        <v-list-item-title>{{
                          lists[index].name
                        }}</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        v-else
                        :to="lists[index].url"
                        class="orange--text text--darken-2"
                      >
                        <v-list-item-title>{{
                          lists[index].name
                        }}</v-list-item-title>
                      </v-list-item>
                      <v-divider v-if="index == 2"></v-divider>
                    </span>
                  </v-list-item-group>
                </v-list>
              </v-menu>
              <v-tab class="px-md-6" to="/about"> <h2>關於我們</h2> </v-tab>
            </v-tabs>
          </template>

          <v-card class="pa-2 pa-sm-8 text-center">
            <h2
              v-show="logining"
              class="animate__animated animate__fadeIn animate__fast"
            >
              會員登入
            </h2>
            <h2
              v-show="!logining"
              class="animate__animated animate__fadeIn animate__fast"
            >
              會員註冊
            </h2>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              v-show="logining"
              @submit.prevent="login"
              class="animate__animated animate__fadeIn animate__fast"
            >
              <v-text-field
                v-model="form.account"
                :counter="20"
                :rules="accountRules"
                label="帳號"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                :rules="passwordRules"
                label="密碼"
                required
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                counter
                @click:append="show = !show"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                outlined
                rounded
                color="orange"
                class="ma-4"
                @click="accountvalidate, (dialog = false)"
                type="submit"
              >
                登入
              </v-btn>
              <br />

              <v-btn text color="error" @click="logining = false">
                還沒有帳號? 立即註冊
              </v-btn>
            </v-form>
            <v-form
              ref="form2"
              v-model="valid"
              lazy-validation
              v-show="!logining"
              @submit.prevent="register"
              class="animate__animated animate__fadeIn animate__fast"
            >
              <v-text-field
                v-model="form2.account"
                :counter="20"
                :rules="accountRules"
                label="帳號"
                required
              ></v-text-field>

              <v-text-field
                v-model="form2.password"
                :rules="passwordRules"
                label="密碼"
                required
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                counter
                @click:append="show = !show"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                outlined
                rounded
                color="orange"
                class="ma-4"
                @click="accountvalidate2"
                type="submit"
              >
                註冊
              </v-btn>
              <br />
              <v-btn text color="error" @click="logining = true">
                已有帳號? 立即登入
              </v-btn>
            </v-form>
          </v-card>
        </v-dialog>

        <v-spacer></v-spacer>

        <VueToggles
          :value="isToggled"
          @click="turnOn"
          width="50"
          checked-text=" 🌛 "
          unchecked-text=" 🌞 "
          checkedBg="blue"
          uncheckedBg="white"
          class="right ml-md-8 ml-sm-2 pr-12"
        />
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="pink--text text--accent-4"
          >
            <v-list-item to="/" exact>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>商品</v-list-item-title>
            </v-list-item>

            <v-list-item to="/grouppage" disabled exact>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>團體募集</v-list-item-title>
            </v-list-item>

            <v-list-item v-show="!user.isLogin" @click="open" inactive>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>會員登入</v-list-item-title>
            </v-list-item>

            <v-list-item v-show="user.isLogin" to="/memberpage" exact>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>會員專區</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-show="user.isLogin"
              class="red--text"
              @click="logout"
            >
              <v-list-item-icon>
                <v-icon color="red">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>會員登出</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="px-4">
          <v-img
            class="mt-16 mb-6"
            src="~./assets/oldlogo.svg"
            alt="logo"
            contain
          />
          <p>「Swapper 絲滑易物」為一手、二手物品的交流平台</p>
          <p class="mt-16 font-italic font-weight-thin">
            「你眼中的垃圾，可能是別人眼中的寶貝」
          </p>
          <p class="text-center mt-4">
            聯絡管理員: <a href="mailto:majaja@gmail.com">majaja@gmail.com</a>
          </p>
        </div>
      </v-navigation-drawer>
      <template>
        <div class="text-center">
          <v-snackbar
            top
            :color="sColor"
            v-model="snackbar"
            multi-line
            timeout="1500"
            transition="scale-transition"
            class="mt-16"
          >
            <h3 class="ml-4">{{ sText }}</h3>
            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue lighten-5"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar
            top
            color="red"
            multi-line
            v-model="snackbar3"
            timeout="1500"
            transition="scale-transition"
            class="mt-16"
          >
            <h3 class="ml-4">已登出</h3>
            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue lighten-5"
                text
                v-bind="attrs"
                @click="snackbar3 = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </template>
      <template>
        <div class="text-center">
          <v-snackbar
            top
            :color="reColor"
            multi-line
            v-model="snackbar2"
            timeout="1500"
            transition="scale-transition"
            class="mt-16"
          >
            <h3 class="ml-4">{{ reText }}</h3>
            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue lighten-5"
                text
                v-bind="attrs"
                @click="snackbar2 = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </template>
      <v-main class="mt-sm-8">
        <router-view />
      </v-main>
    </div>
    <v-footer padless color="white" class="bottom black--text" width="100%">
      <v-col class="text-center footer" cols="12">
        Copyright © {{ new Date().getFullYear() }} <strong>Swapper</strong>. All
        rights reserved. 版權所有© {{ new Date().getFullYear() }}
        <strong>Swapper</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: null,
    Appheight: 110,
    valid: true,
    form: {
      account: "",
      password: "",
    },
    form2: {
      account: "",
      password: "",
    },
    accountRules: [
      (v) => !!v || "請輸入帳號",
      (v) => (v && v.length <= 10) || "帳號需介於4~20個字元之間",
      (v) => (v && v.length >= 4) || "帳號需介於4~20個字元之間",
    ],
    passwordRules: [(v) => !!v || "請輸入密碼"],
    isToggled: false,
    logining: true,
    lists: [
      { name: "商品刊登", url: "/memberpage/memberpost" },
      { name: "上架商品編輯", url: "/memberpage/postedit" },
      { name: "訊息", url: "/memberpage/membermessage" },
      { name: "會員登出" },
    ],
    show: false,
    snackbar: false,
    snackbar2: false,
    snackbar3: false,
    reText: "",
    reColor: "",
    dialog: false,
    state: "",
  }),
  methods: {
    open() {
      this.dialog = true;
      this.drawer = false;
    },
    accountvalidate() {
      this.$refs.form.validate();
    },
    accountvalidate2() {
      this.$refs.form2.validate();
    },
    turnOn() {
      this.isToggled = !this.isToggled;
      if (this.isToggled === true) {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    },
    async register() {
      const valid = this.$refs.form2.validate();
      if (!valid) return;
      try {
        await this.api.post("/users", this.form2);
        this.reText = "註冊成功";
        this.reColor = "success";
        this.snackbar2 = true;
        this.logining = true;
      } catch (error) {
        this.reText = "帳號重複";
        this.reColor = "red";
        this.snackbar2 = true;
      }
    },
    login() {
      this.$store.dispatch("login", this.form);
      this.snackbar = true;
    },
    logout() {
      this.$store.dispatch("logout");
      this.snackbar3 = true;
    },
    myEventHandler() {
      if (window.innerWidth <= 450) {
        this.Appheight = 50;
      } else {
        this.Appheight = 110;
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    sColor() {
      return this.$store.state.sColor;
    },
    sText() {
      return this.$store.state.sText;
    },
  },
  async created() {
    this.$store.dispatch("getInfo");
    window.addEventListener("resize", this.myEventHandler);
    if (window.innerWidth <= 450) {
      this.Appheight = 50;
    } else {
      this.Appheight = 110;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
};
</script>
<style lang="scss" scoped>
.logo {
  width: 220px;
  margin-left: 52px;
}
@media (max-width: 450px) {
  .logo {
    width: 170px;
  }
}
@media (max-width: 960px) {
  .bottom {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  #bg {
    overflow-x: hidden;
  }
}
@media (min-width: 960px) {
  #bg {
    height: 100%;
  }
  .line {
    border: 3px solid;
    margin-top: 60px;
    margin-left: 220px;
    margin-right: 140px;
    border-image: linear-gradient(90deg, #ff9800, #f44336) 30 30;
  }
  .logo {
    width: 300px;
    margin-left: 210px;
  }
  .right {
    margin-right: 200px;
  }
  .fontColor {
    color: white !important;
  }
  .none {
    color: rgba(255, 255, 255, 0.6) !important;
  }
  .footer {
    color: rgba(128, 128, 128, 0.582);
  }
}
</style>
