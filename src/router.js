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
      path: "/",
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
