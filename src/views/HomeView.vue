<template>
  <div class="home">
    <v-row class="mt-8 mx-16">
      <v-col :cols="1">
        <template>
          <v-card max-width="100" class="mt-16 transparent">
            <v-list flat nav class="text-center transparent">
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
        <v-row justify="center" no-gutters>
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
            </v-text-field></v-col
          >
          <v-col :cols="11">
            <v-row>
              <v-col :cols="3" v-for="n in 8" :key="n">
                <template>
                  <v-card
                    :loading="loading"
                    class="mx-auto"
                    max-width="374"
                    hover
                  >
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                      ></v-progress-linear>
                    </template>

                    <v-img
                      height="250"
                      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    ></v-img>

                    <v-card-title>Cafe Badilico</v-card-title>

                    <!-- <v-card-text>
                      <v-row align="center" class="mx-0">
                        <v-rating
                          :value="4.5"
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="14"
                        ></v-rating>

                        <div class="grey--text ms-4">4.5 (413)</div>
                      </v-row>

                      <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

                      <div>
                        Small plates, salads & sandwiches - an intimate setting
                        with 12 indoor seats plus patio seating.
                      </div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                      <v-chip-group
                        v-model="selection"
                        active-class="deep-purple accent-4 white--text"
                        column
                      >
                        <v-chip>5:30PM</v-chip>

                        <v-chip>7:30PM</v-chip>

                        <v-chip>8:00PM</v-chip>

                        <v-chip>9:00PM</v-chip>
                      </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                        color="deep-purple lighten-2"
                        text
                        @click="reserve"
                      >
                        Reserve
                      </v-btn>
                    </v-card-actions> -->
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
