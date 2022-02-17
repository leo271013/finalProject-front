<template>
  <div class="PostEdit">
    <v-card class="mt-16">
      <v-toolbar dark flat shaped color="blue">
        <v-toolbar-title>上架商品編輯</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-dialog v-model="dialog" width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-list flat subheader three-line>
            <v-subheader>商品列表</v-subheader>
            <div
              v-for="(productItem, index) in products"
              :key="productItem.name"
            >
              <v-list-item>
                <img width="100" :src="productItem.image" class="mr-8" />
                <v-list-item-content>
                  <v-list-item-title class="text-h6">{{
                    productItem.name
                  }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    outlined
                    color="light-green"
                    class="mt-3"
                    v-bind="attrs"
                    v-on="on"
                    @click="edit(index)"
                  >
                    編輯
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action v-if="productItem.sale">
                  <v-btn color="error" class="mt-3"> 下架 </v-btn>
                </v-list-item-action>
                <v-list-item-action v-else>
                  <v-btn color="success" class="mt-3"> 上架 </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </v-list>
        </template>
        <v-card>
          <div class="mx-16 pt-8 text-center">
            <v-form ref="bigform" v-model="valid">
              <v-row>
                <v-col cols="12" class="text-center">
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
                      :key="item.class"
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
                                item.class == '商品名稱:' ||
                                item.class == '交換對象:'
                              "
                            >
                              <v-icon dark> mdi-pencil </v-icon>
                            </v-btn>
                            <v-select
                              v-if="
                                item.class != '商品名稱:' &&
                                item.class != '交換對象:'
                              "
                              :rules="[(v) => !!v || '請選擇項目']"
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
                            :rules="Rules"
                            v-if="
                              item.class == '商品名稱:' ||
                              item.class == '交換對象:'
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
                    <v-card flat class="mx-auto mb-16">
                      <v-card-title class="text-h4">商品介紹</v-card-title>
                      <v-card flat class="mb-16" height="400" width="600">
                        <v-carousel
                          height="400"
                          width="600"
                          cycle
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
                      <br />
                      <v-textarea
                        counter
                        clear-icon="mdi-close-circle"
                        label="請輸入小標題"
                        height="1"
                        v-model="title"
                        class="mt-16"
                        :rules="Rules"
                      ></v-textarea>

                      <v-textarea
                        counter
                        clear-icon="mdi-close-circle"
                        label="商品內容介紹"
                        :rules="Rules"
                        v-model="content"
                      ></v-textarea>
                    </v-card>
                  </template>
                </v-col>
              </v-row>
              <v-snackbar
                top
                :color="reColor"
                multi-line
                v-model="snackbar2"
                timeout="1500"
                transition="scale-transition"
                class="mt-16"
              >
                <h3 class="ml-4">{{ reText }}</h3>
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="blue lighten-5"
                    text
                    v-bind="attrs"
                    @click="snackbar2 = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </v-form>
            <v-btn
              outlined
              color="success"
              class="mb-4 mx-2"
              @click="editProduct()"
            >
              修改
            </v-btn>
            <v-btn
              outlined
              color="red"
              class="mb-4 mx-2"
              @click="dialog = false"
            >
              關閉
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "GroupPage",
  data: () => ({
    products: [],
    dialog: false,
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
        item: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        choose: "",
      },
      { class: "交換對象:", name: "請輸入交換對象", edit: false, value: "" },
    ],
    pics: [
      {
        src: "",
      },
    ],
    productImg: "",
    productId: "",
    title: "",
    content: "",
    valid: true,
    Rules: [(v) => !!v || "欄位不得為空"],
    reColor: "",
    reText: "",
    snackbar2: false,
  }),
  methods: {
    edit(index) {
      this.product[0].value = this.products[index].name;
      this.product[1].choose = this.products[index].class;
      this.product[2].choose = this.products[index].state;
      this.product[3].choose = this.products[index].barter;
      this.product[4].choose = this.products[index].quantity;
      this.product[5].value = this.products[index].goal;
      this.pics[0].src = this.products[index].image;
      this.title = this.products[index].introTitle;
      this.content = this.products[index].introContent;
      this.productId = this.products[index]._id;
    },
    editProduct() {
      console.log("A");
    },
  },
  async created() {
    try {
      const { data } = await this.api.get("/products/" + this.userId, {
        headers: {
          authorization: "Bearer " + this.token,
        },
      });
      this.products = data.result;
      console.log(data.result);
    } catch (error) {
      alert(error);
    }
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    },
    token() {
      return this.$store.state.token;
    },
  },
};
</script>
<style lang="scss" scoped>
.inputer {
  width: 300px;
  height: 300px;
}
</style>
