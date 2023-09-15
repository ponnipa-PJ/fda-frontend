<template>
<div >
    <div class="card mt-5" style="width: 80%">
    <div class="card-body login-card-body mt-3">
      <h3 class="login-box-msg" style="text-align:center">เข้าสู่ระบบ</h3>
      <form>
        <div class="card-body mt-3">
          <div class="form-group">
            <label for="email">ชื่อผู้ใช้งาน<span style="color: red">*</span> </label>
            <input
              v-model="user.email"
              v-on:keyup.enter="signIn()"
              type="text"
              min="1"
              class="form-control form-control-sm"
              id="email"
              placeholder="กรุณากรอกชื่อผู้ใช้งาน"
            />
          </div>
          <div class="form-group mt-3" style="margin-bottom:0px">
                  <label for="password">รหัสผ่าน<span style="color: red">*</span> </label>
                  <!-- <input v-model="user.password" v-on:keyup.enter="signIn()" type="password"
                    class="form-control form-control-sm" id="password" />
                    <input v-model="user.text" v-on:keyup.enter="signIn()" type="password"
                    class="form-control form-control-sm" id="password" />
                    <i class="bi bi-eye-slash" id="togglePassword"></i>
                    <i class="bi bi-eye-fill"></i> -->
                    
                </div>
                <div class="input-group mb-3" v-if="eye">
                  <input v-model="user.password" v-on:keyup.enter="signIn()" type="password"
                    class="form-control form-control-sm" id="password" placeholder="กรุณากรอกรหัสผ่าน"/>
                    
</div>
                <!-- <div class="input-group mb-3" v-if="eye">
                  <input v-model="user.password" v-on:keyup.enter="signIn()" type="password"
                    class="form-control form-control-sm" id="password" placeholder="กรุณากรอกรหัสผ่าน"/>
                    <div class="input-group-append">
<button type="button" class="btn btn-secondary btn-sm" @click="showPassword(true)"> <i class="bi bi-eye-fill"></i></button>
</div>
</div>
<div class="input-group mb-3" v-else>
                  <input v-model="user.password" v-on:keyup.enter="signIn()" type="text"
                    class="form-control form-control-sm" id="password" placeholder="กรุณากรอกรหัสผ่าน"/>
                    <div class="input-group-append">
<button type="button" class="btn btn-secondary btn-sm" @click="showPassword(false)"> <i class="bi bi-eye-slash"></i></button>
</div>
</div> -->
          <div class="social-auth-links text-center mb-3 mt-3">
          
            <button @click="signIn()" type="button" class="btn btn-success">เข้าสู่ระบบ</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import UserService from '../services/UserService.js'

export default {
  name: "Nav",  
  props: {
    msg: String,
  },
  data() {
    return {
      concert_id:0,
      menu:[],
      user:{},
      eye:true,
    }
  },
  mounted() {
    console.log(this.currentUser);
    if (this.currentUser) {
      this.$router.push('/Corpus');
      UserService.getMenubyRoleID(this.currentUser.role_id).then((res)=>{
          this.menu = res.data
          // this.$router.push(res.data[0].url);
        })
      }
  },
  methods: {
    showPassword(status){
      // console.log(status);
      if (status == true) {
        this.eye =false
      }else{
        this.eye = true
      }

    },
     signIn() {
      if (this.user.email == "" || this.user.email == null) {
        alert("กรุณากรอกอีเมล");
      } else if (this.user.password == "" || this.user.password == null) {
        alert("กรุณากรอกรหัสผ่าน");
      } else {
        var user = {
          email: this.user.email,
          password: this.user.password,
        };
        this.$store.dispatch("auth/login", user).then(
          () => {
            // this.loading = true;
            UserService.getMenubyRoleID(this.currentUser.role_id).then((res)=>{
              // console.log(this.urlAuth());
          var menu = res.data[0].url
          // console.log(menu);
          // console.log(this.currentUser);
          
          this.$router.push(menu);
  location.reload();
        
          //   setTimeout(function () {
          //     location.reload();
          //   }, 500);
        })
            
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
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vertical-menu {
  background-color: #eee;
}

.vertical-menu a {
  background-color: #eee;
  color: black;
  display: block;
  padding: 12px;
  text-decoration: none;
}

.vertical-menu a:hover {
  background-color: #ccc;
}

.vertical-menu a.active {
  background-color: #04AA6D;
  color: white;
}
.card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
}
body{
background-color: gray;
}
</style>
