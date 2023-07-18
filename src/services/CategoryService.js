import http from "../http-common";

class CategoryService {
  getcategorys(status) {
    return http.get('/category?status=',status);
  }
  getcategory(id) {
    return http.get('/category/'+id);
  }
  createcategory(data) {
    return http.post('/category', data);
  } 
  updatecategory(id,data) {
    return http.put(`/category/${id}`, data);
  }
}

export default new CategoryService();
