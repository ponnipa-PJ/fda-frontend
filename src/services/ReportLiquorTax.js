import http from "../http-common";

class ReportLiquorTax {
  getReportLiquorTaxs() {
    return http.get('/report_liquor_tax');
  }
  getReportMergeLiquorTaxs() {
    return http.get('/report_liquor_tax/merge');
  }
  getReportLiquorTax(id) {
    console.log(`/report_liquor_tax/`, id);
    return http.get(`/report_liquor_tax/`+id);
  }
  createReportLiquorTax(data) {
    return http.post('/report_liquor_tax', data);
  }  
  updateReportLiquorTax(id,data) {
    return http.put(`/report_liquor_tax/${id}`, data);
  }  
  deleteReportLiquorTax() {
    return http.delete(`/report_liquor_tax`);
  }
  getType () {
    return http.get(`/report_liquor_tax/type/`);
  }
}

export default new ReportLiquorTax();