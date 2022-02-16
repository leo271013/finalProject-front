<template>
  <div class="memberpost text-center">
    <v-btn color="success" class="mb-4" @click="productupload">
      商品上架
    </v-btn>
    <div class="content">
      <div class="mx-16">
        <v-row class="mt-8">
          <v-col>
            <img-inputer
              class="inputer"
              accept="image/*"
              v-model="productImg"
              theme="light"
              bottom-text="點選或拖拽圖片以修改"
              hover-text="點選或拖拽圖片以修改"
              placeholder="點選或拖拽圖片"
              :max-size="1024"
              exceed-size-text="檔案大小不能超過"
            ></img-inputer
          ></v-col>
          <v-col
            ><v-list flat>
              <v-subheader class="text-h4">商品內容</v-subheader>
              <v-list-item
                v-for="item in product"
                :key="item"
                class="text-left"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-h6"
                    >{{ item.class }}
                    <span v-show="!item.edit" class="success--text">
                      {{ item.value }}
                      <v-btn
                        text
                        small
                        fab
                        dark
                        color="success"
                        @click="item.edit = true"
                        v-if="
                          item.class == '商品名稱:' || item.class == '交換對象:'
                        "
                      >
                        <v-icon dark> mdi-pencil </v-icon>
                      </v-btn>
                      <v-select
                        v-if="
                          item.class != '商品名稱:' && item.class != '交換對象:'
                        "
                        v-model="item.choose"
                        :items="item.item"
                        label="請選擇"
                        single-line
                        dense
                        outlined
                        item-color="success"
                        color="success"
                        class="d-inline-block"
                      ></v-select>
                    </span>
                    <v-text-field
                      v-show="item.edit"
                      :label="item.name"
                      @keyup.enter="item.edit = false"
                      v-model="item.value"
                      v-if="
                        item.class == '商品名稱:' || item.class == '交換對象:'
                      "
                    >
                      <v-btn
                        height="22"
                        width="22"
                        icon
                        slot="append"
                        @click="item.edit = false"
                        class="mx-2"
                        color="success"
                      >
                        <v-icon>mdi-check</v-icon>
                      </v-btn></v-text-field
                    ></v-list-item-title
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
              <v-card flat class="mx-auto">
                <v-card-title class="text-h4">商品介紹</v-card-title>
                <v-card flat class="mx-auto" width="600">
                  <v-carousel
                    cycle
                    height="400"
                    hide-delimiter-background
                    show-arrows-on-hover
                  >
                    <v-carousel-item
                      v-for="(item, i) in pics"
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
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MemberPost",
  data: () => ({
    product: [
      { class: "商品名稱:", name: "請輸入商品名稱", edit: false, value: "" },
      {
        class: "分類:",
        edit: false,
        item: [
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
        choose: "",
      },
      {
        class: "商品新舊:",
        edit: false,
        item: ["全新", "二手"],
        choose: "",
      },
      {
        class: "以物易物:",
        edit: false,
        item: ["是", "否(無償贈送)"],
        choose: "",
      },
      {
        class: "數量:",
        edit: false,
        item: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        choose: "",
      },
      { class: "交換對象:", name: "請輸入交換對象", edit: false, value: "" },
    ],
    pics: [
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
    select: { state: "請選擇項目", abbr: "FL" },
    items: [
      { state: "Florida" },
      { state: "Georgia" },
      { state: "Nebraska" },
      { state: "California" },
      { state: "New York" },
    ],
    productImg: "",
  }),
  methods: {
    productupload() {
      const data = {
        name: this.product[0].value,
        class: this.product[1].choose,
        state: this.product[2].choose,
        image: this.productImg,
        barter: this.product[3].choose,
        quantity: this.product[4].choose,
        goal: this.product[5].choose,
      };
      alert(data);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 70vh;
  overflow-y: scroll;
  background: rgba(202, 131, 0, 0.103);
}
.inputer {
  width: 400px;
  height: 400px;
}
</style>
