import Vue from "vue";
import Router from "vue-router";
import Import from './components/Import.vue';
import scraping from './components/scraping.vue';
import category from './components/category.vue';
import scopus from './components/scopus.vue';

Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
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
