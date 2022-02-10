<template>
  <v-app>
    <div id="bg" class="px-xl-16 pt-10">
      <v-app-bar
        flat
        fixed
        src="~./assets/navbar2.png"
        height="150"
        color="transparent"
      >
        <router-link
          class="ml-16"
          to="/"
          :style="'filter: drop-shadow(2px 2px 1.5px gray)'"
          ><img src="~./assets/logo.png" alt="logo" contain height="145"
        /></router-link>

        <v-tabs
          id="tab"
          mobile-breakpoint
          right
          hide-slider
          show-arrows
          light
          height="80"
          class="mt-16"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab class="px-6" to="/productpage">
            <h2>商品頁(測試用)</h2>
          </v-tab>
          <v-tab class="px-6" to="/"> <h2>商品</h2> </v-tab>
          <v-tab class="px-6" to="/grouppage">
            <h2>團體募集</h2>
          </v-tab>

          <v-dialog
            v-model="dialog"
            :close-on-content-click="false"
            :max-width="'30vh'"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-tab
                class="px-6 none"
                v-bind="attrs"
                v-on="on"
                v-show="!user.isLogin"
              >
                <h2>會員登入</h2>
              </v-tab>
            </template>

            <v-card class="pa-8 text-center">
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
          <v-menu
            bottom
            offset-y
            open-on-hover
            :close-on-click="true"
            :close-on-content-click="true"
            v-if="user.isLogin"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-tab class="px-6" v-bind="attrs" v-on="on" to="/memberpage">
                <h2>會員專區</h2>
              </v-tab>
            </template>
            <v-list class="text-center py-0">
              <v-list-item-group>
                <span v-for="(list, index) in lists" :key="index">
                  <v-list-item
                    v-if="index == 2"
                    @click="logout"
                    class="red--text"
                  >
                    <v-list-item-title>{{
                      lists[index].name
                    }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-else :to="lists[index].url">
                    <v-list-item-title>{{
                      lists[index].name
                    }}</v-list-item-title>
                  </v-list-item>
                  <v-divider v-if="index == 1"></v-divider>
                </span>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <v-tab class="px-6" to="/about"> <h2>關於我們</h2> </v-tab>
        </v-tabs>

        <v-spacer></v-spacer>

        <template v-if="user.isLogin"> </template>
        <VueToggles
          :value="isToggled"
          @click="turnOn"
          width="50"
          checked-text=" 🌛 "
          unchecked-text=" 🌞 "
          checkedBg="blue"
          uncheckedBg="white"
          class="mx-8 pr-12"
        />
      </v-app-bar>
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
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
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
                color="blue"
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
                color="blue"
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
      <!-- <hr class="line" /> -->
      <v-main class="my-16 px-16">
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
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
    dialog: false,
    lists: [
      { name: "商品刊登", url: "/memberpage/memberpost" },
      { name: "訊息", url: "/memberpage/membermessage" },
      { name: "會員登出" },
    ],
    show: false,
    snackbar: false,
    snackbar2: false,
    snackbar3: false,
    reText: "",
    reColor: "",
  }),
  methods: {
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
};
</script>
<style lang="scss" scoped>
#bg {
  height: 100%;
  background: url("~./assets/test.png") fixed no-repeat top/cover;
}
.line {
  border: 3px solid;
  margin-top: 60px;
  margin-left: 220px;
  margin-right: 140px;
  border-image: linear-gradient(90deg, #ff9800, #f44336) 30 30;
}
.none {
  color: rgba(0, 0, 0, 0.54) !important;
}
</style>
