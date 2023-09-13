import http from "../http-common";

class MenuService {
  getmenus() {
    return http.get(`/menus`);
  }
  getmenu(id) {
    return http.get(`/menus/`+id);
  }
  updatemenu(id, data) {
    return http.put(`/menus/${id}`, data);
  }
  updateorder(id, data) {
    return http.put(`/menus/updateorder/${id}`, data);
  }
}

export default new MenuService();