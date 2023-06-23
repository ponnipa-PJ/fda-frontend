import http from "../http-common";

class ReportService {
  getVerifies(verify) {
    return http.get('/report?verify='+verify);
  }
  getVerify(id) {
    return http.get('/report/'+id);
  }
  createReport(data) {
    return http.post('/report', data);
  }  
  getCheckReport() {
    return http.get('/report/getreport');
  }
}

export default new ReportService();