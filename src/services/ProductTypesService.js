import http from "../http-common";

class ProductTypesService {
  gettypes_product() {
    return http.get('/type_product');
  }
  gettype_product(id) {
    return http.get('/type_product/'+id);
  }
  createtype_product(data) {
    return http.post('/type_product', data);
  } 
  updatetype_product(id,data) {
    return http.put(`/type_product/${id}`, data);
  }
  deletetype_product(id) {
    return http.delete(`/type_product/${id}`);
  }
}

export default new ProductTypesService();

