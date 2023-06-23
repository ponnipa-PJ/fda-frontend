<template>
  <div class="hello container mt-5">
    <h2>{{ fda }}</h2>
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="..." alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">{{ data }}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  data() {
    return {
      data: [],
      fda: ''
    };
  },
  computed: {

  },
  mounted() {
    this.fda = this.$route.params.fda;
    console.log(this.fda);
    this.loaddata();
  },
  methods: {
    loaddata() {
      const url = "https://tawaiforhealth.org/api/oryor/check-product";
      const data = { "number_src": this.fda };

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.data = data
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}</style>
