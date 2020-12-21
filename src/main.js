import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import localizeFilter from "./filters/localize.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from "./utils/message.plugin";
import titlePlugin from "./utils/title.plugin";
import Loader from "@/components/app/Loader";
import Paginate from "vuejs-paginate";
import VueMeta from "vue-meta";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

//
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.use(Vuelidate);
Vue.component("Paginate", Paginate);
Vue.component("Loader", Loader);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});

const firebaseConfig = {
  apiKey: "AIzaSyCWpf294qJkDKs2qO_b0j58cZJA8e_GuyY",
  authDomain: "vue-project-2-f68cf.firebaseapp.com",
  databaseURL: "https://vue-project-2-f68cf.firebaseio.com",
  projectId: "vue-project-2-f68cf",
  storageBucket: "vue-project-2-f68cf.appspot.com",
  messagingSenderId: "19302946842",
  appId: "1:19302946842:web:2f11cbbb3831156f6d59a3",
  measurementId: "G-DES7X42LK7"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
