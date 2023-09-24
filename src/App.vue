<template>
  <div>
    <div class="topnav">
      <a v-for="m in menu" :key="m.id" :class="m.class" :href="m.url">{{ m.name }}</a>
      <a v-if="currentUser" class="" style="color: white;cursor: pointer;" @click="logOut()">ออกจากระบบ</a>
    </div>
    <router-view />
  </div>
</template>


<script>
import UserService from './services/UserService'

export default {
  name: "app",
  components: {
  },
  data() {
    return {
      show: true,
      menu: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      setTimeout(function () {
        location.reload();
      }, 500);
      this.$router.push("/");
    },
  },
  mounted() {
    console.log(this.currentUser);
    if (this.$route.params.name == "map" || this.$route.name == "login" || this.$route.name == "register") {
      this.show = false;
    }
    // this.menu.push(
    // {
    //   name:'แดชบอร์ด',
    //   path:'/',
    //   class:''
    // },
    //   {
    //   name:'ค้นหาสินค้าจากลิงก์',
    //   path:'/import',
    //   class:''
    // },
    // {
    //   name:'ค้นหาสินค้าจากเลขอย.',
    //   path:'/searchbyfda',
    //   class:''
    // },
    // {
    //   name:'รายการสินค้าที่ตรวจสอบทั้งหมด',
    //   path:'/scraping',
    //   class:''
    // },

    // // {
    // //   name:'หมวด',
    // //   path:'/category',
    // //   class:''
    // // },
    // // {
    // //   name:'รายการสินค้าที่ยกเลิกการตรวจสอบ',
    // //   path:'/scrapingdelete',
    // //   class:''
    // // },

    // {
    //   name:'Corpus',
    //   path:'/Corpus',
    //   class:''
    // },
    // {
    //   name:'keywords',
    //   path:'/keywords',
    //   class:''
    // },
    // {
    //   name:'Advertising',
    //   path:'/Advertising?id=1',
    //   class:''
    // },
    // {
    //   name:'rule based',
    //   path:'/rulebased',
    //   class:''
    // }
    // )

    if (this.currentUser) {
      UserService.getMenubyRoleID(this.currentUser.role_id).then((res) => {
        this.menu = res.data
        console.log(this.menu);
        for (let m = 0; m < this.menu.length; m++) {
          this.menu[m].class = ''
          if (this.menu[m].url == this.$route.path) {
            this.menu[m].class = 'active'
          }
        }
        this.menu.push({
          name:'รายการสินค้าที่ตรวจสอบทั้งหมด',
      url:'/scraping',
      class:''
        })
      })
    }



  },
};
</script>

<style>
/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #808000;
  color: white;
}
</style>