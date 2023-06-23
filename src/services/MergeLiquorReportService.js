import http from "../http-common";

class MergeLiquorReportService {  
  getMergeLiquorReport (month,year) {
    return http.get(`/merge_liquor_report?month=`+month+'&&year='+year);
  }
  getCountNotTax(month,year,sort) {
    return http.get('/merge_liquor_report/getnottax?month='+month + '&&year='+year+ '&&sort='+sort);
  }
  getMergeLiquorReportByCode (id,startdate,enddate) {
    return http.get('/merge_liquor_report?name='+id + '&&startdate='+startdate+'&&enddate='+enddate);
  }
  getMergeLiquorReportSortDate (startdate,enddate) {
    return http.get(`/merge_liquor_report/sortdate?startdate=`+startdate+'&&enddate='+enddate);
  }
  createMergeLiquorReport(data) {
    return http.post('/merge_liquor_report', data);
  } 
  getDetailbyfactory_code (id) {
    return http.get(`/merge_liquor_report/graph/`+id);
  } 
  getdatagraph (name,brand_name,degree,size) {
    return http.get(`/merge_liquor_report/getdatagraph?name=`+name+'&&brand_name='+brand_name+'&&degree='+degree+'&&size='+size);
  } 
  getTablebyfactory_code (id) {
    return http.get(`/merge_liquor_report/value/`+id);
  }
  getType () {
    return http.get('/merge_liquor_report/type');
  }
  getReportLiquorTax(factory_code){
    return http.get('/merge_liquor_report/liquortaxdetail?factory_code='+factory_code);
  }
  getReportLiquorTaxHeader(factory_code){
    return http.get('/merge_liquor_report/getheader?factory_code='+factory_code);
  }
  getReportLiquorTaxDetail(factory_code,startdate,enddate){
    return http.get('/merge_liquor_report/getfromdate?factory_code='+factory_code+'&&startdate='+startdate+'&&enddate='+enddate);
  }
  getsumall(start,end,code){
    return http.get('/merge_liquor_report/getsumall?start='+start+'&&end='+end+'&&code='+code);
  }
  getvolumetax(name,degree,size){
    return http.get('/merge_liquor_report/getvolumetax?name='+name+'&&degree='+degree+'&&size='+size);
  }
  getlisttax(name,degree,size){
    return http.get('/merge_liquor_report/getlisttax?name='+name+'&&degree='+degree+'&&size='+size);
  }
  getabletax(name,degree,size){
    return http.get('/merge_liquor_report/getabletax?name='+name+'&&degree='+degree+'&&size='+size);
  }
  getaxlist(name,brand_name,degree,size,month,year){
    return http.get('/merge_liquor_report/getaxlist?name='+name+'&&brand_name='+brand_name+'&&degree='+degree+'&&size='+size+'&&month='+month+'&&year='+year);
  }
  getnettax(name,month,year){
    return http.get('/merge_liquor_report/getnettax?name='+name+'&&month='+month+'&&year='+year);
  }
  getnumber(name,month,year){
    return http.get('/merge_liquor_report/getnumber?name='+name+'&&month='+month+'&&year='+year);
  }
  getvolume(name,month,year){
    return http.get('/merge_liquor_report/getvolume?name='+name+'&&month='+month+'&&year='+year);
  }
  getoverall(name,brand_name,degree,size){
    return http.get('/merge_liquor_report/getoverall?name='+name+'&&brand_name='+brand_name+'&&degree='+degree+'&&size='+size);
  }
  getnetall(name){
    return http.get('/merge_liquor_report/getnetall?name='+name);
  }
  
}

export default new MergeLiquorReportService();