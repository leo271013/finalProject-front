<template>
  <div class="memberpage">
    <v-row v-if="user.isLogin" class="mt-8 mx-16">
      <v-col :cols="2">
        <template>
          <v-card max-width="150" class="mt-16 transparent">
            <v-list flat class="text-center py-0">
              <v-list-item-group mandatory>
                <div v-for="(item, i) in items" :key="i">
                  <v-list-item class="mb-0" :to="item.url">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="i != 3"></v-divider>
                </div>
              </v-list-item-group>
            </v-list>
          </v-card> </template
      ></v-col>
      <v-col class="pt-16"> <router-view /> </v-col>
    </v-row>
    <div v-else class="mt-8 mx-16"><h1>請先登入</h1></div>
  </div>
</template>

<script>
export default {
  name: "MemberPage",
  data: () => ({
    items: [
      { name: "會員資料修改", url: "/memberpage" },
      { name: "商品刊登", url: "/memberpage/memberpost" },
      { name: "上架商品編輯", url: "/memberpage/postedit" },
      { name: "訊息", url: "/memberpage/membermessage" },
    ],
    searchtext: "",
  }),
  methods: {
    search() {
      alert(this.searchtext);
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
