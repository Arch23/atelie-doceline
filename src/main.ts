import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Api from "@/services/base/Api";
//import 'vue-toast-notification/dist/theme-default.css';

Vue.use(VueToast, {
    position: "bottom",
    dismissible: true,
    pauseOnHover: true,
    duration: 0
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount("#app");
