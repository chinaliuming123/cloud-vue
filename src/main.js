import Vue from "vue";
import App from "./App.vue";
import Cloudbase from "@cloudbase/vue-provider";
import config from "../cloudbaserc";

// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(Cloudbase, {
  env: process.env.VUE_APP_ENV_ID || config.envId,
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
