<template>
  <div>
    <div class="container mt-3 mb-3">
      <div class="row mt-5">
        <div class="form-group col-md-6">
          <label for="exampleFormControlSelect1">สิทธิ์การใช้งาน</label>
          <select
            v-model="role_type"
            class="form-control form-control-sm"
            id="exampleFormControlSelect1"
            @change="getarray()"
          >
            <option v-for="(s, i) in roles" v-bind:value="s.id" :key="i + 1">
              {{ s.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12" v-for="m in menus" :key="m.menu_id">
          <div class="form-group" style="text-align: left">
            <label>
              <input
                type="checkbox"
                v-model="menu_id"
                :id="m.page"
                :value="m.id"
              />
              <span> {{ m.name }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="row mt-3 mb-3">
        <div class="col-md-12 text-center">
          <button
            class="btn btn-success"
            style="color: white; width: 200px"
            @click="save()"
          >
            บันทึก
          </button>
          &nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const customLabels = {
  first: "<<",
  last: ">>",
  previous: "<",
  next: ">",
};

import UserService from "../services/UserService.js";

export default {
  name: "Carlist",
  components: {
    // VueHtml2pdf,
    // ContentToPrint,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      list: [],
      roles: [],
      license: "",
      role_type: "",
      licenses: [],
      customLabels,
      pageOfItems: [],
      car_id: "",
      menu_id: [],
      menus: [],
    };
  },
  methods: {
    save() {
      UserService.deleteRoleMenu(this.role_type).then(() => {
        for (let m = 0; m < this.menu_id.length; m++) {
          var menu = {
            menu_id: this.menu_id[m],
            role_id: this.role_type,
          };
          // console.log(menu);
          UserService.createRoleMenu(menu)
            .then(() => {
              // console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        alert('บันทึกสำเร็จ')
        setTimeout(function () {
                    location.reload();
                  }, 500);
                  window.scrollTo(0, 0);
      });
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    getMenu() {
      UserService.getMenu().then((res) => {
        // console.log(res.data);
        this.menus = res.data;
      });
    },
    getarray() {
      this.menu_id = [];
      UserService.getMenubyRoleIDAll(this.role_type).then((res) => {
        if (res.data.menu == null) {
          this.menu_id = [];
        } else {
          this.menu_id = JSON.parse(res.data.menu);
        }
        // console.log(res.data.menu);
      });
    },
    getroles() {
      UserService.getRoles().then((res) => {
        //console.log(res.data);
        this.roles = res.data;
        this.role_type = this.roles[0].id;
        this.getarray();
      });
    },
    convertdatetothai(datetimes) {
      if (datetimes) {
        const date = new Date(datetimes);
        const result = date.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return result;
      } else {
        return "-";
      }
    },
  },
  mounted() {
    this.getMenu();
    this.getroles();
  },
  computed: {
    filteredList() {
      return this.licenses.filter((post) => {
        return post.license.toLowerCase().includes(this.license.toLowerCase());
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
  color: black;
  text-decoration: none;
}
#app {
  font-family: "Niramit";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
