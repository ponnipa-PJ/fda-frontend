import http from "../http-common";

class LiquorFactories {
  getLiquorFactories() {
    return http.get('/liquor_factories');
  }
  getLiquorFactory(id) {
    console.log(`/liquor_factories/`, id);
    return http.get(`/liquor_factories/`+id);
  }
  createLiquorFactory(data) {
    return http.post('/liquor_factories', data);
  }  
  updateLiquorFactory(id,data) {
    return http.put(`/liquor_factories/${id}`, data);
  }
  deleteReportLiquorTax() {
    return http.delete(`/liquor_factories`);
  }
  getType () {
    return http.get(`/liquor_factories/type/`);
  }
}

export default new LiquorFactories();