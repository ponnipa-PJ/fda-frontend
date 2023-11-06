import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import VueExcelXlsx from "vue-excel-xlsx";
import store from './store';
import JwPagination from 'jw-vue-pagination';

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

Vue.use(VueExcelXlsx);
Vue.component('jw-pagination', JwPagination);
Vue.component('pulse-loader', require('vue-spinner/src/PulseLoader.vue'));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
