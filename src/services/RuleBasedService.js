import http from "../http-common";

class RuleBasedService {
  getrule_baseds() {
    return http.get('/rule_based');
  }
  createdcolumnrule_based(id) {
    return http.get('/rule_based/createcolumn?name='+id);
  }
  getrule_based(id) {
    return http.get('/rule_based/'+id);
  }
  getweightrulebasemax() {
    return http.get('/rule_based/getweightrulebasemax');
  }
  getweightkeywordmax() {
    return http.get('/rule_based/getweightkeywordmax');
  }
  getbydict(id) {
    return http.get('/rule_based/getbydict?name='+id);
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

