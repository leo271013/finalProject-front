<template>
  <v-app>
    <div class="px-16 pt-16">
      <v-app-bar elevation="0" color="transparent" class="px-16">
        <router-link to="/"
          ><img src="~./assets/logo.png" alt="logo" contain height="150"
        /></router-link>
        <v-tabs
          id="tab"
          mobile-breakpoint
          right
          color="amber darken-4"
          slider-size="1"
          show-arrows
          background-color="transparent"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab class="px-6" to="/"> <h2>商品</h2> </v-tab>
          <v-tab class="px-6" to="/grouppage"> <h2>團體募集</h2> </v-tab>
          <v-tab class="px-6" to="/memberpage"> <h2>會員專區</h2> </v-tab>
          <v-tab class="px-6" to="/about"> <h2>關於我們</h2> </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>

        <v-dialog
          v-model="dialog"
          :close-on-content-click="false"
          :max-width="'30vh'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              icon
              v-bind="attrs"
              v-on="on"
              color="pink"
              class="ml-12"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>

          <v-card class="pa-8 text-center">
            <h2 v-show="logining">會員登入</h2>
            <h2 v-show="!logining">會員註冊</h2>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              v-show="logining"
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
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                outlined
                rounded
                color="orange"
                class="ma-4"
                @click="accountvalidate"
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
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                outlined
                rounded
                color="orange"
                class="ma-4"
                @click="accountvalidate, register"
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
        <VueToggles
          :value="isToggled"
          @click="turnOn"
          width="50"
          checked-text=" 🌛 "
          unchecked-text=" 🌞 "
          checkedBg="blue"
          uncheckedBg="orange"
          class="ml-12 pr-12"
        />
      </v-app-bar>
      <v-main class="px-16 mt-16">
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
  }),
  methods: {
    accountvalidate() {
      this.$refs.form.validate();
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
      console.log("yes");
      const valid = this.$refs.form2.validate();
      if (!valid) return;
      try {
        await this.api.post("/users", this.form2);
        console.log("yes2");
        // this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
