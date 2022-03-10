<template>
  <div class="home">
    <v-row class="mt-sm-12 mx-sm-8 pt-sm-8 pt-md-0" justify="center">
      <v-col cols="12" class="d-md-none pb-0 pb-sm-3">
        <v-row justify="space-around">
          <v-col cols="12" class="pb-0 pb-sm-3">
            <v-sheet class="pt-4 pb-sm-4 px-1">
              <v-chip-group mandatory active-class="red--text red">
                <v-chip
                  outlined
                  v-for="tag in items"
                  :key="tag"
                  class="mx-auto"
                  @click="type(tag)"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-sheet>
          </v-col>
        </v-row></v-col
      >
      <v-col cols="8" sm="3">
        <v-text-field
          label="搜尋商品名稱"
          v-model="searchtext"
          color="pink"
          class="mb-md-2 mb-sm-8"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" class="pa-0 colHeight"
        ><v-row>
          <v-col :cols="2" class="d-none d-md-block">
            <template>
              <v-card max-width="120" class="ml-lg-16">
                <v-list nav flat class="text-center pa-0">
                  <v-list-item-group mandatory>
                    <div v-for="(item, i) in items" :key="item[i]">
                      <v-list-item
                        class="mb-0"
                        color="pink"
                        @click="type(item)"
                        active-class="select"
                      >
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
            <v-row>
              <v-col :cols="12" class="overflow-auto">
                <v-row class="px-lg-16">
                  <v-col
                    sm="4"
                    :lg="3"
                    v-for="product in search"
                    :key="product.name"
                    class="d-flex d-sm-block justify-center"
                  >
                    <template>
                      <v-card
                        max-width="250"
                        height="280"
                        @click="into(product)"
                        hover
                        class="overflow-hidden"
                      >
                        <template slot="progress">
                          <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                          ></v-progress-linear>
                        </template>

                        <v-img height="185" :src="product.image"></v-img>

                        <v-card-title class="py-1 font-weight-bold">{{
                          product.name
                        }}</v-card-title>

                        <v-card-text>{{ product.introTitle }}</v-card-text>
                      </v-card>
                    </template></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-col></v-row
        ></v-col
      >
      <v-col cols="12" class="mt-sm-4">
        <div class="mt-md-6 mt-sm-12 mb-sm-8 mb-md-0 d-none d-sm-block">
          <v-pagination
            v-model="page"
            :length="productQ"
            color="pink"
          ></v-pagination>
        </div>
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
    productQ: 1,
    productP: [],
    page: 1,
    products: [],
  }),
  methods: {
    async type(name) {
      if (name === "全部") {
        try {
          const { data } = await this.api.get("/showProducts");
          this.products = data.result;
        } catch (error) {
          alert("網路錯誤");
        }
        if (window.innerWidth <= 960) {
          if (this.products.length > 6) {
            this.productQ = Math.floor(this.search.length / 6) + 1;
          } else {
            this.productQ = 1;
          }
        } else {
          if (this.products.length > 8) {
            this.productQ = Math.floor(this.search.length / 8) + 1;
          } else {
            this.productQ = 1;
          }
        }
      } else {
        try {
          const { data } = await this.api.get("/showProducts/" + name);
          this.products = data.result;
        } catch (error) {
          alert("網路錯誤");
        }
        if (window.innerWidth <= 960) {
          if (this.products.length > 6) {
            this.productQ = Math.floor(this.search.length / 6) + 1;
          } else {
            this.productQ = 1;
          }
        } else {
          if (this.products.length > 8) {
            this.productQ = Math.floor(this.search.length / 8) + 1;
          } else {
            this.productQ = 1;
          }
        }
      }
    },
    into(e) {
      this.$store.commit("into", e);
    },
  },
  async created() {
    try {
      const { data } = await this.api.get("/showProducts");
      this.products = data.result;
    } catch (error) {
      alert("網路錯誤");
    }
    if (window.innerWidth <= 960) {
      if (this.products.length > 6) {
        this.productQ = Math.floor(this.search.length / 6) + 1;
      } else {
        this.productQ = 1;
      }
    } else {
      if (this.products.length > 8) {
        this.productQ = Math.floor(this.search.length / 8) + 1;
      } else {
        this.productQ = 1;
      }
    }
  },
  computed: {
    search() {
      let searching = this.products.filter((item) => {
        if (item.name.toLowerCase().includes(this.searchtext.toLowerCase())) {
          return true;
        }
      });
      return searching.filter((item, index) => {
        if (window.innerWidth <= 450) {
          return true;
        } else if (window.innerWidth <= 960) {
          if (searching.length < 6) {
            return true;
          } else if (
            searching.length >= 6 &&
            index >= (this.page - 1) * 6 &&
            index < (this.page - 1) * 6 + 6
          ) {
            return true;
          }
        } else {
          if (searching.length < 8) {
            return true;
          } else if (
            searching.length >= 8 &&
            index >= (this.page - 1) * 8 &&
            index < (this.page - 1) * 8 + 8
          ) {
            return true;
          }
        }
      });
    },
  },
  watch: {
    search: function (newV, oldV) {
      if (this.searchtext !== "") {
        if (window.innerWidth <= 960) {
          if (this.products.length > 6) {
            this.productQ = Math.floor(this.search.length / 6) + 1;
          } else {
            this.productQ = 1;
          }
        } else {
          if (this.products.length > 8) {
            this.productQ = Math.floor(this.search.length / 8) + 1;
          } else {
            this.productQ = 1;
          }
        }
      } else if (newV > oldV && this.searchtext === "") {
        if (window.innerWidth <= 960) {
          if (this.products.length > 6) {
            this.productQ = Math.floor(this.search.length / 6) + 1;
          } else {
            this.productQ = 1;
          }
        } else {
          if (this.products.length > 8) {
            this.productQ = Math.floor(this.search.length / 8) + 1;
          } else {
            this.productQ = 1;
          }
        }
      }
    },
    searchtext: function () {
      this.page = 1;
    },
  },
};
</script>
<style lang="scss">
.transparent {
  background: transparent;
}
.white {
  color: white !important;
}
.select {
  border-left: 10px solid #e91e63;
}
@media (min-width: 960px) {
  .colHeight {
    height: 565px;
  }
}
@media (max-width: 960px) {
  .colHeight {
    height: 565px;
  }
}
</style>
