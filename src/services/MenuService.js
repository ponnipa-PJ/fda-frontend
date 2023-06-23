import http from "../http-common";

class MenuService {
  getMenu() {
    return http.get('/menu');
  }
  getproduct(url) {
    return http.get(`/menu/getdetailproduct?url=${url}`);
  }
  updateMenu(id,data) {
    console.log(id,data);
    return http.put(`/menu/${id}`, data);
  }
}

export default new MenuService();