<template>
<router-view />
</template>

<script>
export default {
  name: "app",
  components: {
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {},
  methods: {
    
  },
  mounted() {
    // console.log(this.$route.name);
    if (this.$route.params.name == "map" || this.$route.name == "login" || this.$route.name == "register") {
      this.show = false;
    }
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