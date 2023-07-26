import http from "../http-common";

class CategoryService {
  getcategorys(status) {
    return http.get('/category?status='+status);
  }
  getcategory(id) {
    return http.get('/category/'+id);
  }
  database_path() {
    return http.get('/database_path');
  }
  
  createcategory(data) {
    return http.post('/category', data);
  } 
  updatecategory(id,data) {
    return http.put(`/category/${id}`, data);
  }
  deletecategory(id) {
    return http.delete(`/category/${id}`);
  }
}

export default new CategoryService();

