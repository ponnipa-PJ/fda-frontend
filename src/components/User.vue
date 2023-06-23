<template>
  <div class="hello container mt-5">
    <div class="row">
      <div class="col-md-12" style="text-align: center">รายการผู้ใช้</div>
      <div class="col-md-10" style="text-align: center"></div>
      <div class="col-md-2" style="text-align: center">
        <button
          @click="generate()"
          type="submit"
          class="btn btn-success"
          style="margin-top: 10px; text-align: right"
        >
          สร้างรหัสเริ่มต้นการใช้งาน
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" class="table-secondary">ลำดับที่</th>
              <th scope="col" class="table-secondary">รหัสเริ่มต้น</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, i) in list" :key="i + 1">
              <td scope="row">{{ i + 1 }}</td>
              <td scope="row">{{ l.user_key }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <input id="file" type="file" accept="image/*" @change="onFileChange" />
    <img v-if="itemPreviewImage" :src="itemPreviewImage" /> -->
  </div>
</template>

<script>
import UserService from "../services/UserService";

export default {
  name: "HelloWorld",
  data() {
    return {
      list: [],
      itemPreviewImage: "",
      id: "",
      item: [],
      img: "",
      image: "",
      excise_name: "",
      excise_by: "",
      sortid: 0,
      date: "",
      countall: 0,
    };
  },
  props: {
    msg: String,
  },
  computed: {},
  mounted() {
    this.loaddata();
  },
  methods: {
    loaddata() {
      UserService.getUsers().then((res) => {
        this.list = res.data;
      });
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    generate(){
      var data ={
        user_key:this.makeid(5),
        status:0,
        created_by:1,
        updated_by:1,
      }
      UserService.createUser(data).then((res)=>{
        console.log(res.data);
        this.loaddata()
      })
    }
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
}
</style>
