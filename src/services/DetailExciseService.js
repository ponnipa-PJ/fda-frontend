import http from "../http-common";

class DetailExciseService {
  getDetailExcisesByID(id) {
    return http.get('/detail_excise/getbyID/' + id);
  }
  getDetailExcises() {
    return http.get('/detail_excise');
  }
  getDetailExcisesByname(name,by,sort,registration_status) {
    return http.get('/detail_excise?name='+name+'&&by='+by+'&&sort='+sort+'&&registration_status='+registration_status);
  }
  getDetailmap() {
    return http.get('/detail_excise/getmap');
  } 
  getlExciseNo(name,lon,lat) {
    return http.get('/detail_excise/getExciseNo?name='+name+'&lon=' + lon+'&&lat='+lat);
  }
  getDetailExcise(id) {
    return http.get(`/detail_excise/` + id);
  }
  getDetailCount() {
    return http.get(`/detail_excise/count`);
  }
  getDetailCountOpen() {
    return http.get(`/detail_excise/countall`);
  }
  getByexiseno(id) {
    return http.get(`/detail_excise/exiseno/` + id);
  }
  createDetailExcise(data) {
    return http.post('/detail_excise', data);
  }
  updateDetailExcise(id, data) {
    return http.put(`/detail_excise/${id}`, data);
  }
  getDetailExcisesNull() {
    return http.get('/detail_excise/latnull/');
  }
  updateImageDetailExcise(id, data) {
    return http.put(`/detail_excise/image/${id}`, data);
  }
  upload(data) {
    return http.post('/upload', data);
  }
}

export default new DetailExciseService();