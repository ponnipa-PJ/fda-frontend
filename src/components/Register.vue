<template>
  <div class="card mt-5" style="width: 500px">
    <div class="card-body login-card-body">
      <h3 class="login-box-msg" style="text-align: center">สมัครสมาชิก</h3>
      <form>
        <div class="card-body">
          <div class="form-group">
            <label for="username">รหัสเริ่มต้นการใช้งาน</label>
            <input
              v-model="user.key"
              type="text"
              class="form-control"
              id="username"
              placeholder="กรุณากรอกรหัสเริ่มต้นการใช้งาน"
            />
          </div>
          <div class="form-group">
            <label for="username">ชื่อผู้ใช้งาน</label>
            <input
              v-model="user.username"
              type="text"
              class="form-control"
              id="username"
              placeholder="กรุณากรอกชื่อผู้ใช้งาน"
            />
          </div>
          <div class="form-group">
            <label for="password">รหัสผ่าน</label>
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="กรุณากรอกรหัสผ่าน"
            />
          </div>
          <div class="social-auth-links text-center mb-3 mt-5">
            <button @click="register()" type="button" class="btn btn-secondary">
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService";
import { DeviceUUID } from 'device-uuid';

export default {
  name: "login",
  components: {},
  data() {
    return {
      user: [],
      key: "",
    };
  },
  computed: {},
  methods: {
    signIn() {
      if (this.user.id_card == "" || this.user.id_card == null) {
        alert("กรุณากรอกชื่อผู้ใช้งาน");
      } else if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      }
    },
    getDeviceType() {
      var uuid = new DeviceUUID().get();
      return uuid;
    },
    getOS() {
      var du = new DeviceUUID().parse();
      return du.platform;
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
    register() {
      console.log(this.user.key);
      if (this.user.key == null) {
        alert("กรุณากรอกรหัสเริ่มต้น");
      } else if (this.user.username == null) {
        alert("กรุณากรอกชื่อผู้ใช้งาน");
      } else if (this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      } else {
        UserService.getUser(this.user.key).then((res) => {
          console.log(res.data);
          if (res.data.length == 0) {
            alert("รหัสเริ่มต้นการใช้งานไม่ถูกต้อง");
          } else if (res.data.status == 1) {
            alert("รหัสเริ่มต้นการใช้งานถูกใช้แล้ว");
          } else {
            var data = {
              username: this.user.username,
              password: this.user.password,
              device: this.getOS(),
              u_id: this.getDeviceType(),
              status: 1,
              created_by: 1,
              updated_by: 1,
            };
            UserService.updateUser(res.data.user_id, data).then((res) => {
              console.log(res.data);
              this.$router.push("/login");
            });
          }
        });
      }
    },
  },
  mounted() {
  },
};
</script>

<style>
body {
  font-family: "Kanit" !important;
  color: black !important;
}
.card {
  max-width: 500px;
  margin: auto;
  background: white;
  padding: 10px;
  color: black !important;
}
</style>