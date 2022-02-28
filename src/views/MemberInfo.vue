<template>
  <div class="MemberInfo">
    <v-row class="pt-16">
      <v-col cols="4" class="text-center">
        <v-btn outlined @click="imgedit = !imgedit" class="my-4 mx-16">{{
          btn
        }}</v-btn>
        <v-btn
          v-show="NewuserImg.image !== '' && imgedit === true"
          @click="upload"
          class="mb-4 mx-16"
          >上傳</v-btn
        >
        <br />
        <v-card
          v-show="imgedit === false"
          outlined
          height="200"
          width="200"
          class="mx-auto"
          ><v-img width="200" height="200" :src="userImg"></v-img
        ></v-card>
        <img-inputer
          class="inputer"
          v-show="imgedit === true"
          accept="image/*"
          v-model="NewuserImg.image"
          theme="light"
          bottom-text="點選或拖拽圖片以修改"
          hover-text="點選或拖拽圖片以修改"
          placeholder="點選或拖拽圖片"
          :max-size="1024"
          exceed-size-text="檔案大小不能超過"
        ></img-inputer>
      </v-col>
      <v-col cols="6">
        <v-card flat class="pa-8">
          <v-form ref="form">
            <p v-show="!edit">
              使用者暱稱 : <br /><br /><span class="text-h3">{{
                userInfo.userName
              }}</span>
              <v-btn text small fab dark color="cyan" @click="edit = true">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </p>
            <v-text-field
              autofocus
              v-show="edit"
              :rules="rules"
              v-model="userInfo.userName"
              @keyup.enter="(edit = false), updateInfo()"
              @blur="(edit = false), updateInfo()"
            >
              <v-btn
                height="22"
                width="22"
                icon
                slot="append"
                @click="(edit = false), updateInfo()"
                @change="valid"
                plain
                class="mx-2"
                color="primary"
                :disabled="lock"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn></v-text-field
            >
            <template>
              <v-container fluid>
                <v-textarea
                  clearable
                  counter
                  clear-icon="mdi-close-circle"
                  label="關於我"
                  v-model="userInfo.aboutMe"
                  :rules="rules2"
                  @change="updateInfo()"
                ></v-textarea>
              </v-container> </template></v-form
        ></v-card> </v-col
    ></v-row>

    <v-snackbar
      top
      color="success"
      multi-line
      v-model="snackbar4"
      timeout="1500"
      transition="scale-transition"
      class="mt-16"
    >
      <h3 class="ml-4">{{ uploadText }}</h3>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue lighten-5"
          text
          v-bind="attrs"
          @click="snackbar4 = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "MemberInfo",
  data: () => ({
    edit: false,
    rules: [
      (value) => !!value || "暱稱不能為空",
      (value) => (value || "").length <= 10 || "名稱請勿超過10個字",
    ],
    rules2: [(v) => v.length <= 50 || "關於我請勿超過50個字"],
    lock: false,
    NewuserImg: { image: "" },
    imgedit: false,
    snackbar4: false,
    btn: "變更頭像",
  }),
  methods: {
    updateInfo() {
      if (this.userInfo.userName.includes("管理員")) {
        alert("請勿以「管理員」作為暱稱");
        this.userInfo.userName = "使用者";
      } else {
        this.$store.dispatch("updateInfo", this.NewuserImg);
      }
    },
    valid() {
      this.$refs.form.validate() ? (this.lock = false) : (this.lock = true);
    },
    upload() {
      this.$store.dispatch("updateInfo", this.NewuserImg);
      this.snackbar4 = true;
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    userImg() {
      return this.$store.state.userImg;
    },
    uploadText() {
      return this.$store.state.uploadText;
    },
  },
  watch: {
    imgedit: function () {
      this.imgedit ? (this.btn = "取消變更") : (this.btn = "變更頭像");
    },
  },
  updated: {
    update() {
      return this.$store.state.userImg;
    },
  },
};
</script>
<style lang="scss" scoped>
.inputer {
  width: 200px;
  height: 200px;
}
</style>
