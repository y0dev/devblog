  
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname,"../../",".env")
});
console.log(process.env)
Vue.use(Vue2Editor);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");