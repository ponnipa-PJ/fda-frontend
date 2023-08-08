import http from "../http-common";

class DashboardService {
  getAllLevelDashboards() {
    return http.get(`/dashboard`);
  }
  getAllLevelDashboard(id) {
    return http.get(`/dashboard/`+id);
  }
  getTypeOneDashboards() {
    return http.get(`/dashboard/gettypeone`);
  }
  getTypeTwoDashboards() {
    return http.get(`/dashboard/gettypetwo`);
  }
  getTypeThreeDashboards() {
    return http.get(`/dashboard/gettypethree`);
  }
  getDetailTypeDashboard(id) {
    return http.get(`/dashboard/getdetailtype/`+id);
  }
  getExcelDashboard(id) {
    return http.get(`/dashboard/getexcelbyid/`+id);
  }
  
}

export default new DashboardService();