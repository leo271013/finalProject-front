<template>
  <div class="MemberInfo">
    <v-row>
      <v-col
        ><v-card
          ><v-img
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img></v-card
      ></v-col>
      <v-col>
        <h1 v-show="!edit">
          會員名稱:<br />{{ name }}
          <v-btn text small fab dark color="cyan" @click="edit = true">
            <v-icon dark> mdi-pencil </v-icon>
          </v-btn>
        </h1>
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
              v-model="aboutme"
              :rules="rules2"
            ></v-textarea>
          </v-container>
        </template> </v-col
    ></v-row>
  </div>
</template>
<script>
export default {
  name: "MemberInfo",
  data: () => ({
    name: "9527",
    edit: false,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 10 || "名稱請勿超過10個字",
    ],
    rules2: [(v) => v.length <= 50 || "關於我請勿超過50個字"],
    aboutme: "",
  }),
  methods: {},
};
</script>
