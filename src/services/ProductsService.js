import http from "../http-common";

class ProductsService {
  getproducts(status) {
    return http.get('/products?status='+status);
  }
  scraping(data) {
    return http.post('/products/findscraping',data);
  }
  scrapingheader(data) {
    return http.post('/products/findscrapingheader',data);
  }
  saveimageproduct(data) {
    return http.post('/products/saveimageproduct',data);
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
  updatescraping(id,data) {
    return http.put(`/products/updatescraping/${id}`, data);
  }
  findproduct(data) {
    return http.post('/products/findproduct', data);
  } 
  deleteproduct(id) {
    return http.delete(`/products/${id}`);
  }
}

export default new ProductsService();

