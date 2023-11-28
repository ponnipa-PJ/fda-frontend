import http from "../http-common";

class RulebasedTypesService {
  gettypes_rulebased() {
    return http.get('/type_rulebased');
  }
  gettype_rulebased(id) {
    return http.get('/type_rulebased/'+id);
  }
  createtype_rulebased(data) {
    return http.post('/type_rulebased', data);
  } 
  updatetype_rulebased(id,data) {
    return http.put(`/type_rulebased/${id}`, data);
  }
  deletetype_rulebased(id) {
    return http.delete(`/type_rulebased/${id}`);
  }
}

export default new RulebasedTypesService();

