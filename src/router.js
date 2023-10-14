import Vue from "vue";
import Router from "vue-router";
import Import from './components/Import.vue';
import scraping from './components/scraping.vue';
import category from './components/category.vue';
import scopus from './components/scopus.vue';
import scrapingdelete from './components/scrapingdelete.vue';
import searchbyfda from './components/searchbyfda.vue';
import Dashboard from './components/Dashboard.vue';
import DetailTypeGraph from './components/DetailTypeGraph.vue';
import DetailTypeTwoGraph from './components/DetailTypeTwoGraph.vue';
import keywords from './components/keywords.vue';
import Advertising from './components/Advertising.vue';
import rulebased from './components/rulebased.vue';
import Advertise from './components/Advertise.vue';
import keywordrulebased from './components/keywordrulebased.vue';
import Login from './components/Login.vue';
import Users from './components/Users.vue';
import Menu from './components/Menu.vue';
import Menumanage from './components/Menumanage.vue';
import check from './components/check.vue';

Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/import",
      alias: "/import",
      name: "import",
      component: Import
    },
    {
      path: "/check",
      alias: "/check",
      name: "check",
      component: check
    },
    {
      path: "/scraping",
      alias: "/scraping",
      name: "scraping",
      component: scraping
    },
    {
      path: "/category",
      alias: "/category",
      name: "category",
      component: category
    },
    {
      path: "/Corpus",
      alias: "/Corpus",
      name: "Corpus",
      component: scopus
    },
    {
      path: "/scrapingdelete",
      alias: "/scrapingdelete",
      name: "scrapingdelete",
      component: scrapingdelete
    },
    {
      path: "/searchbyfda",
      alias: "/searchbyfda",
      name: "searchbyfda",
      component: searchbyfda
    },
    {
      path: "/Dashboard",
      alias: "/Dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/detailtype/:id",
      alias: "/detailtype",
      name: "detailtype",
      component: DetailTypeGraph
    },  
    {
      path: "/detailtypetwo/:id",
      alias: "/detailtypetwo",
      name: "detailtypetwo",
      component: DetailTypeTwoGraph
    },
    {
      path: "/keywords",
      alias: "/keywords",
      name: "keywords",
      component: keywords
    },
    {
      path: "/Advertising",
      alias: "/Advertising",
      name: "Advertising",
      component: Advertising
    },
    {
      path: "/rulebased",
      alias: "/rulebased",
      name: "rulebased",
      component: rulebased
    },
    
    {
      path: "/Advertise",
      alias: "/Advertise",
      name: "Advertise",
      component: Advertise
    },
    {
      path: "/keywordrulebased",
      alias: "/keywordrulebased",
      name: "keywordrulebased",
      component: keywordrulebased
    },
    {
      path: "/",
      alias: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/Users",
      alias: "/Users",
      name: "Users",
      component: Users
    },
    {
      path: "/menu",
      alias: "/menu",
      name: "menu",
      component: Menu
    },
    {
      path: "/menumanage",
      alias: "/menumanage",
      name: "menumanage",
      component: Menumanage
    },
    
  ]
});


router.beforeEach((to, from, next) => {
  const publicPages = ['/login','/register','/keywords'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('fda');
  // trying to access a restricted page + not logged in
  // redirect to login page
  // console.log(loggedIn);
  if (authRequired && !loggedIn) {
    next('/login');
    // next();
  } else {
    next();
  }

});

export default router;
