import http from "../http-common";

class KeywordService {
  getkeywords(status) {
    return http.get('/keyword_dicts?name='+status);
  }
  getkeyword(id) {
    return http.get('/keyword_dicts/'+id);
  }
  getrulebasekeyword() {
    return http.get('/rule_based_keyword/');
  }
  createkeyword(data) {
    return http.post('/keyword_dicts', data);
  } 
  updatekeyword(id,data) {
    return http.put(`/keyword_dicts/${id}`, data);
  }
  deletekeyword(id) {
    return http.delete(`/keyword_dicts/${id}`);
  }
}

export default new KeywordService();

