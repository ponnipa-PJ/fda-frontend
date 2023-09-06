import http from "../http-common";

class ProductsService {
  getproducts(status,statusdelete,statusfda) {
    return http.get('/products?status='+status+'&&statusdelete='+statusdelete+'&&statusfda='+statusfda);
  }
  getproductkeyword(start,end) {
    return http.get('/products/getproductkeyword?start='+start+'&&end='+end);
  }
  findGraphOne(status) {
    return http.get('/products/findGraphOne?status='+status);
  }
  findGraphTwo(status) {
    return http.get('/products/findGraphTwo?status='+status);
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
  map_rule_based(id,data) {
    return http.put(`/products/map_rule_based/${id}`, data);
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
  findproductfda(data) {
    return http.post('/products/findproductfda', data);
  } 
  deleteproduct(id,data) {
    return http.put(`/products/updatedeletestatus/${id}`,data);
  }
}

export default new ProductsService();

