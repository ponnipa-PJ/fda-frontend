import Vue from "vue";
import Router from "vue-router";
import Map from './components/Map.vue';
import Import from './components/Import.vue';
import List from './components/List.vue';
import Detail from './components/Detail.vue';
import Menu from './components/Menu.vue';
import Report from './components/Report.vue';
import Verify from './components/Verify.vue';
import VerifyHistory from './components/VerifyHistory.vue';
import VerifyList from './components/VerifyLists.vue';
import EditDetail from './components/EditDetail.vue';
import EditMenu from './components/EditMenu.vue';
import LiquorTaxDetail from './components/LiquorTaxDetail.vue';
import graphtax from './components/graphtax.vue';
import graphvolumn from './components/graphvolumn.vue';
import ReportTax from './components/ReportTax.vue';
import VerifyListByRound from './components/VerifyListByRound.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import User from './components/User.vue';
import Details from './components/Details.vue';

Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/maps",
      alias: "/maps",
      name: "map",
      component: Map
    },
    {
      path: "/",
      alias: "/import",
      name: "import",
      component: Import
    },
    {
      path: "/list",
      alias: "/list",
      name: "list",
      component: List
    },
    {
      path: "/map/:id/:name",
      alias: "/map",
      name: "map",
      component: Detail
    },
    {
      path: "/menu",
      alias: "/menu",
      name: "menu",
      component: Menu
    },
    {
      path: "/report",
      alias: "/report",
      name: "report",
      component: Report
    },
    {
      path: "/verify",
      alias: "/verify",
      name: "verify",
      component: Verify
    },
    {
      path: "/verifyhistory/:id",
      alias: "/verifyhistory",
      name: "verifyhistory",
      component: VerifyHistory
    },
    {
      path: "/verifylist",
      alias: "/verifylist",
      name: "verifylist",
      component: VerifyList
    },
    {
      path: "/edit/:id",
      alias: "/edit",
      name: "edit",
      component: EditDetail
    },
    {
      path: "/editmenu",
      alias: "/editmenu",
      name: "editmenu",
      component: EditMenu
    },
    {
      path: "/liquortaxdetail/:id/:name",
      alias: "/liquortaxdetail",
      name: "liquortaxdetail",
      component: LiquorTaxDetail
    },
    {
      path: "/graphtax/:id",
      alias: "/graphtax",
      name: "graphtax",
      component: graphtax
    },
    {
      path: "/graphvolumn/:id",
      alias: "/graphvolumn",
      name: "graphvolumn",
      component: graphvolumn
    },
    {
      path: "/reporttax/:id",
      alias: "/reporttax",
      name: "reporttax",
      component: ReportTax
    },
    {
      path: "/verifylist/:id",
      alias: "/verifylist",
      name: "verifylist",
      component: VerifyListByRound
    },
    {
      path: "/login",
      alias: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/user",
      alias: "/user",
      name: "user",
      component: User
    },
    {
      path: "/register",
      alias: "/register",
      name: "register",
      component: Register
    },
    
    {
      path: "/detail/:fda",
      alias: "/detail",
      name: "detail",
      component: Details
    },
  ]
});


// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login','/register'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('users');
//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   // console.log(loggedIn);
//   if (authRequired && !loggedIn) {
//     next('/login');
//     // next();
//   } else {
//     next();
//   }

// });

export default router;
