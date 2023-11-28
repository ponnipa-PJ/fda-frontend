import http from "../http-common";

class MapRuleBasedUserService {
  getmap_rule_based_users() {
    return http.get('/map_rule_based_user');
  }
  getmap_rule_based_user(id) {
    return http.get('/map_rule_based_user/'+id);
  }
  createmap_rule_based_user(data) {
    return http.post('/map_rule_based_user', data);
  } 
  updatemap_rule_based_user(id,data) {
    return http.put(`/map_rule_based_user/${id}`, data);
  }
  deletemap_rule_based_user(id) {
    return http.delete(`/map_rule_based_user/${id}`);
  }
}

export default new MapRuleBasedUserService();

