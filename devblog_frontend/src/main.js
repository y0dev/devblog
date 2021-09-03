  
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from './firebase';
import Vue2Editor from "vue2-editor";
import VueMeta from 'vue-meta';

const path = require("path");
require("dotenv").config({
  path: path.join(__dirname,"../../",".env")
});

Vue.use(Vue2Editor);
Vue.use(VueMeta);

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});