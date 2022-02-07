<template>
  <div class="PostEdit">
    <v-card>
      <v-toolbar dark flat shaped color="blue">
        <v-toolbar-title>上架商品編輯</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list flat subheader three-line>
        <v-subheader>商品列表</v-subheader>
        <v-list-item>
          <img
            width="100"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            class="mr-8"
          />
          <v-list-item-content>
            <v-list-item-title class="text-h6">無敵風火輪</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn outlined color="light-green" class="mt-3"> 編輯 </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn outlined color="error" class="mt-3"> 下架 </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <img
            width="100"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            class="mr-8"
          />
          <v-list-item-content>
            <v-list-item-title class="text-h6">小雞吃米圖</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn outlined color="light-green" class="mt-3"> 編輯 </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn outlined color="error" class="mt-3"> 下架 </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <img
            width="100"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            class="mr-8"
          />
          <v-list-item-content>
            <v-list-item-title class="text-h6">古靈精怪槍</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn outlined color="light-green" class="mt-3"> 編輯 </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn outlined color="error" class="mt-3"> 下架 </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
