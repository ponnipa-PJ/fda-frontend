import http from "../http-common";

class MapRuleBasedService {
  getmap_rule_baseds() {
    return http.get('/map_rule_based');
  }
  getmap_rule_based(id) {
    return http.get('/map_rule_based/'+id);
  }
  getallrulebased() {
    return http.get('/map_rule_based/getallrulebased');
  }
  findadanduser(ad_id,user) {
    return http.get('/map_rule_based/findadanduser?ad_id='+ad_id+'&&user='+user);
  }
  createmap_rule_based(data) {
    return http.post('/map_rule_based', data);
  } 
  createproduct_token(data) {
    return http.post('/product_token', data);
  } 
  getproduct_token(data) {
    return http.post('/product_token/getproduct', data);
  } 
  getproductkeyword(data) {
    return http.post('/product_token/getproductkeyword', data);
  }
  getmapproduct(data) {
    return http.post('/product_token/getmapproduct', data);
  } 
  getbestrulebased(data) {
    return http.post('/product_token/getbestrulebased', data);
  }
  updateadvertise(id,data) {
    return http.put(`/advertise/${id}`, data);
  }
  updatemap(id,data) {
    return http.put(`/product_token/updatemap/${id}`, data);
  }
  updaterulebased(id,data) {
    return http.put(`/advertise/updaterulebased/${id}`, data);
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

