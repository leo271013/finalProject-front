<template>
  <div class="productpage ml-16 pl-8">
    <div class="mt-16 mx-16 pl-16">
      <v-breadcrumbs :items="address" large></v-breadcrumbs>
      <v-row class="mt-8 ml-8">
        <v-col><v-img :src="img" width="500"></v-img></v-col>
        <v-col
          ><v-list flat>
            <v-subheader class="text-h4 mb-8">商品內容</v-subheader>
            <v-list-item v-for="item in product" :key="item.title">
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-h6"
                  >{{ item.title }} : {{ item.content }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn x-large color="success" class="mt-16 mx-8">聯絡賣家</v-btn
          ><v-btn v-if="!user.isAdmin" outlined color="red" class="mt-16"
            >檢舉</v-btn
          ><v-btn v-if="user.isAdmin" outlined color="red" class="mt-16"
            >下架</v-btn
          ></v-col
        >
      </v-row>
      <v-divider class="my-12"></v-divider>
      <v-row>
        <v-col>
          <template>
            <v-card flat class="mx-auto transparent">
              <v-card-title class="text-h4">商品介紹</v-card-title>
              <v-card flat class="mx-auto" width="600">
                <v-carousel
                  cycle
                  hide-delimiter-background
                  show-arrows-on-hover
                >
                  <v-carousel-item
                    v-for="(item, i) in items"
                    :key="i"
                    :src="item.src"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  ></v-carousel-item> </v-carousel
              ></v-card>

              <v-card-title> {{ title }} </v-card-title>

              <v-card-text>
                {{ content }}
              </v-card-text>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductPage",
  data: () => ({
    product: [
      { title: "商品名稱", content: "" },
      { title: "分類", content: "" },
      { title: "商品新舊", content: "" },
      { title: "以物易物", content: "" },
      { title: "數量", content: "" },
      { title: "交換對象", content: "" },
    ],
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
    address: [
      {
        text: "全部",
        to: "/",
      },
      {
        text: "",
        to: "/",
      },
    ],
    title: "",
    content: "",
    img: "",
  }),
  methods: {},
  computed: {
    products() {
      return this.$store.state.product;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  async mounted() {
    this.product[0].content = this.products.name;
    this.product[1].content = this.products.class;
    this.product[2].content = this.products.state;
    this.product[3].content = this.products.barter;
    this.product[4].content = this.products.quantity;
    this.product[5].content = this.products.goal;
    this.title = this.products.introTitle;
    this.content = this.products.introContent;
    this.img = this.products.image;
    this.items[0].src = this.products.image;
  },
  updated() {},
};
</script>
