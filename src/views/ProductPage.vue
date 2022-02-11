<template>
  <div class="productpage">
    <div class="mt-16 mx-16">
      <v-breadcrumbs :items="address" large></v-breadcrumbs>
      <v-row class="mt-8 mx-16">
        <v-col
          ><v-img
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            width="500"
          ></v-img
        ></v-col>
        <v-col
          ><v-list flat>
            <v-subheader class="text-h4 mb-8">商品內容</v-subheader>
            <v-list-item v-for="(item, index) in product" :key="item">
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-h6"
                  >{{ index }}:{{ item }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list></v-col
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
                  height="400"
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

              <v-card-title> Top western road trips </v-card-title>

              <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
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
    product: {
      商品名稱: "無敵風火輪",
      分類: "家電",
      商品新舊: "全新",
      以物易物: "是",
      數量: "1",
      交換對象: "iPhone 13 pro max 1TB",
    },
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
  }),
  methods: {},
};
</script>
