<template>
  <v-app>
    <div>
      <v-app-bar elevation="0" color="transparent">
        <router-link to="/"
          ><img src="~./assets/logo.png" alt="logo" contain height="55"
        /></router-link>

        <v-spacer></v-spacer>

        <v-dialog
          v-model="dialog"
          :close-on-content-click="false"
          :max-width="'30vh'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" x-large>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>

          <v-card class="pa-8 text-center">
            <h2>會員登入</h2>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="account"
                :counter="20"
                :rules="accountRules"
                label="帳號"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
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
                @click="login"
              >
                登入
              </v-btn>
              <br />
              <v-btn text color="error"> 還沒有帳號? 立即註冊 </v-btn>
            </v-form>
          </v-card>
        </v-dialog>
        <VueToggles
          :value="isToggled"
          @click="turnOn"
          width="50"
          checked-text=" 🌛 "
          unchecked-text=" 🌞 "
          checkedBg="orange"
          class="ml-4"
        />
      </v-app-bar>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    valid: true,
    account: "",
    accountRules: [
      (v) => !!v || "請輸入帳號",
      (v) => (v && v.length <= 10) || "帳號需介於4~20個字元之間",
      (v) => (v && v.length >= 4) || "帳號需介於4~20個字元之間",
    ],
    password: "",
    passwordRules: [(v) => !!v || "請輸入密碼"],
    isToggled: false,
  }),
  methods: {
    login() {
      this.$refs.form.validate();
    },
    turnOn() {
      this.isToggled = !this.isToggled;
      if (this.isToggled === true) {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    },
  },
};
</script>
