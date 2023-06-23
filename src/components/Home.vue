<template>
  <div id="app">
    <Nav/>
    <div class="row"><div class="col-2" style="background-color:gray"><Menu/></div>
    <div class="col-10"> <Map/></div></div>
<Footer/>
  </div>
</template>

<script>
import Nav from './Nav.vue';
import Menu from './Menu.vue';
import Footer from './Footer.vue';
import Map from './Map.vue';
export default {
  name: "app",
  components: {
      Nav,
      Menu,
      Footer,
      Map
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
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