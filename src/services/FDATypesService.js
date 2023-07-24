import http from "../http-common";

class FDATypesService {
  getfdatypes(name) {
    return http.get('/fdatypes?name='+name);
  }
  getfdatype(id) {
    return http.get('/fdatypes/'+id);
  }
  createfdatype(data) {
    return http.post('/fdatypes', data);
  } 
  updatefdatype(id,data) {
    return http.put(`/fdatypes/${id}`, data);
  }
  deletefdatype(id) {
    return http.delete(`/fdatypes/${id}`);
  }
}

export default new FDATypesService();

