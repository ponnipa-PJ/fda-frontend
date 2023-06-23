<template>
  <div class="card mt-5" style="width: 500px">
    <div class="card-body login-card-body">
      <h3 class="login-box-msg">เข้าสู่ระบบ</h3>
      <form>
        <div class="card-body">
          <div class="form-group">
            <label for="username">ชื่อผู้ใช้งาน</label>
            <input
              v-model="user.username"
              type="text"
              min="1"
              class="form-control"
              id="username"
              placeholder="กรุณากรอกชื่อผู้ใช้งาน"
            />
          </div>
          <div class="form-group">
            <label for="password">รหัสผ่าน</label>
            <input
              v-model="user.password"
              v-on:keyup.enter="signIn()"
              type="password"
              class="form-control"
              id="password"
              placeholder="กรุณากรอกรหัสผ่าน"
            />
          </div>
          <div class="social-auth-links text-center mb-3 mt-5">
            <!-- <a href="register"><button type="button" class="btn btn-secondary">สมัครสมาชิก</button></a>
            &nbsp; -->
            <button @click="signIn()" type="button" class="btn btn-success">เข้าสู่ระบบ</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script src="https://raw.githubusercontent.com/biggora/device-uuid/master/lib/device-uuid.min.js"></script>

<script>

export default {
  name: "login",
  components: {},
  data() {
    return {
      user: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {   
     signIn() {
      if (this.user.username == "" || this.user.username == null) {
        alert("กรุณากรอกชื่อผู้ใช้งาน");
      } else if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      } else {
        var user = {
          username: this.user.username,
          password: this.user.password,
        };
        this.$store.dispatch("auth/login", user).then(
          () => {
            this.loading = true;
            setTimeout(function () {
              location.reload();
              
            this.$router.push("/maps");
            }, 500);
          },
          (error) => {
            alert("ชื่อหรือรหัสผ่านไม่ถูกต้อง");
            console.log(error);
            // this.loading = false;
            // this.message =
            //   (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            //   error.message ||
            //   error.toString();
          }
        );
      }
    },
    
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push("/maps");
    }
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