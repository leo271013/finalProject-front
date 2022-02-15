<template>
  <div class="MemberInfo">
    <v-row class="pt-16">
      <v-col cols="4">
        <v-card
          v-show="imgedit === false"
          outlined
          height="200"
          width="200"
          class="mx-auto"
          @click.native="upload"
          ><v-img width="200" height="200" :src="userInfo.image"></v-img
        ></v-card>
        <img-inputer
          v-show="imgedit === true"
          @change="onFileChange(e)"
          accept="image/*"
          v-model="NewuserImg.image"
          theme="light"
          size="large"
          bottom-text="點選或拖拽圖片以修改"
          hover-text="點選或拖拽圖片以修改"
          placeholder="點選或拖拽選擇圖片"
          :max-size="1024"
          exceed-size-text="檔案大小不能超過"
        ></img-inputer>
        <v-btn @click="imgedit = !imgedit">變更頭像</v-btn>
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
    <v-btn @click="ch">改變</v-btn>
    <v-btn @click="upload">上傳</v-btn>
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
  }),
  methods: {
    updateInfo() {
      this.$store.dispatch("updateInfo");
    },
    valid() {
      this.$refs.form.validate() ? (this.lock = false) : (this.lock = true);
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    upload() {
      this.$store.dispatch("updateInfo");
    },
    ch() {
      this.$store.commit("uploadimg", this.NewuserImg);
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>
