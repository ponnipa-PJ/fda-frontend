<template>
  <div class="hello container mt-5">
    <h2>แก้ไขชื่อเมนู</h2>
    <div class="mb-3" v-for="(m, i) in menu" :key="m.id">
      <label for="exampleInputEmail1" class="form-label"
        >เมนูที่ {{ i + 1 }}</label
      >
      <input
        v-model="m.name"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <button
      @click="save()"
      type="submit"
      class="btn btn-primary mb-5"
      style="margin-top: 10px"
    >
      บันทึก
    </button>
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
    getmenu() {
      MenuService.getMenu().then((res) => {
        this.menu = res.data;
      });
    },
    save() {
      for (let m = 0; m < this.menu.length; m++) {
        var menus = {
          name: this.menu[m].name,
        };
        MenuService.updateMenu(this.menu[m].id, menus)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      }
      setTimeout(function () {
        window.location.reload();
      }, 300);
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