<template>
  <div class="home">
    <v-row class="mt-12 mx-8" justify="center">
      <v-col :cols="3">
        <v-text-field
          label="搜尋"
          v-model="searchtext"
          color="pink"
          class="mb-2"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" class="pa-0 colHeight"
        ><v-row>
          <v-col :cols="2">
            <template>
              <v-card max-width="120" class="ml-16">
                <v-list nav class="text-center pa-0">
                  <v-list-item-group mandatory>
                    <div v-for="(item, i) in items" :key="item[i]">
                      <v-list-item
                        class="mb-0"
                        color="pink"
                        @click="type(item)"
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
            <v-row justify="center">
              <v-col :cols="12">
                <v-row class="px-16">
                  <v-col
                    :cols="3"
                    v-for="product in search"
                    :key="product.name"
                  >
                    <template>
                      <v-card
                        max-width="250"
                        max-height="280"
                        @click="into(product)"
                        hover
                      >
                        <template slot="progress">
                          <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                          ></v-progress-linear>
                        </template>

                        <v-img height="185" :src="product.image"></v-img>

                        <v-card-title class="py-1">{{
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
      <v-col cols="12">
        <div class="mt-6">
          <v-pagination
            v-model="page"
            :length="productQ"
            color="pink"
          ></v-pagination></div
      ></v-col>
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
        this.productQ = Math.floor(this.products.length / 8) + 1;
        this.productP = [];
        if (this.products.length > 8) {
          for (let i = 0; i < 8; i++) {
            let start = (this.page - 1) * 8;
            this.productP.push(this.products[start + i]);
          }
        } else {
          for (let i = 0; i < this.products.length; i++) {
            let start = (this.page - 1) * 8;
            this.productP.push(this.products[start + i]);
          }
        }
      } else {
        try {
          const { data } = await this.api.get("/showProducts/" + name);
          this.products = data.result;
        } catch (error) {
          alert("網路錯誤");
        }
        this.productQ = Math.floor(this.products.length / 8) + 1;
        this.productP = [];
        if (this.products.length > 8) {
          for (let i = 0; i < 8; i++) {
            let start = (this.page - 1) * 8;
            this.productP.push(this.products[start + i]);
          }
        } else {
          for (let i = 0; i < this.products.length; i++) {
            let start = (this.page - 1) * 8;
            this.productP.push(this.products[start + i]);
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
    this.productQ = Math.floor(this.products.length / 8) + 1;
    if (this.products.length > 8) {
      for (let i = 0; i < 8; i++) {
        let start = (this.page - 1) * 8;
        this.productP.push(this.products[start + i]);
      }
    } else {
      for (let i = 0; i < this.products.length; i++) {
        let start = (this.page - 1) * 8;
        this.productP.push(this.products[start + i]);
      }
    }
  },
  computed: {
    search() {
      return this.products.filter((item) => {
        if (item.name.toLowerCase().includes(this.searchtext.toLowerCase())) {
          return true;
        }
      });
    },
  },
  watch: {
    page: function (newN) {
      this.productP = [];
      let start = (newN - 1) * 8;
      if (newN === 1) {
        for (let i = 0; i < 8; i++) {
          this.productP.push(this.products[start + i]);
        }
      } else {
        for (let i = 0; i < this.products.length - start; i++) {
          this.productP.push(this.products[start + i]);
        }
      }
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
.colHeight {
  height: 550px;
}
</style>
