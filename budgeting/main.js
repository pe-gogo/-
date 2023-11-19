import Vue from "vue";
import App from "./App";
import cooluni from "./cl-uni";
import uView from './uni_modules/vk-uview-ui';
Vue.config.productionTip = false;

App.mpType = "app";

Vue.use(cooluni);
Vue.use(uView);
const app = new Vue({
	...App
});
app.$mount();
