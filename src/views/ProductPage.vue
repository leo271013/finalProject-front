<template>
  <div class="productpage mx-md-8 px-md-8 pb-sm-16">
    <div class="mt-16 mx-md-8 px-md-8 pl-sm-8">
      <v-breadcrumbs :items="address" large></v-breadcrumbs>
      <v-row class="mt-8 ml-md-8">
        <v-col cols="12" sm="6" class="pt-sm-16"
          ><v-img :src="img" width="500" class="mt-sm-8"></v-img
        ></v-col>
        <v-col md="4" sm="5" col class="ml-md-16"
          ><v-list flat>
            <v-subheader class="text-h4 mb-md-8 pink--text borderEdit"
              >商品內容</v-subheader
            >
            <v-list-item
              v-for="item in product"
              :key="item.title"
              class="ml-sm-2"
            >
              <v-list-item-icon class="mx-0">
                <v-icon color="pink">mdi-circle-small</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-h5"
                  >{{ item.title }}:<br class="d-sm-block d-md-none" />
                  <span class="text-h6 ml-2">
                    {{ item.content }}</span
                  ></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn
            block
            dark
            color="orange darken-2"
            class="mt-6"
            @click="sendMessage()"
            :disabled="isMe"
            >聯絡賣家</v-btn
          ><v-btn
            v-if="user.isAdmin"
            block
            outlined
            color="red"
            class="mt-6"
            @click="unsell"
            >違規下架</v-btn
          ></v-col
        >
      </v-row>
      <v-divider class="my-12"></v-divider>
      <v-row class="pb-16 pb-sm-0">
        <v-col>
          <template>
            <v-card flat class="mx-auto transparent">
              <v-card-title class="text-h4 pink--text borderEdit py-0 mb-16"
                >商品介紹</v-card-title
              >
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
import router from "@/router";
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
    text: "叮咚叮咚",
    sending: false,
  }),
  methods: {
    async sendMessage() {
      if (!this.user.isLogin) {
        alert("請先登入");
      } else {
        if (this.sending || this.products.userId.length === 0) return;
        this.sending = true;
        try {
          await this.api.post(
            `/chats/members/${this.products._id}/messages`,
            {
              text: this.text,
              product: {
                userId: this.products.userId,
                title: this.products.name,
                image: this.products.image,
              },
            },
            {
              headers: {
                authorization: "Bearer " + this.user.token,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
        this.sending = false;
      }
      router.push("/memberpage/membermessage");
    },
    async unsell() {
      const bigform = {
        sale: false,
      };
      const fd = new FormData();
      for (const key in bigform) {
        if (key !== "_id") {
          fd.append(key, bigform[key]);
        }
      }
      try {
        await this.api.patch("/products/" + this.products._id, fd, {
          headers: {
            authorization: "Bearer " + this.token,
          },
        });
        alert("下架成功");
        await this.api.post(
          `/chats/members/${this.products._id}/messages`,
          {
            text: "因違反規定，管理員已將您的商品下架，請修改後重新上架",
            product: {
              userId: this.products.userId,
              title: this.products.name,
              image: this.products.image,
            },
          },
          {
            headers: {
              authorization: "Bearer " + this.user.token,
            },
          }
        );
        router.push("/");
      } catch (error) {
        alert("下架失敗");
      }
    },
  },
  computed: {
    products() {
      return this.$store.state.product;
    },
    user() {
      return this.$store.getters.user;
    },
    isMe() {
      return this.products.userId === this.user.userId ? true : false;
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
    document.title = this.products.name + " | Swapper";
  },
};
</script>
<style lang="scss" scoped>
.borderEdit {
  border-left: 10px solid #e91e63;
}
</style>
