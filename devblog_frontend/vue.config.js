const path = require("path");
require("dotenv").config({
  path: path.join(__dirname,"../",".env")
});

module.exports = {
    chainWebpack: (config) => {
      const svgRule = config.module.rule("svg");
      
      // PDF File Loader
      config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader");
    
      svgRule.uses.clear();
  
      svgRule
        .use("babel-loader")
        .loader("babel-loader")
        .end()
        .use("vue-svg-loader")
        .loader("vue-svg-loader");
        
    },
    devServer : {
      port: process.env.PORT,
      proxy: `http://localhost:${process.env.SERVER_PORT}`
    },
  };