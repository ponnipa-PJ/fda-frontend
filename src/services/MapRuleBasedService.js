import http from "../http-common";

class MapRuleBasedService {
  getmap_rule_baseds() {
    return http.get('/map_rule_based');
  }
  getmap_rule_based(id) {
    return http.get('/map_rule_based/'+id);
  }
  createmap_rule_based(data) {
    return http.post('/map_rule_based', data);
  } 
  updateadvertise(id,data) {
    return http.put(`/advertise/${id}`, data);
  }
  updateanswer(id,data) {
    return http.put(`/map_rule_based/updateanswer/${id}`, data);
  }
  updatemap_rule_based(id,data) {
    return http.put(`/map_rule_based/${id}`, data);
  }
  deletemap_rule_based(id,data) {
    return http.put(`/map_rule_based/updatestatus/${id}`, data);
  }
}

export default new MapRuleBasedService();

