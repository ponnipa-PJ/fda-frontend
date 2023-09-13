import http from "../../http-common";
import { DeviceUUID } from 'device-uuid';

class AuthService {
  getUUID(){  
    var uuid = new DeviceUUID().get();
  return uuid
   }
  async login(user) {
    // console.log(user)
    // localStorage.setItem('users', JSON.stringify(user));
    // return user
    return http.post('user/signin', user)
      .then(response => {
        console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem('fda', JSON.stringify(response.data));
        }
        return response.data;
      },
        error => {
          console.log(error);
          this.$router.push("/login");
          alert('ชื่อหรือรหัสผ่านไม่ถูกต้อง')
        }
      );
  }

  logout() {
    localStorage.removeItem('fda');
  }

  role() {
    return http.get('role');
  }

  getpage(id) {
    return http.get(`menu/menubyuserid/`+id);
  }

  
  getname(id) {
    return http.get(`user/`+id);
  }

}
export default new AuthService();