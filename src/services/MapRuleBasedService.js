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
  updatemap_rule_based(id,data) {
    return http.put(`/map_rule_based/${id}`, data);
  }
  deletemap_rule_based(id) {
    return http.delete(`/map_rule_based/${id}`);
  }
}

export default new MapRuleBasedService();

