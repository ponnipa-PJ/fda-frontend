import http from "../http-common";

class DictService {
  getdicts(status,name) {
    return http.get('/dicts?status='+status+"&&name="+name);
  }
  getdict(id) {
    return http.get('/dicts/'+id);
  }
  createdict(data) {
    return http.post('/dicts', data);
  } 
  updatedict(id,data) {
    return http.put(`/dicts/${id}`, data);
  }
  deletedict(id) {
    return http.delete(`/dicts/${id}`);
  }
}

export default new DictService();

