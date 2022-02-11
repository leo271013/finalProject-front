<template>
  <div class="home">
    <v-row class="mt-8 mx-8">
      <v-col :cols="2">
        <template>
          <v-card max-width="150" class="mt-16 ml-16 transparent">
            <v-list flat nav class="text-center pa-0 transparent">
              <v-list-item-group mandatory color="red">
                <div v-for="(item, i) in items" :key="i">
                  <v-list-item class="mb-0">
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="item != '衣鞋包錶'"></v-divider>
                </div>
              </v-list-item-group>
            </v-list>
          </v-card> </template
      ></v-col>
      <v-col>
        <v-row justify="center">
          <v-col :cols="3">
            <v-text-field
              label="搜尋"
              clearable="true"
              v-model="searchtext"
              color="orange"
              @keyup.enter="search"
            >
              <v-btn
                height="22"
                width="22"
                icon
                slot="append"
                @click="search"
                plain
                class="mx-2"
                color="orange"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-text-field>
          </v-col>
          <v-col :cols="11">
            <v-row>
              <v-col :cols="3" v-for="n in 8" :key="n">
                <template>
                  <v-card max-width="230" hover>
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                      ></v-progress-linear>
                    </template>

                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    ></v-img>

                    <v-card-title>Cafe Badilico {{ n }}</v-card-title>

                    <v-card-text
                      >新手全身文明委託一口氣不需要顯集反饋戰爭之間無聊和平島。
                    </v-card-text>
                  </v-card>
                </template></v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data: () => ({
    items: [
      "全部",
      "電腦",
      "電腦周邊",
      "通訊",
      "數位",
      "家電",
      "日用",
      "生活",
      "運動戶外",
      "美妝",
      "衣鞋包錶",
    ],
    searchtext: "",
  }),
  methods: {
    search() {
      if (this.searchtext.length != 0) {
        alert(this.searchtext);
      }
    },
  },
};
</script>
<style lang="scss">
.transparent {
  background: transparent;
}
</style>
