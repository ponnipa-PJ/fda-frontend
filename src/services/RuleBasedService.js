import http from "../http-common";

class RuleBasedService {
  getrule_baseds(status) {
    return http.get('/rule_based?status='+status);
  }
  createdcolumnrule_based(id) {
    return http.get('/rule_based/createcolumn?name='+id);
  }
  getrule_based(id) {
    return http.get('/rule_based/'+id);
  }
  createrule_based(data) {
    return http.post('/rule_based', data);
  } 
  updaterule_based(id,data) {
    return http.put(`/rule_based/${id}`, data);
  }
  deleterule_based(id) {
    return http.delete(`/rule_based/${id}`);
  }
}

export default new RuleBasedService();

