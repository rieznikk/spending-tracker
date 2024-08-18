import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import modal from './plugins/modal-window';
import contextMenu from "./plugins/context-menu";
import PaymentFormEdit from "./plugins/payment-form-edit";
import vuetify from './plugins/vuetify';
import './assets/styles/index.scss';

Vue.config.productionTip = false;
Vue.use(modal);
Vue.use(contextMenu);
Vue.use(PaymentFormEdit);

new Vue({
  render: (h) => h(App),
  store,
  router,
  vuetify
}).$mount("#app");
