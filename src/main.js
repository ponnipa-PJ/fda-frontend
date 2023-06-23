import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import VueExcelXlsx from "vue-excel-xlsx";
import store from './store';

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

Vue.use(VueExcelXlsx);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
