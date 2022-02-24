<template>
  <div class="MemberMessage">
    <v-card shaped color="orange lighten-5" class="mt-16">
      <v-row class="hidden">
        <v-col cols="4" class="py-0">
          <v-toolbar color="orange" dark flat shaped>
            <v-toolbar-title class="px-2">訊息</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list three-line class="chat pa-0">
            <v-list-item-group>
              <template v-for="item in items">
                <v-divider :key="item._id"></v-divider>
                <v-list-item :key="item.title" @click="select(item)">
                  <v-list-item-avatar tile size="75">
                    <v-img :src="item.product[0].image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-h6"
                      v-html="item.product[0].title"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
        <!-- <v-divider vertical></v-divider> -->
        <v-col v-if="id.length !== 0" class="pr-8">
          <div class="content">
            <div class="d-flex justify-center">
              <v-btn
                outlined
                @click="fetchOld"
                :disabled="fetchingOld"
                v-if="!fetchOldest"
                >載入更多</v-btn
              >
            </div>
            <div
              v-for="message in messages"
              :key="message._id"
              :class="{
                'flex-row-reverse': isMe(message.sender),
                'd-flex': true,
                'my-4': true,
              }"
              align-center
            >
              <v-avatar class="mx-4"
                ><v-img
                  :src="
                    'https://source.boringavatars.com/beam/120/' +
                    message.sender
                  "
                ></v-img></v-avatar
              ><v-tooltip top
                ><template v-slot:activator="{ on, attrs }"
                  ><v-chip
                    dark
                    v-bind="attrs"
                    v-on="on"
                    :color="
                      isMe(message.sender) ? 'pink' : 'deep-orange darken-1'
                    "
                    >{{ message.text }}</v-chip
                  ></template
                ><span>{{
                  new Date(message.date).toLocaleString()
                }}</span></v-tooltip
              >
            </div>
          </div>
          <v-text-field
            v-model="text"
            clearable
            outlined
            label="輸入訊息"
            background-color="white"
            append-outer-icon="mdi-send"
            class="mt-6 mr-4"
            @click:append-outer="sendMessage"
            @keydown.enter="sendMessage"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [],
    text: "",
    sending: false,
    messages: [],
    timer: 0,
    fetchingOld: false,
    fetchOldest: false,
    selected: undefined,
    users: [],
    id: "",
    productId: "",
  }),
  computed: {
    user() {
      return this.$store.getters.user;
    },
    chatid() {
      return this.$store.state.chatid;
    },
  },
  methods: {
    async select(item) {
      this.id = item.product[0]._id;
      this.productId = item.product[0].userId;
      if (item._id.length === 0) return;
      try {
        const { data } = await this.api.get(
          "/chats/members/" + item.product[0]._id,
          {
            headers: {
              authorization: "Bearer " + this.user.token,
            },
          }
        );
        if (data.result.length === 0) {
          this.fetchOldest = true;
        } else {
          console.log(data);
          this.messages = data.result;
        }
        this.timer = setInterval(this.fetchNew(item), 3000);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchNew(item) {
      try {
        const date = this.messages[this.messages.length - 1]?.date || "";
        const { data } = await this.api.get(
          `/chats/members/${this.id}?gt=${date}`,
          {
            headers: {
              authorization: "Bearer " + this.user.token,
            },
          }
        );
        if (data.result.length > 0) {
          this.messages.push(...data.result);
          Notification.requestPermission((permission) => {
            if (permission === "granted") {
              const notification = new Notification("聊天室有新訊息", {
                body: `${item.account} 傳了 ${data.result.length} 個新訊息`,
                icon: "https://cdn-icons.flaticon.com/png/512/2174/premium/2174653.png?token=exp=1643011533~hmac=4335fea76a9682e849c03394a9c0667e",
              });
              notification.onclick = () => {};
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    isMe(id) {
      return id === this.user.userId;
    },
    async sendMessage() {
      if (this.sending || this.text.length === 0 || this.id.length === 0)
        return;
      this.sending = true;
      try {
        const { data } = await this.api.post(
          `/chats/members/${this.id}/messages`,
          {
            text: this.text,
            product: {
              userId: this.productId,
            },
          },
          {
            headers: {
              authorization: "Bearer " + this.user.token,
            },
          }
        );
        this.messages.push(data.result);
      } catch (error) {
        console.log(error);
      }
      this.sending = false;
      this.text = "";
    },
    async fetchOld() {
      if (this.fetchingOld) return;
      this.fetchingOld = true;
      try {
        const date = this.messages[0]?.date || "";
        const { data } = await this.api.get(
          `/chats/members/${this.id}?lt=${date}`,
          {
            headers: {
              authorization: "Bearer " + this.user.token,
            },
          }
        );
        if (data.result.length === 0) {
          this.fetchOldest = true;
        } else {
          this.messages.unshift(...data.result.reverse());
        }
      } catch (error) {
        console.log(error);
      }
      this.fetchingOld = false;
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
  async created() {
    if (!this.user.isLogin) return;
    try {
      const { data } = await this.api.get(
        "/chats/members/list/" + this.user.userId,
        {
          headers: {
            authorization: "Bearer " + this.user.token,
          },
        }
      );
      this.items = data.result;
    } catch (error) {
      this.$swal({
        icon: "error",
        title: "失敗",
        text: "取得使用者失敗",
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.chat {
  overflow-y: scroll;
  height: 50vh;
}
.content {
  height: 438px;
  overflow-y: scroll;
}
.hidden {
  height: 540px;
  overflow: hidden;
}
</style>
