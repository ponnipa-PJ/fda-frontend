<template>
  <div id="app">
    <ul class="list-group" v-for="m in menu" :key="m.id">
      <router-link :to="m.link"
        ><li class="list-group-item">{{ m.name }}</li>
      </router-link>
    </ul>
    <!-- <ul class="list-group">
    <li class="list-group-item" >
      <a style="color:black" href="/user">สร้างผู้ใช้</a>
    </li>
    </ul> -->
    <ul class="list-group">
    <li class="list-group-item" >
      <a @click.prevent="logOut" style="color:black" href="#">ออกจากระบบ</a>
    </li>
    </ul>
  </div>
</template>

<script>
import MenuService from "../services/MenuService";

export default {
  name: "app",
  components: {},
  data() {
    return {
      menu: [],
    };
  },
  computed: {},
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
      setTimeout(function () {
        window.location.reload();
      }, 300);
    },
    getmenu() {
      MenuService.getMenu().then((res) => {
        // console.log(res.data);
        this.menu = res.data;
      });
    },
  },
  mounted() {
    this.getmenu();
  },
};
</script>

<style>
.navbar {
  background-color: #09cc68;
}
.header {
  padding: 5px;
  background-color: #09cc68;
  color: white;
}
.text {
  font-size: 15px;
  /* min-height: 1em; */
  margin: 5px;
  vertical-align: middle;
}
footer {
  /* display: grid; */
  text-align: center;
  padding: 30px;
  background: #3e4041;
}
</style>