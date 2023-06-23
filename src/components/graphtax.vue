<template>
  <div style="padding: 5px">
    <div>
      <div class="row">
        <div class="col-md-12" v-if="current.length != 0">
          <div id="chart">
            <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" rowspan="2" style="vertical-align : middle;text-align: center">ปริมาณการชำระภาษี</th>
                <th scope="col" :colspan="span" style="text-align: center">
                  รายการสินค้า
                </th>
              </tr>
              <tr>
                <th colspan="2" scope="col" style="text-align: center" v-for="(s, i) in series" :key="i">
                  {{ s.name }}
                </th>
                <th style="text-align: center" colspan="2">รวม</th>
                <th style="text-align: center" colspan="3"></th>
              </tr>
              <tr>
                <th scope="col" style="text-align: center" v-for="(h, i) in headmonthtext" :key="i">
                  {{ h }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, td) in taxdatalist" :key="td + 1">
                <th>{{ t.n }}</th>
                <th v-for="(d, ii) in t.data" :key="ii" style="text-align: right">{{ d }}</th>
                <th style="text-align: right">{{ numberWithCommas(sumnumber[td]) || 0 }}</th>
                <th style="text-align: right">{{ numberWithCommas(sumvolume[td]) || 0 }}</th>
                <th style="text-align: right">{{ numberWithCommas(taxsum[td]) || 0}}</th>
              </tr>
              <!-- <tr v-for="(t, ii) in volumnlist" :key="ii">
                <th>{{t.n}}</th>
                 <th style="text-align: right;">{{numberWithCommas(t.number) || 0}}</th>
                 <th style="text-align: right;">{{numberWithCommas(t.volume_liquor) || 0}}</th>
                  <th style="text-align: right;" v-if="head.length >= 2">{{numberWithCommas(t.numbertwo) || 0}}</th>
                 <th style="text-align: right;" v-if="head.length >= 2">{{numberWithCommas(t.volume_liquortwo) || 0}}</th>
                  <th style="text-align: right;" v-if="head.length == 3">{{numberWithCommas(t.numberthree) || 0}}</th>
                 <th style="text-align: right;" v-if="head.length == 3">{{numberWithCommas(t.volume_liquorthree) || 0}}</th>
                  <th style="text-align: right;" v-if="head.length == 2">{{numberWithCommas(t.number+t.numbertwo) || 0}}</th>
                 <th style="text-align: right;" v-if="head.length == 2" >{{numberWithCommas(t.volume_liquor+t.volume_liquortwo) || 0}}</th>
                  <th style="text-align: right;" v-if="head.length ==3">{{numberWithCommas(t.number+t.numbertwo+t.numberthree) || 0}}</th>
                 <th style="text-align: right;" v-if="head.length == 3" >{{numberWithCommas(t.volume_liquor+t.volume_liquortwo+t.volume_liquorthree) || 0}}</th>
                 <th style="text-align: right;">{{numberWithCommas(t.tax) || 0}}</th>
                </tr> -->
              <tr>
                <th class="table-secondary" style="font-weight: bold">รวม</th>

                <th v-for="(hea, i) in overalltax" class="table-secondary" :key="i + 100"
                  style="text-align: center; font-weight: bold">{{ numberWithCommas(hea) }}</th>
                <!-- <th
                  class="table-secondary"
                  style="text-align: center; font-weight: bold"
                >
                  {{ numberWithCommas(sumvolumnlist.num1) }} 
                </th>
                 <th
                  class="table-secondary"
                  style="text-align: center; font-weight: bold"
                >
                  {{ numberWithCommas(sumvolumnlist.vol1) }} 
                </th>
                <th
                v-if="head.length >= 2"
                  class="table-secondary"
                  style="text-align: center; font-weight: bold"
                >
                  {{ numberWithCommas(sumvolumnlist.num2) }} 
                </th>
                 <th
                 v-if="head.length >= 2"
                  class="table-secondary"
                  style="text-align: center; font-weight: bold"
                >
                  {{ numberWithCommas(sumvolumnlist.vol2) }} 
                </th>
                <th
                v-if="head.length ==3"
                  class="table-secondary"
                  style="text-align: center; font-weight: bold"
                >
                  {{ numberWithCommas(sumvolumnlist.num3) }} 
                </th>
                 <th
                v-if="head.length ==3"
                  class="table-secondary"
                  style="text-align: center; font-weight: bold"
                >
                  {{ numberWithCommas(sumvolumnlist.vol3) }} 
                </th>
                <th
                v-if="head.length >= 2"
                  class="table-secondary"
                  style="text-align: center; font-weight: bold"
                >
                  {{ numberWithCommas(sumvolumnlist.sumnum) }} 
                </th>
                 <th
                 v-if="head.length >= 2"
                  class="table-secondary"
                  style="text-align: center; font-weight: bold"
                >
                  {{ numberWithCommas(sumvolumnlist.sumvol) }} 
                </th>
                 <th
                  class="table-secondary"
                  style="text-align: center; font-weight: bold"
                >
                  {{ numberWithCommas(sumvolumnlist.sumtax) }} 
                </th> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-12" v-else style="text-align:center">ไม่พบข้อมูลการชำระภาษี</div>
      </div>
    </div>
  </div>
</template>

<script>
// import longdo from "longdo-map-vue";
import DetailExciseService from "../services/DetailExciseService.js";
import MergeLiquorReportService from "../services/MergeLiquorReportService.js";

export default {
  name: "App",
  components: {},
  data() {
    return {
      date: "",
      data: [],
      excise_no: "",
      show: false,
      series: [],
      numthreethree: [],
      numsixtwofive: [],
      numsixthree: [],
      numseven: [],
      numsevenfive: [],
      numthreethreecurrent: [],
      numsixtwofivecurrent: [],
      numsixthreecurrent: [],
      numsevencurrent: [],
      numsevenfivecurrent: [],
      table: [],
      chartOptions: {},
      detail: [],
      month: [],
      sumthreethree: 0,
      sumsixtwofive: 0,
      sumsixthree: 0,
      sumseven: 0,
      sumsevenfive: 0,
      sumthreethreey: 0,
      sumsixtwofivey: 0,
      sumsixthreey: 0,
      sumseveny: 0,
      sumsevenfivey: 0,
      total: 0,
      statusthreethree: false,
      statussixtwofive: false,
      statussixthree: false,
      statusseven: false,
      statussevenfive: false,
      tablenew: [
        { month: 10 },
        { month: 11 },
        { month: 12 },
        { month: 1 },
        { month: 2 },
        { month: 3 },
        { month: 4 },
        { month: 5 },
        { month: 6 },
        { month: 7 },
        { month: 8 },
        { month: 9 },
      ],
      monthlist: ['ตุลาคม', 'พฤศจิกายน', 'ธันวาคม', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน'],
      yearcurrent: "",
      report: [],
      excise_id: "",
      brand_name: [],
      diff: [],
      degree: [],
      span: 3,
      spanbrand: 1,
      current: [],
      tbsize: [0.33, 0.625, 0.63, 0.7, 0.75],
      tablecurrent: [],
      list: [],
      sumtaxthreethree: 0,
      sumtaxsixthree: 0,
      sumtaxsixtwofive: 0,
      sumtaxseven: 0,
      sumtaxsevenfive: 0,
      sumtaxthreethreec: 0,
      sumtaxsixthreec: 0,
      sumtaxsixtwofivec: 0,
      sumtaxsevenc: 0,
      sumtaxsevenfivec: 0,
      taxlist: [],
      taxdatacurrent: [],
      headstamp: [],
      head: [],
      size: [],
      sumall: [],
      tbmonth: [],
      category: ['ตุลาคม', 'พฤศจิกายน', 'ธันวาคม', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน']
      ,
      volumnlist: [],
      sumvolumnlist: {},
      taxdatalist: [],
      taxsum: [],
      headmonthtext: [],
      overalltax: [],
      net_tax: 0,
      taxdatalists: [],
      sumnumber : [],
      sumvolume:[],
      allnum:0,
      allvol:0
    };
  },
  methods: {
    calsum(x, y, z, q, w, a) {
      var cal = 0;
      if (x === undefined || x == null) {
        x = 0;
      }
      if (y === undefined || y == null) {
        y = 0;
      }
      if (z === undefined || z == null) {
        z = 0;
      }
      if (q === undefined || q == null) {
        q = 0;
      }
      if (w === undefined || w == null) {
        w = 0;
      }
      if (a === undefined || a == null) {
        a = 0;
      }
      // console.log(x,y,z,q,w);

      cal = parseInt(
        parseInt(x) + parseInt(y) + parseInt(z) + parseInt(q) + parseInt(w) + parseInt(a)
      );
      if (cal === undefined || cal == null) {
        cal = 80000
      }
      // console.log(cal);
      return cal;
    },
    getheader() {

      MergeLiquorReportService.getReportLiquorTaxHeader(this.excise_no).then(
        (res) => {
          this.head = res.data;
          // console.log(res.data);
          MergeLiquorReportService.getvolumetax(this.excise_no, '', '').then((res) => {
            this.volumnlist = res.data
            // console.log(this.volumnlist);
            this.category = []
            // for (let m = 0; m < this.volumnlist.length; m++) {
            //   this.category.push(this.volumnlist[m].n)
            // }
            //               var num1 = 0
            //               var vol1 = 0
            //               var num2 = 0
            //               var vol2 = 0
            //               var num3 = 0
            //               var vol3 = 0
            //               var sumnum = 0
            //               var sumvol = 0
            //               var sumtax = 0
            //               var sumvolgraph = []
            //               var sumvolgraphtwo = []
            //               var sumvolgraphthree = []
            //               for (let v = 0; v < this.volumnlist.length; v++) {
            //                 if (!this.volumnlist[v].number) {
            //                   this.volumnlist[v].number = 0
            //                 }
            //                  if (!this.volumnlist[v].numbertwo) {
            //                   this.volumnlist[v].numbertwo = 0
            //                 }
            //                 if (!this.volumnlist[v].numberthree) {
            //                   this.volumnlist[v].numberthree = 0
            //                 }
            //                 if (!this.volumnlist[v].volume_liquor) {
            //                   this.volumnlist[v].volume_liquor = 0
            //                 }
            //                  if (!this.volumnlist[v].volume_liquortwo) {
            //                   this.volumnlist[v].volume_liquortwo = 0
            //                 }
            //                 if (!this.volumnlist[v].volume_liquorthree) {
            //                   this.volumnlist[v].volume_liquorthree = 0
            //                 }
            //                  if (!this.volumnlist[v].tax) {
            //                   this.volumnlist[v].tax = 0
            //                 }
            //                 num1 = num1 + this.volumnlist[v].number
            //                 vol1 = vol1 + this.volumnlist[v].volume_liquor
            //                  num2 = num2 + this.volumnlist[v].numbertwo
            //                 vol2 = vol2 + this.volumnlist[v].volume_liquortwo
            //                  num3 = num3 + this.volumnlist[v].numberthree
            //                 vol3 = vol3 + this.volumnlist[v].volume_liquorthree
            //                  sumnum = sumnum + this.volumnlist[v].number + this.volumnlist[v].numbertwo+this.volumnlist[v].numberthree
            //                 sumvol = sumvol + this.volumnlist[v].volume_liquor+this.volumnlist[v].volume_liquortwo+this.volumnlist[v].volume_liquorthree
            //                 sumtax = sumtax +this.volumnlist[v].tax
            //                 sumvolgraph.push(this.volumnlist[v].number)
            //                 sumvolgraphtwo.push(this.volumnlist[v].numbertwo)
            //                 sumvolgraphthree.push(this.volumnlist[v].numberthree)
            //               }
            //               this.sumvolumnlist = {
            // num1 : num1 ,
            //                 vol1 : vol1 ,
            //                  num2 : num2 ,
            //                 vol2 : vol2 ,
            //                  num3 : num3 ,
            //                 vol3 : vol3 ,
            //                  sumnum : sumnum,
            //                 sumvol : sumvol ,
            //                 sumtax : sumtax ,
            //               }
            // console.log(this.sumvolumnlist);

            // console.log(this.detail);

          })

          // this.headstamp.push({
          //   a: "เดือนที่ชำระภาษี",
          //   b: "จำนวนแสตมป์",
          //   c: "ปริมาณน้ำสุรา",
          //   d: "ภาษีสุทธิ",
          // });
          // if (res.data.length == 2) {
          //   this.headstamp[0].color ='background-color:#EC7C30'
          //   this.headstamp[0].e = "จำนวนแสตมป์";
          //   this.headstamp[0].f = "ปริมาณน้ำสุรา";
          // }
          // else if (res.data.length == 3) {
          //   this.headstamp[0].e = "จำนวนแสตมป์";
          //   this.headstamp[0].f = "ปริมาณน้ำสุรา";
          //    this.headstamp[0].g = "จำนวนแสตมป์";
          //   this.headstamp[0].h = "ปริมาณน้ำสุรา";
          // }else if (res.data.length == 4) {
          //   this.headstamp[0].e = "จำนวนแสตมป์";
          //   this.headstamp[0].f = "ปริมาณน้ำสุรา";
          //    this.headstamp[0].g = "จำนวนแสตมป์";
          //   this.headstamp[0].h = "ปริมาณน้ำสุรา";
          //   this.headstamp[0].i = "จำนวนแสตมป์";
          //   this.headstamp[0].j = "ปริมาณน้ำสุรา";
          // }
          this.degree.push({
            a: 1,
          });
          // console.log(res.data);
          for (let h = 0; h < res.data.length; h++) {
            if (h == 0) {
              this.degree[0].degree = res.data[h].degree;
              this.size.push({
                size: res.data[h].size,
              });
              this.brand_name.push({
                brand_name: res.data[h].brand_name + '-' + res.data[h].degree + '-' + res.data[h].size,
                color: 'background-color:#77B6EA'
              });
            } else if (h == 1) {
              this.degree[0].degreetwo = res.data[h].degree;
              this.size.push({
                size: res.data[h].size,
              });
              this.brand_name.push({
                brand_name: res.data[h].brand_name + '-' + res.data[h].degree + '-' + res.data[h].size,
                color: 'background-color:#EC7C30'
              });
            } else if (h == 2) {
              this.degree[0].degreetwo = res.data[h].degree;
              this.size.push({
                size: res.data[h].size,
              });
              this.brand_name.push({
                brand_name: res.data[h].brand_name + '-' + res.data[h].degree + '-' + res.data[h].size,
                color: 'background-color:#AC7C30'
              });
            }
          }
        }
      );
      // console.log(this.degree);
      // console.log(this.headstamp);

      this.loadchartOptions();
    },
    uniqurArray(array) {
      var a = array.concat();
      for (var i = 0; i < a.length; i++) {
        for (var j = i + 1; j < a.length; j++) {
          if (a[i].month === a[j].month) {
            a.splice(j--, 1);
          }
        }
      }

      return a;
    },
    loaddata() {
      MergeLiquorReportService.getReportLiquorTaxDetail(
        this.excise_no,
        String(this.yearcurrent - 1 + "-10-01"),
        String(this.yearcurrent + "-09-30")
      ).then((res) => {
        this.current = res.data;
        // console.log(res.data);
        for (let cu = 0; cu < this.current.length; cu++) {
          // console.log(this.current[cu].month);
          for (let tbc = 0; tbc < this.tablenew.length; tbc++) {
            if (this.tablenew[tbc].month == this.current[cu].month) {
              this.tbmonth.push({
                month: this.current[cu].month,
              });
            }
          }
        }
        this.tablecurrent = this.uniqurArray(this.tbmonth);
        // console.log(this.tablecurrent);
        // console.log(this.tbsize);
        for (let c = 0; c < this.current.length; c++) {
          for (let tb = 0; tb < this.tablecurrent.length; tb++) {
            for (let s = 0; s < this.tbsize.length; s++) {
              if (
                this.tbsize[s] == this.current[c].size &&
                this.tablecurrent[tb].month == this.current[c].month
              ) {
                // console.log(this.tablecurrent);
                // console.log(this.tablecurrent[tb].month,this.current[c].month);
                if (this.tbsize[s] == 0.33) {
                  this.tablecurrent[tb].size = 0.33;
                  this.tablecurrent[tb].status = true;
                  this.tablecurrent[tb].summunber = this.current[c].summunber;
                  this.tablecurrent[tb].sumvolume_liquor =
                    this.current[c].sumvolume_liquor;
                  // });
                } else if (this.tbsize[s] == 0.625) {
                  // this.tablecurrent.push({
                  //   month: this.current[c].month,
                  this.tablecurrent[tb].size = 0.625;
                  this.tablecurrent[tb].status = true;
                  this.tablecurrent[tb].summunbersixtwofive =
                    this.current[c].summunber;
                  this.tablecurrent[tb].sumvolume_liquorsixtwofive =
                    this.current[c].sumvolume_liquor;
                  // });
                } else if (this.tbsize[s] == 0.63) {
                  // console.log(this.current[c]);
                  // this.tablecurrent.push({
                  //   month: this.current[c].month,
                  this.tablecurrent[tb].size = 0.63;
                  this.tablecurrent[tb].status = true;
                  this.tablecurrent[tb].summunbersixthree =
                    this.current[c].summunber;
                  this.tablecurrent[tb].sumvolume_liquorsixthree =
                    this.current[c].sumvolume_liquor;
                  if (this.current[c].degree == 35 && this.excise_no == '541022') {
                    this.tablecurrent[tb].moresumvolume_liquorsixthree =
                      this.current[c].sumvolume_liquor;
                    this.tablecurrent[tb].moresummunber =
                      this.current[c].summunber;
                  } else {
                    this.tablecurrent[tb].moresumvolume_liquorsixthree = 0
                    this.tablecurrent[tb].moresummunber = 0
                  }
                  // });
                } else if (this.tbsize[s] == 0.7) {
                  // this.tablecurrent.push({
                  //   month: this.current[c].month,
                  this.tablecurrent[tb].size = 0.7;
                  this.tablecurrent[tb].status = true;
                  this.tablecurrent[tb].summunberseven =
                    this.current[c].summunber;
                  this.tablecurrent[tb].sumvolume_liquorseven =
                    this.current[c].sumvolume_liquor;
                  // });
                } else if (this.tbsize[s] == 0.75) {
                  // this.tablecurrent.push({
                  //   month: this.current[c].month
                  this.tablecurrent[tb].size = 0.75;
                  this.tablecurrent[tb].status = true;
                  this.tablecurrent[tb].summunbersevenfive =
                    this.current[c].summunber;
                  this.tablecurrent[tb].sumvolume_liquorsevenfive =
                    this.current[c].sumvolume_liquor;
                  // });
                }
              }
            }
          }
        }
        // for (let ttt = 0; ttt < this.tablecurrent.length; ttt++) {
        //   if(!this.tablecurrent[ttt].sumvolume_liquorsixthree){
        //     this.tablecurrent[ttt].sumvolume_liquorsixthree = "0"
        //   }
        //   if(!this.tablecurrent[ttt].summunbersixthree){
        //     this.tablecurrent[ttt].summunbersixthree = "0"
        //   }
        // }
        this.summonth();
        // console.log(this.current);
        // console.log(this.tablecurrent);

        // console.log(this.head);
        if (this.head.length > 1) {
          for (let ta = 0; ta < this.tablecurrent.length; ta++) {
            // var c = 0
            for (let ss = 0; ss < this.head.length; ss++) {
              // console.log(this.tablecurrent[ta][0]);
              this.tablecurrent[ta].sumnumberall = 0;
              this.tablecurrent[ta].sumvolumeall = 0;
            }
          }
        }
        // console.log(this.tablecurrent);
      });

    },
    caldif(max, min) {
      if (min == null) {
        min = 0;
      }
      var re = max - min;
      const isValid = Number.isInteger(re);
      // console.log(isValid);
      if (!isValid) {
        re = "";
      }
      return re;
    },
    loadDetail() {
      MergeLiquorReportService.getTablebyfactory_code(this.excise_no)
        .then((res) => {
          // console.log(res.data);
          this.table = res.data;
          this.show = true;
          DetailExciseService.getDetailExcise(this.excise_no).then((res) => {
            this.data = res.data;
            // console.log(res.data);
            this.excise_id = res.data.excise_id;
          });
          for (let tb = 0; tb < this.tablenew.length; tb++) {
            for (let tb1 = 0; tb1 < this.table.length; tb1++) {
              //
              if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 10 &&
                this.table[tb1].year == this.yearcurrent - 2
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 11 &&
                this.table[tb1].year == this.yearcurrent - 2
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 12 &&
                this.table[tb1].year == this.yearcurrent - 2
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 1 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 2 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 3 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 4 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 5 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 6 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 7 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 8 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 9 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degree = this.table[tb1].degree;
                (this.tablenew[tb].seven = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfive = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthree = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofive = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].size = this.table[tb1].size),
                  (this.tablenew[tb].sumnumber = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethree = this.table[tb1].threethree),
                  (this.tablenew[tb].year = this.table[tb1].year);
                this.sumthreethree =
                  this.sumthreethree + this.table[tb1].threethree;
                this.sumsixtwofive =
                  this.sumsixtwofive + this.table[tb1].sixtwofive;
                this.sumsixthree = this.sumsixthree + this.table[tb1].sixthree;
                this.sumseven = this.sumseven + this.table[tb1].seven;
                this.sumsevenfive =
                  this.sumsevenfive + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 10 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 11 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
                this.sumsevenfive + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 12 &&
                this.table[tb1].year == this.yearcurrent - 1
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 1 &&
                this.table[tb1].year == this.yearcurrent
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 2 &&
                this.table[tb1].year == this.yearcurrent
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 3 &&
                this.table[tb1].year == this.yearcurrent
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 4 &&
                this.table[tb1].year == this.yearcurrent
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 5 &&
                this.table[tb1].year == this.yearcurrent
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 6 &&
                this.table[tb1].year == this.yearcurrent
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 7 &&
                this.table[tb1].year == this.yearcurrent
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 8 &&
                this.table[tb1].year == this.yearcurrent
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              } else if (
                this.table[tb1].month == this.tablenew[tb].month &&
                this.tablenew[tb].month == 9 &&
                this.table[tb1].year == this.yearcurrent
              ) {
                this.tablenew[tb].degreey = this.table[tb1].degree;
                (this.tablenew[tb].seveny = this.table[tb1].seven),
                  (this.tablenew[tb].sevenfivey = this.table[tb1].sevenfive),
                  (this.tablenew[tb].sixthreey = this.table[tb1].sixthree),
                  (this.tablenew[tb].sixtwofivey = this.table[tb1].sixtwofive),
                  (this.tablenew[tb].sizey = this.table[tb1].size),
                  (this.tablenew[tb].sumnumbery = this.table[tb1].sumnumber),
                  (this.tablenew[tb].threethreey = this.table[tb1].threethree),
                  (this.tablenew[tb].yeary = this.table[tb1].year);
                this.sumthreethreey =
                  this.sumthreethreey + this.table[tb1].threethree;
                this.sumsixtwofivey =
                  this.sumsixtwofivey + this.table[tb1].sixtwofive;
                this.sumsixthreey =
                  this.sumsixthreey + this.table[tb1].sixthree;
                this.sumseveny = this.sumseveny + this.table[tb1].seven;
                this.sumsevenfivey =
                  this.sumsevenfivey + this.table[tb1].sevenfive;
              }
            }
          }
          // console.log(this.tablenew);
          for (let t = 0; t < this.table.length; t++) {
            //
            if (
              this.table[t].month == 10 &&
              this.table[t].year == this.yearcurrent - 2
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 11 &&
              this.table[t].year == this.yearcurrent - 2
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 12 &&
              this.table[t].year == this.yearcurrent - 2
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 1 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 2 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 3 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 4 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 5 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 6 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 7 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 8 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 9 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethree.push(this.table[t].threethree);
              this.numsixtwofive.push(this.table[t].sixtwofive);
              this.numsixthree.push(this.table[t].sixthree);
              this.numseven.push(this.table[t].seven);
              this.numsevenfive.push(this.table[t].sevenfive);
            }
            // //
            else if (
              this.table[t].month == 10 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 11 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 12 &&
              this.table[t].year == this.yearcurrent - 1
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 1 &&
              this.table[t].year == this.yearcurrent
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 2 &&
              this.table[t].year == this.yearcurrent
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 3 &&
              this.table[t].year == this.yearcurrent
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 4 &&
              this.table[t].year == this.yearcurrent
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 5 &&
              this.table[t].year == this.yearcurrent
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 6 &&
              this.table[t].year == this.yearcurrent
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 7 &&
              this.table[t].year == this.yearcurrent
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 8 &&
              this.table[t].year == this.yearcurrent
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            } else if (
              this.table[t].month == 9 &&
              this.table[t].year == this.yearcurrent
            ) {
              this.numthreethreecurrent.push(this.table[t].threethree);
              this.numsixtwofivecurrent.push(this.table[t].sixtwofive);
              this.numsixthreecurrent.push(this.table[t].sixthree);
              this.numsevencurrent.push(this.table[t].seven);
              this.numsevenfivecurrent.push(this.table[t].sevenfive);
            }
          }
          for (let g = 0; g < this.tablenew.length; g++) {
            if (this.tablenew[g].year == null) {
              this.numthreethree.splice([g], 0, 0);
              this.numsixtwofive.splice([g], 0, 0);
              this.numsixthree.splice([g], 0, 0);
              this.numseven.splice([g], 0, 0);
              this.numsevenfive.splice([g], 0, 0);
            }
          }
          // for (let tg = 0; tg < this.tablenew.length; tg++) {
          //   if (this.tablenew[tg].sumnumbery != this.numsixthreecurrent[tg]) {
          //     console.log(this.numsixthreecurrent[tg]);
          //   }
          // }
          // console.log(this.tablenew);
          // console.log(this.numsixthreecurrent);
          MergeLiquorReportService.getDetailbyfactory_code(this.excise_no).then(
            (res) => {
              // console.log(res.data);
              this.detail = res.data;
              if (this.detail.length > 1) {
                this.span = this.detail.length * 2 * 2;
                this.spanbrand = this.detail.length;
              }
              // console.log(this.volumnlist);
              // for (let s = 0; s < this.series.length; s++) {
              //   if (this.series[s].year == this.yearcurrent - 2) {
              //     if (this.series[s].size == 0.33) {
              //       this.statusthreethree = true;
              //       this.series[s]["data"] = this.numthreethree;
              //     } else if (this.series[s].size == 0.625) {
              //       this.statussixtwofive = true;
              //       this.series[s]["data"] = this.numsixtwofive;
              //     } else if (this.series[s].size == 0.63) {
              //       this.statussixthree = true;
              //       console.log(this.series[s].degree);
              //       if (this.series[s].degree == 35 && this.excise_no == '541022') {
              //         this.series[s]["data"] = [0,0,0,0,0,0,0,0]
              //       }else{
              //         this.series[s]["data"] = this.numsixthree;
              //       }
              //     } else if (this.series[s].size == 0.7) {
              //       this.statusseven = true;
              //       this.series[s]["data"] = this.numseven;
              //     } else if (this.series[s].size == 0.75) {
              //       this.statussevenfive = true;
              //       this.series[s]["data"] = this.numsevenfive;
              //     }
              //   } else if (this.series[s].year == this.yearcurrent - 1) {
              //     if (this.series[s].size == 0.33) {
              //       this.statusthreethree = true;
              //       this.series[s]["data"] = this.numthreethreecurrent;
              //     } else if (this.series[s].size == 0.625) {
              //       this.statussixtwofive = true;
              //       this.series[s]["data"] = this.numsixtwofivecurrent;
              //     } else if (this.series[s].size == 0.63) {
              //       this.statussixthree = true;

              //       console.log(this.series[s]);
              //       if (this.series[s].degree == 35 && this.excise_no == '541022') {
              //         this.series[s]["data"] = [0,0,0,0,0,0,0,0]
              //       }else{
              //         this.series[s]["data"] = this.numsixthreecurrent;
              //       }
              //     } else if (this.series[s].size == 0.7) {
              //       this.statusseven = true;
              //       this.series[s]["data"] = this.numsevencurrent;
              //     } else if (this.series[s].size == 0.75) {
              //       this.statussevenfive = true;
              //       this.series[s]["data"] = this.numsevenfivecurrent;
              //     }
              //   }
              // } 

              // this.series[s]["data"] = this.numthreethreecurrent;
              // for (let tc = 0; tc < this.tablenew.length; tc++) {
              //   if (this.tablenew[tc].month == 10 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('ตุลาคม')
              //   }else if (this.tablenew[tc].month == 11 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('พฤศจิกายน')
              //   }else if (this.tablenew[tc].month == 12 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('ธันวาคม')
              //   }else if (this.tablenew[tc].month == 1 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('มกราคม')
              //   }else if (this.tablenew[tc].month == 2 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('กุมภาพันธ์')
              //   }else if (this.tablenew[tc].month == 3 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('มีนาคม')
              //   }else if (this.tablenew[tc].month == 4 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('เมษายน')
              //   }else if (this.tablenew[tc].month == 5 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('พฤษภาคม')
              //   }else if (this.tablenew[tc].month == 6 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('มิถุนายน')
              //   }else if (this.tablenew[tc].month == 7 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('กรกฎาคม')
              //   }else if (this.tablenew[tc].month == 8 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('สิงหาคม')
              //   }else if (this.tablenew[tc].month == 9 && this.tablenew[tc].yeary != null) {                  
              //     this.category.push('กันยายน')
              //   }
              // }
              this.loadchartOptions();
            }
          );
        })
        .catch((err) => {
          this.show = false;
          alert("ไม่พบข้อมูล");
          // this.$router.push("/map");
          console.log(err);
        });
    },
    loadchartOptions() {
      this.chartOptions = {
        chart: {
          height: 500,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA", "#EC7C30", "#9c27b0", "#e91e63", "#E3DFD6"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "กราฟแสดงการชำระภาษีสุรา ปีงบประมาณ " + this.yearcurrent,
          align: "left",
          style: {
            fontSize: "9px",
          },
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 0,
        },
        xaxis: {
          // categories: this.month,
          categories: this.category,
          title: {
            text: "เดือนที่ชำระภาษี",
            style: {
              fontSize: "9px",
            },
          },
          labels: {
            style: {
              fontSize: "9px",
            },
          },
        },
        yaxis: {
          title: {
            text: "จำนวนดวงแสตมป์ (ดวง)",
            style: {
              fontSize: "9px",
            },
          },
          labels: {
            style: {
              fontSize: "9px",
            },
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      };
    },
    convertdatetothai(datetimes) {
      if (datetimes) {
        var d = new Date(datetimes);
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var yy = d.getFullYear();

        var myDateString = dd + "/" + mm + "/" + yy; //(US)
        // console.log(myDateString);
        return myDateString;
      }
    },

    cal(number, per_each, degree, size) {
      // console.log(this.excise_no);
      var x1 = 0;
      var x2 = 0;
      var x3 = 0;
      var x4 = 0;
      if (this.excise_no == 540002) {
        x1 = ((10 * number) / 100) * per_each;
        // console.log(x1);
        // var x2 = ((155*30)/100)*0.63*1500;
        x2 = ((150 * degree) / 100) * size * number;
        // console.log(x2);
        return (x1 + x2).toFixed(2);
      } else {
        x3 = ((2 * number) / 100) * per_each;
        // console.log(x1);
        // var x2 = ((155*30)/100)*0.63*1500;
        x4 = ((155 * degree) / 100) * size * number;
        // console.log(x2);
        return (x3 + x4).toFixed(2);
      }
    },
    loadnet() {
      MergeLiquorReportService.getReportLiquorTax(this.excise_no)
        .then((res) => {
          // console.log(res.data);
          this.list = res.data;
          // var sum_net_tax = 0;
          // for (let i = 0; i < this.list.length; i++) {
          //   this.list[i].net = this.cal(
          //     res.data[i].number,
          //     res.data[i].per_each,
          //     res.data[i].degree,
          //     res.data[i].size
          //   );
          // }
          // console.log(this.list);
          this.taxlist = this.groupBy(this.list, "month");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    groupBy(array, key) {
      const result = {};
      array.forEach((item) => {
        if (!result[item[key]]) {
          result[item[key]] = [];
        }
        result[item[key]].push(item);
      });
      return result;
    },
    summonth() {
      // console.log(this.taxlist);
      // console.log(this.tablecurrent);
      // console.log(this.taxlist[1].length);
      for (let tax = 0; tax < this.tablenew.length; tax++) {
        this.sumtaxthreethree = 0;
        this.sumtaxsixthree = 0;
        this.sumtaxsixtwofive = 0;
        this.sumtaxseven = 0;
        this.sumtaxsevenfive = 0;
        this.sumtaxthreethreec = 0;
        this.sumtaxsixthreec = 0;
        this.sumtaxsixtwofivec = 0;
        this.sumtaxsevenc = 0;
        this.sumtaxsevenfivec = 0;
        var m = 10;
        // console.log(taxlist);
        if (this.taxlist[tax + 1]) {
          for (let tbl = 0; tbl < this.taxlist[tax + 1].length; tbl++) {
            // console.log(this.taxlist[tax+1].length);
            for (let s = 0; s < this.tbsize.length; s++) {
              // console.log(this.taxlist[tax + 1][tbl].month,this.taxlist[tax + 1][tbl].year);
              if (
                ((this.taxlist[tax + 1][tbl].month == 10 &&
                  this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 11 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 12 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 1 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
                  (this.taxlist[tax + 1][tbl].month == 2 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
                  (this.taxlist[tax + 1][tbl].month == 3 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
                  (this.taxlist[tax + 1][tbl].month == 4 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
                  (this.taxlist[tax + 1][tbl].month == 5 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
                  (this.taxlist[tax + 1][tbl].month == 6 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
                  (this.taxlist[tax + 1][tbl].month == 7 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
                  (this.taxlist[tax + 1][tbl].month == 8 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
                  (this.taxlist[tax + 1][tbl].month == 9 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent)) &&
                this.taxlist[tax + 1][tbl].size == this.tbsize[s]
              ) {
                m = this.taxlist[tax + 1][tbl].month;
                if (this.tbsize[s] == 0.33) {
                  if (this.taxlist[tax + 1][tbl].net == null) {
                    this.taxlist[tax + 1][tbl].net = 0
                  }
                  this.sumtaxthreethreec = Math.floor(
                    parseFloat(this.sumtaxthreethreec) +
                    parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.63) {
                  if (this.taxlist[tax + 1][tbl].net == null) {
                    this.taxlist[tax + 1][tbl].net = 0
                  }
                  this.sumtaxsixthreec = Math.floor(
                    parseFloat(this.sumtaxsixthreec) +
                    parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.625) {
                  if (this.taxlist[tax + 1][tbl].net == null) {
                    this.taxlist[tax + 1][tbl].net = 0
                  }
                  this.sumtaxsixtwofivec = Math.floor(
                    parseFloat(this.sumtaxsixtwofivec) +
                    parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.7) {
                  if (this.taxlist[tax + 1][tbl].net == null) {
                    this.taxlist[tax + 1][tbl].net = 0
                  }
                  this.sumtaxsevenc = Math.floor(
                    parseFloat(this.sumtaxsevenc) +
                    parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.75) {
                  if (this.taxlist[tax + 1][tbl].net == null) {
                    this.taxlist[tax + 1][tbl].net = 0
                  }
                  this.sumtaxsevenfivec = Math.floor(
                    parseFloat(this.sumtaxsevenfivec) +
                    parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                }
              }
            }
          }
        }
        if (this.sumtaxthreethreec) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.33,
            sumtaxy: this.sumtaxthreethreec,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.33,
            sumtaxy: 0,
          });
        }
        if (this.sumtaxsixthreec) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.63,
            sumtaxy: this.sumtaxsixthreec,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.63,
            sumtaxy: 0,
          });
        }
        if (this.sumtaxsixtwofivec) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.625,
            sumtaxy: this.sumtaxsixtwofivec,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.625,
            sumtaxy: 0,
          });
        }
        if (this.sumtaxsevenfivec) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.75,
            sumtaxy: this.sumtaxsevenfivec,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.75,
            sumtaxy: 0,
          });
        }
        if (this.sumtaxsevenc) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.7,
            sumtaxy: this.sumtaxsevenc,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.7,
            sumtaxy: 0,
          });
        }
      }
      // console.log(this.sumtaxsevenfivec);
      // console.log(this.taxdatacurrent);
      for (let mm = 0; mm < this.tablecurrent.length; mm++) {
        for (let ss = 0; ss < this.tbsize.length; ss++) {
          var taxs = 0;
          for (let tc = 0; tc < this.taxdatacurrent.length; tc++) {
            if (this.tablecurrent[mm].month == this.taxdatacurrent[tc].month) {
              taxs = taxs + this.taxdatacurrent[tc].sumtaxy;
              this.tablecurrent[mm].tax = taxs;
            }
          }
        }
      }

      for (let t = 0; t < this.tablecurrent.length; t++) {
        if (this.tablecurrent[t].status != true) {
          // console.log(this.tablecurrent[t].month);
          this.tablecurrent.splice(t);
        }
      }
      this.sumtotalall();
    },
    sumtotalall() {
      // console.log(this.tablecurrent);
      var allsummunberthreethree = 0;
      var sumvolume_liquorthreethree = 0;
      var allsummunbersixtwofive = 0;
      var sumvolume_liquorsixtwofive = 0;
      var allsummunbersixthree = 0;
      var sumvolume_liquorsixthree = 0;
      var allsummunberseven = 0;
      var sumvolume_liquorseven = 0;
      var allsummunbersevenfive = 0;
      var sumvolume_liquorsevenfive = 0;
      var tax = 0;
      var moresumvolume_liquorsixthree = 0;
      var moresummunber = 0;
      for (let a = 0; a < this.tablecurrent.length; a++) {
        // console.log(this.tablecurrent[a]);
        if (this.tablecurrent[a].summunber) {
          allsummunberthreethree =
            allsummunberthreethree + this.tablecurrent[a].summunber;
        }
        if (this.tablecurrent[a].sumvolume_liquor) {
          sumvolume_liquorthreethree =
            sumvolume_liquorthreethree + this.tablecurrent[a].sumvolume_liquor;
        }
        if (this.tablecurrent[a].summunbersixtwothree) {
          allsummunbersixtwofive =
            allsummunbersixtwofive + this.tablecurrent[a].summunbersixtwothree;
        }
        if (this.tablecurrent[a].sumvolume_liquorsixtwofive) {
          sumvolume_liquorsixtwofive =
            sumvolume_liquorsixtwofive +
            this.tablecurrent[a].sumvolume_liquorsixtwofive;
        }
        if (this.tablecurrent[a].summunbersixthree) {
          allsummunbersixthree =
            allsummunbersixthree + this.tablecurrent[a].summunbersixthree;
        }
        if (this.tablecurrent[a].sumvolume_liquorsixthree) {
          sumvolume_liquorsixthree =
            sumvolume_liquorsixthree +
            this.tablecurrent[a].sumvolume_liquorsixthree;
        }
        if (this.tablecurrent[a].summunberseven) {
          allsummunberseven =
            allsummunberseven + this.tablecurrent[a].summunberseven;
        }
        if (this.tablecurrent[a].sumvolume_liquorseven) {
          sumvolume_liquorseven =
            sumvolume_liquorseven + this.tablecurrent[a].sumvolume_liquorseven;
        }
        if (this.tablecurrent[a].summunbersevenfive) {
          allsummunbersevenfive =
            allsummunbersevenfive + this.tablecurrent[a].summunbersevenfive;
        }
        if (this.tablecurrent[a].sumvolume_liquorsevenfive) {
          sumvolume_liquorsevenfive =
            sumvolume_liquorsevenfive +
            this.tablecurrent[a].sumvolume_liquorsevenfive;
        }
        if (this.tablecurrent[a].moresumvolume_liquorsixthree) {
          moresumvolume_liquorsixthree =
            moresumvolume_liquorsixthree +
            this.tablecurrent[a].moresumvolume_liquorsixthree;
        }
        if (this.tablecurrent[a].moresummunber) {
          moresummunber =
            moresummunber +
            this.tablecurrent[a].moresummunber;
        }
        tax = tax + this.tablecurrent[a].tax;
      }
      // console.log(sumvolume_liquorsevenfive);
      this.sumall.push({
        allsummunberthreethree: allsummunberthreethree,
        sumvolume_liquorthreethree: sumvolume_liquorthreethree,
        allsummunbersixthree: allsummunbersixthree,
        sumvolume_liquorsixthree: sumvolume_liquorsixthree,
        allsummunbersixtwofive: allsummunbersixtwofive,
        sumvolume_liquorsixtwofive: sumvolume_liquorsixtwofive,
        allsummunberseven: allsummunberseven,
        sumvolume_liquorseven: sumvolume_liquorseven,
        allsummunbersevenfive: allsummunbersevenfive,
        sumvolume_liquorsevenfive: sumvolume_liquorsevenfive,
        tax: tax,
        moresumvolume_liquorsixthree: moresumvolume_liquorsixthree,
        moresummunber: moresummunber,
      });
    },
    numberWithCommas(x) {
      var r = 0;
      x = parseInt(x);
      if (isNaN(x)) {
        r = "";
      } else {
        r = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return r;
    },
    gettax() {

      var date = new Date()
      var year = date.getFullYear() + 543
      this.taxdatalist = [{ m: 10, n: 'ตุลาคม', y: year - 1 }, { m: 11, n: 'พฤศจิกายน', y: year - 1 }, { m: 12, n: 'ธันวาคม', y: year - 1 }, { m: 1, n: 'มกราคม', y: year }, { m: 2, n: 'กุมภาพันธ์', y: year }, { m: 3, n: 'มีนาคม', y: year }, { m: 4, n: 'เมษายน', y: year }, { m: 5, n: 'พฤษภาคม', y: year }, { m: 6, n: 'มิถุนายน', y: year }]
      MergeLiquorReportService.getaxlist(this.excise_no, '', '', '', '', '').then(
        (res) => {
          this.taxdatalist = res.data

          // console.log(this.taxdatalist);
        });
        MergeLiquorReportService.getnettax(this.excise_no, '', '').then(
          (taxs) => {
            this.taxsum = taxs.data
            // console.log(taxs.data);
          });
          MergeLiquorReportService.getnumber(this.excise_no, '', '').then(
          (taxs) => {
            this.sumnumber = taxs.data
            // console.log(taxs.data);
          });
          MergeLiquorReportService.getvolume(this.excise_no, '', '').then(
          (taxs) => {
            this.sumvolume = taxs.data
            // console.log(taxs.data);
          });
      // for (let tx = 0; tx < this.taxdatalist.length; tx++) {
      //     MergeLiquorReportService.getnumber(this.excise_no, this.taxdatalist[tx].m, this.taxdatalist[tx].y).then(
      //     (res) => {
      //       // console.log(taxs.data.tax);
      //       var num = 0
      //       var vol = 0 
      //       num = res.data.number
      //       vol = res.data.volume
      //       num = num == null ? 0 : num;
      //       vol = vol == null ? 0 : vol;
      //       this.sumnumber.push(num)
      //       this.sumvolume.push(vol)
      //       this.allnum = this.allnum+num
      //       this.allvol = this.allvol+vol
      //     });
      // }
    }
  },
  mounted() {

    this.excise_no = this.$route.params.id;
    MergeLiquorReportService.getnetall(this.excise_no).then(
      (taxs) => {
        // console.log(taxs.data);
        var net_tax = 0
        var number = 0
        var volume = 0
        net_tax = taxs.data.net_tax
        net_tax = net_tax == null ? 0 : net_tax;
        number = taxs.data.number
        number = number == null ? 0 : number;
        volume = taxs.data.volume
        volume = volume == null ? 0 : volume;
        this.net_tax = net_tax
        this.allnum = number
        this.allvol = volume
      });
    MergeLiquorReportService.getDetailbyfactory_code(this.excise_no).then(
      (res) => {
        // console.log(res.data);
        this.detail = res.data;
        this.gettax()
        if (this.detail.length > 1) {
          this.span = this.detail.length * 2 * 2;
          this.spanbrand = this.detail.length;
        }
        for (let s = 0; s < this.detail.length; s++) {
          MergeLiquorReportService.getoverall(this.excise_no, this.detail[s].brand_name, this.detail[s].degree, this.detail[s].size).then(
            (taxs) => {
              // console.log(taxs.data);
              var overallnum = 0
              var overallvol = 0
              overallnum = taxs.data.num
              overallvol = taxs.data.vol
              overallnum = overallnum == null ? 0 : overallnum;
              overallvol = overallvol == null ? 0 : overallvol;
              this.overalltax.push(overallnum)
              this.overalltax.push(overallvol)
              if (this.overalltax.length == parseInt(this.detail.length * 2)) {
                this.overalltax.push(this.allnum)
                this.overalltax.push(this.allvol)
                this.overalltax.push(this.net_tax)
              }
            });

          if (s == 0) {
            this.headmonthtext.push('เดือนที่ชำระภาษี')
          }
          this.headmonthtext.push('จำนวนแสตมป์')
          this.headmonthtext.push('ปริมาณน้ำสุรา')
          // console.log(this.headmonthtext);
          MergeLiquorReportService.getdatagraph(this.excise_no, this.detail[s].brand_name, this.detail[s].degree, this.detail[s].size).then(
            (res) => {
              // console.log(res.data);
              var list = res.data
              this.detail[s].data = list
            });
        }


        for (let s = 0; s < this.detail.length; s++) {
          MergeLiquorReportService.getdatagraph(this.excise_no, this.detail[s].brand_name, this.detail[s].degree, this.detail[s].size).then(
            (res) => {
              // console.log(res.data);
              var list = res.data
              this.detail[s].data = list
              this.series.push({
                name:
                  this.detail[s].brand_name +
                  " - " +
                  this.detail[s].degree +
                  " - " +
                  this.detail[s].size,
                size: this.detail[s].size,
                brand: this.detail[s].brand_name,
                style: {
                  fontSize: "9px",
                },
                degree: this.detail[s].degree,
                data: list,
              })
            })

        }
        this.headmonthtext.push('จำนวนแสตมป์')
        this.headmonthtext.push('ปริมาณน้ำสุรา')
        this.headmonthtext.push('ภาษีสุทธิ')

        // console.log(this.taxsum);
      });

    const date = new Date();
    this.date = date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    this.loadnet();
    // console.log(this.$route.params.id);
    const d = new Date();
    this.yearcurrent = parseInt(d.getFullYear() + 543);
    this.getheader();
    //  console.log(this.yearcurrent+543);
    // this.loadDetail();
    this.loaddata();
  },
  computed: {},
};
</script>

<style>
html,
body {
  font-size: 9px;
  height: 100%;
  margin: 0px;
}

.ldmap_placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 100px;
  /* min-height: 620px !important; */
  background: #eee;
  font: 12px/1.2 Tahoma, sans-serif;
  overflow: hidden;
  z-index: 0;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
}

th {
  font-weight: normal;
}

.apexcharts-legend-text {
  font-size: 9px !important;
}
</style>
