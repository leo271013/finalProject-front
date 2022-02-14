<template>
  <div class="MemberInfo">
    <v-row class="pt-16">
      <v-col cols="4">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-card
              height="200"
              width="200"
              class="mx-auto"
              v-bind="attrs"
              v-on="on"
              hover
              @click="upload"
              ><v-img width="200" height="200" :src="userImg.userImg"></v-img
            ></v-card>
          </template>
          <span>點擊上傳圖片</span>
        </v-tooltip></v-col
      >
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
    show: false,
  }),
  methods: {
    upload() {
      this.$store.dispatch("upload");
    },
    updateInfo() {
      console.log("hey");
      this.$store.dispatch("updateInfo");
    },
    valid() {
      this.$refs.form.validate() ? (this.lock = false) : (this.lock = true);
    },
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    userImg() {
      return this.$store.state.userImg;
    },
  },
};
</script>
