import http from "../http-common";

class ProductsService {
  getproducts(status,statusdelete) {
    return http.get('/products?status='+status+'&&statusdelete='+statusdelete);
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
  updatefdastatus(id,data) {
    return http.put(`/products/updatefdastatus/${id}`, data);
  }
  findproduct(data) {
    return http.post('/products/findproduct', data);
  } 
  deleteproduct(id,data) {
    return http.put(`/products/updatedeletestatus/${id}`,data);
  }
}

export default new ProductsService();

