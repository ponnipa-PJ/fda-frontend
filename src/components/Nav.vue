<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a href="/maps" class="nav-link active" aria-current="page">Map</a>
            </li>
            <li class="nav-item">
            <a href="/import" class="nav-link active">
              Import Data
            </a>
        </li>
        <li class="nav-item">
            <a href="/editmenu" class="nav-link active">
              แก้ไขเมนู
            </a>
        </li>
          </ul>
        </div>
      </div>
    </nav>    
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
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