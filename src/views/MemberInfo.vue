<template>
  <div class="MemberInfo">
    <v-row class="pt-16">
      <v-col cols="4">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-card
              height="300"
              width="300"
              class="mx-auto"
              v-bind="attrs"
              v-on="on"
              hover
              @click="upload"
              ><v-img width="300" height="300" :src="userImg"></v-img
            ></v-card>
          </template>
          <span>點擊上傳圖片</span>
        </v-tooltip></v-col
      >
      <v-col cols="6">
        <v-card flat class="pa-8">
          <p v-show="!edit">
            使用者暱稱 : <br /><br /><span class="text-h3">{{ userName }}</span>
            <v-btn text small fab dark color="cyan" @click="edit = true">
              <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
          </p>
          <v-text-field
            v-show="edit"
            :rules="rules"
            v-model="name"
            @keyup.enter="edit = false"
          >
            <v-btn
              height="22"
              width="22"
              icon
              slot="append"
              @click="edit = false"
              plain
              class="mx-2"
              color="primary"
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
                v-model="aboutMe"
                :rules="rules2"
              ></v-textarea>
            </v-container> </template
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
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 10 || "名稱請勿超過10個字",
    ],
    rules2: [(v) => v.length <= 50 || "關於我請勿超過50個字"],
  }),
  methods: {
    upload() {
      alert("up");
    },
  },
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    aboutMe() {
      return this.$store.state.aboutMe;
    },
    userImg() {
      return this.$store.state.userImg;
    },
  },
};
</script>
