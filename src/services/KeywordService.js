import http from "../http-common";

class KeywordService {
  getkeywords(status) {
    return http.get('/keywords?name='+status);
  }
  getkeyword(id) {
    return http.get('/keywords/'+id);
  }
  createkeyword(data) {
    return http.post('/keywords', data);
  } 
  updatekeyword(id,data) {
    return http.put(`/keywords/${id}`, data);
  }
  deletekeyword(id) {
    return http.delete(`/keywords/${id}`);
  }
}

export default new KeywordService();

