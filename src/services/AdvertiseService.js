import http from "../http-common";

class AdvertiseService {
  getadvertises(status) {
    return http.get('/advertise?status='+status);
  }
  getkeyword() {
    return http.get('/advertise/getkeyword');
  }
  getadvertise(id) {
    return http.get('/advertise/'+id);
  }
  createadvertise(data) {
    return http.post('/advertise', data);
  } 
  updateadvertise(id,data) {
    return http.put(`/advertise/${id}`, data);
  }
  deleteadvertise(id) {
    return http.delete(`/advertise/${id}`);
  }
}

export default new AdvertiseService();

