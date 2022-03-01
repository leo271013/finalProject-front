const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
});

module.exports = {
  publicPath: "./",
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = "Swapper";
      return args;
    });
  },
};
