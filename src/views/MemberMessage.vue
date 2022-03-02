<template>
  <div class="MemberMessage">
    <v-card color="orange lighten-5" class="mt-16">
      <v-row class="hidden">
        <v-col cols="4" class="py-0">
          <v-toolbar flat>
            <v-toolbar-title class="px-2 borderMessage pink--text"
              >訊息</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list three-line class="chat pa-0">
            <v-list-item-group>
              <template v-for="(item, index) in items">
                <v-divider :key="item._id"></v-divider>
                <v-list-item
                  :key="item.title"
                  @click="select(item)"
                  :color="
                    info[index].userName === '來自管理員'
                      ? '#F44336'
                      : item.members[0] === user.userId
                      ? 'grey'
                      : 'grey'
                  "
                >
                  <v-list-item-avatar tile size="75">
                    <v-img :src="item.product[0].image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6"
                      ><span class="d-sm-none d-md-inline">商品名稱: </span
                      >{{ item.product[0].title }}</v-list-item-title
                    >
                    <v-list-item-subtitle
                      :style="{
                        color:
                          info[index].userName === '來自管理員'
                            ? '#F44336'
                            : item.members[0] === user.userId
                            ? 'grey'
                            : 'grey',
                      }"
                      >{{ info[index].userName }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col v-if="id.length !== 0" class="pr-8">
          <div ref="toBottom" class="content">
            <div class="d-flex justify-center">
              <v-btn
                outlined
                @click="fetchOld"
                :disabled="fetchingOld"
                v-if="fetchOldest"
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
                ><v-img :src="messageImg(message.sender)"></v-img></v-avatar
              ><v-tooltip top
                ><template v-slot:activator="{ on, attrs }"
                  ><v-chip
                    dark
                    v-bind="attrs"
                    v-on="on"
                    :color="
                      isMe(message.sender) ? 'pink' : 'deep-orange darken-1'
                    "
                    class="mt-4"
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
            counter="40"
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
    info: [],
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
      this.productId = item.product[0].userId[0];
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
          this.messages = data.result;
        }
        this.timer = setInterval(this.fetchNew, 3000);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchNew() {
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
        }
        this.$refs.toBottom.scrollTop = this.$refs.toBottom.scrollHeight;
      } catch (error) {
        console.log(error);
      }
    },
    isMe(id) {
      return id === this.user.userId;
    },
    async sendMessage() {
      if (this.text.length > 40) {
        alert("訊息請勿超過40個字");
        return;
      }
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
    messageImg(messageUser) {
      if (messageUser === this.user.userId) {
        return this.user.userImg;
      } else {
        for (const i in this.info) {
          if (messageUser === this.info[i]._id) {
            return this.info[i].image;
          }
        }
      }
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
      for (const item in this.items) {
        if (this.items[item].members[0] !== this.user.userId) {
          try {
            const { data } = await this.api.get(
              "/users/" + this.items[item].members[0]
            );
            data.info.userName = "來自買家 : " + data.info.userName;
            this.info.push(data.info);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const { data } = await this.api.get(
              "/users/" + this.items[item].members[1]
            );
            data.info.userName = "傳自賣家 : " + data.info.userName;
            this.info.push(data.info);
          } catch (error) {
            console.log(error);
          }
        }
        if (this.info[item].userName === "來自買家 : 管理員") {
          this.info[item].userName = "來自管理員";
        }
      }
    } catch (error) {
      alert("網路不穩定");
    }
  },
};
</script>
<style lang="scss" scoped>
.chat {
  overflow-y: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e91e63;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    background-color: #f5f5f5;
  }
}
.content {
  height: 438px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e91e63;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    background-color: #f5f5f5;
  }
}
.hidden {
  height: 560px;
  overflow: hidden;
}
.borderMessage {
  border-left: 10px solid #e91e63;
}
</style>
