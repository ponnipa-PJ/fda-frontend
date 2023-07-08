import http from "../http-common";

class ProductsService {
  getproducts(url) {
    return http.get('/products?url=',url);
  }
  scraping(data) {
    return http.post('/products/findscraping',data);
  }
  getproduct(id) {
    return http.get('/products/'+id);
  }
  createproduct(data) {
    return http.post('/products', data);
  } 
  updateproduct(id,data) {
    return http.put(`/products/${id}`, data);
  }
  findproduct(data) {
    return http.post('/products/findproduct', data);
  } 
}

export default new ProductsService();

