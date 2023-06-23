import http from "../http-common";

class UserService {
  getUsers() {
    return http.get('/user');
  }
  getUser(key) {
    return http.get('/user/findKey/?key='+key);
  }
  createUser(data) {
    return http.post('/user', data);
  } 
  updateUser(id,data) {
    return http.put(`/user/${id}`, data);
  }
}

export default new UserService();