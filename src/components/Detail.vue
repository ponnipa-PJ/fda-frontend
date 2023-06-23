<template>
  <div style="padding: 5px">
    <div v-if="show">
      <div class="row">
        <div class="col-md-4">
          <div>{{ data.excise_name }} โดย {{ data.excise_by }}</div>
          <div>ทะเบียนสรรพสามิต {{ data.excise_id }}</div>
          <img
          width="100%"
            :src="data.image"
          />

          <div
            class="mt-5"
            style="border-style: solid; padding: 10px; text-align: center"
          >
            <div>พิกัด<a target="_blank" :href="'//'+data.fac_url" style="color: black; text-decoration: none;"> {{ data.latitude }} , {{ data.longitude }}</a></div>
          </div>
          <div>
            <div
              class="mt-5"
              style="
                width: 150px;
                background-color: green;
                color: white;
                padding: 10px;
                text-align: center;
              "
            >
              การเข้าเยี่ยมผู้ประกอบการ
            </div>
            <div class="mt-5" v-if="report.length == 0"><h5 style="font-size:10px">ไม่พบข้อมูลการเข้าเยี่ยมผู้ประกอบการ</h5></div>
            <table class="table mt-3" v-if="report.length != 0">
              <thead>
                <tr>
                  <th scope="col" class="table-secondary">เลขแผน</th>
                  <th scope="col" class="table-secondary">
                    วันที่รายงานผลการตรวจสอบแล้วเสร็จ
                  </th>
                  <th scope="col" class="table-secondary">วิธีการตรวจสอบ</th>
                  <th scope="col" class="table-secondary">
                    รอบระยะเวลาในการตรวจสอบ
                  </th>
                  <th scope="col" class="table-secondary">ภาษีสรรพสามิต</th>
                  <th scope="col" class="table-secondary">เบี้ยปรับ</th>
                  <th scope="col" class="table-secondary">เงินเพิ่ม</th>
                  <th scope="col" class="table-secondary">
                    ภาษีเพิ่มขึ้นเพื่อราชการส่วนท้องถิ่น
                  </th>
                  <th scope="col" class="table-secondary">รวม</th>
                  <th scope="col" class="table-secondary">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="l in report" :key="l.id">
                  <td>
                    {{ l.plan_no }}
                  </td>
                  <td>{{ convertdatetothai(l.report_date) }}</td>
                  <td>{{ l.verify }}</td>
                  <td>{{ l.period }}</td>
                  <td>{{ l.excise_tax }}</td>
                  <td>{{ l.fine }}</td>
                  <td>{{ l.vat }}</td>
                  <td>{{ l.Increased_taxes }}</td>
                  <td>{{ l.sum }}</td>
                  <td>{{ l.remark }}</td>
                </tr>
              </tbody>
            </table>
            <!-- <h5><a :href="'/liquortaxdetail/'+data.excise_no+'/map'" target="_blank">รายละเอียดการชำระภาษีสุรา</a></h5> -->
            
          </div>
        </div>
        <div class="col-md-8">
          <div style="text-align: right">ข้อมูล ณ วันที่ {{ date }}</div>
          <div style="text-align: right">
            {{data.industrial_no}}
            ม.{{ data.industrial_moo }} ต.{{ data.industrial_subdistrict }}
            อ.{{ data.industrial_district }}
          </div>
          <graphtax />
          <graphvolumnold />
          <!-- <graphvolumn /> -->
          <ReportTax/>
          <!-- <div id="chart">
            <apexchart
              type="line"
              height="350"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">จำนวนดวงแสตมป์</th>
                <th
                  scope="col"
                  class="table-secondary"
                  :colspan="span"
                  style="text-align: center"
                >
                  รายการสินค้า
                </th>
              </tr>
              <tr>
                <th scope="col">(ดวง)</th>
                <th
                :colspan="spanbrand"
                  :class="s.color"
                  scope="col"
                  style="text-align: center"
                  v-for="(s,i) in brand_name"
                  :key="i"
                >
                  {{ s.name }}
                </th>                
                <th
                  class="bg-danger"
                  colspan="2"
                  scope="col"
                  style="text-align: center"
                >
                  ผลต่าง
                </th>
              </tr>
              <tr>
                <th scope="col"></th>
                <th
                  :class="s.color"
                  scope="col"
                  style="text-align: center"
                  v-for="(s,i) in degree"
                  :key="i"
                >
                  {{ s.degree }} ดีกรี
                </th>                
                <th
                  class="table-danger"
                  scope="col"
                  style="text-align: center"
                  v-for="s in detail"
                  :key="s.name"
                >
                  {{ s.degree }} ดีกรี
                </th>
              </tr>
              <tr>
                <th scope="col">เดือนที่ชำระภาษี</th>
                <th
                  :class="s.color"
                  scope="col"
                  style="text-align: center"
                  v-for="s in detail"
                  :key="s.name"
                >
                  {{ s.size }} ลิตร
                </th>
                <th
                  :class="s.color"
                  scope="col"
                  style="text-align: center"
                  v-for="s in detail"
                  :key="s.name"
                >
                  {{ s.size }} ลิตร
                </th>
                <th
                  :class="s.color"
                  scope="col"
                  style="text-align: center"
                  v-for="(s,i) in diff"
                  :key="i"
                >
                  {{ s.size }} ลิตร
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tablenew" :key="t.name">
                <th v-if="t.month == 1">มกราคม</th>
                <th v-if="t.month == 2">กุมภาพันธ์</th>
                <th v-if="t.month == 3">มีนาคม</th>
                <th v-if="t.month == 4">เมษายน</th>
                <th v-if="t.month == 5">พฤษภาคม</th>
                <th v-if="t.month == 6">มิถุนายน</th>
                <th v-if="t.month == 7">กรกฎาคม</th>
                <th v-if="t.month == 8">สิงหาคม</th>
                <th v-if="t.month == 9">กันยายน</th>
                <th v-if="t.month == 10">ตุลาคม</th>
                <th v-if="t.month == 11">พฤศจิกายน</th>
                <th v-if="t.month == 12">ธันวาคม</th>
                <th class="bg-warning"  v-if="statusthreethree" style="text-align: center">
                  {{ t.threethree || 0 }}
                </th>
                <th class="table-success" v-if="statussixtwofive" style="text-align: center">
                  {{ t.sixtwofive || 0 }}
                </th>
                <th class="table-success" v-if="statussixthree" style="text-align: center">
                  {{ t.sixthree || 0 }}
                </th>
                <th class="table-success" v-if="statusseven" style="text-align: center">
                  {{ t.seven || 0 }}
                </th>
                <th class="table-success" v-if="statussevenfive" style="text-align: center">
                  {{ t.sevenfive || 0 }}
                </th>
                <th class="bg-warning" v-if="statusthreethree" style="text-align: center">
                  {{ t.threethreey }}
                </th>
                <th class="table-success" v-if="statussixtwofive" style="text-align: center">
                  {{ t.sixtwofivey }}
                </th>
                <th class="table-success" v-if="statussixthree" style="text-align: center">
                  {{ t.sixthreey }}
                </th>
                <th class="table-success" v-if="statusseven" style="text-align: center">
                  {{ t.seveny }}
                </th>
                <th class="table-success" v-if="statussevenfive" style="text-align: center">
                  {{ t.sevenfivey }}
                </th>
                <th class="table-warning" v-if="statusthreethree" style="text-align: center">
                  {{ caldif(t.threethreey, t.threethree) }}
                </th>
                <th class="table-info" v-if="statussixtwofive" style="text-align: center">
                  {{ caldif(t.sixtwofivey, t.sixtwofive) }}
                </th>
                <th class="table-info" v-if="statussixthree" style="text-align: center">
                  {{ caldif(t.sixthreey, t.sixthree) }}
                </th>
                <th class="table-info" v-if="statusseven" style="text-align: center">
                  {{ caldif(t.seveny, t.seven) }}
                </th>
                <th class="table-info" v-if="statussevenfive" style="text-align: center">
                  {{ caldif(t.sevenfivey, t.sevenfive) }}
                </th>
              </tr>
              <tr>
                <th class="table-secondary" style="font-weight: bold;">รวม</th>
                <th class="table-secondary" v-if="sumthreethree != 0" style="text-align: center;font-weight: bold;">
                  {{ sumthreethree }}
                </th>
                <th class="table-secondary" v-if="sumsixtwofive != 0" style="text-align: center;font-weight: bold;">
                  {{ sumsixtwofive }}
                </th>
                <th class="table-secondary" v-if="sumsixthree != 0" style="text-align: center;font-weight: bold;">
                  {{ sumsixthree }}
                </th>
                <th class="table-secondary" v-if="sumseven != 0" style="text-align: center;font-weight: bold;">
                  {{ sumseven }}
                </th>
                <th class="table-secondary" v-if="sumsevenfive != 0" style="text-align: center;font-weight: bold;">
                  {{ sumsevenfive }}
                </th>
                <th class="table-secondary" v-if="sumthreethree != 0" style="text-align: center;font-weight: bold;">
                  {{ sumthreethreey }}
                </th>
                <th class="table-secondary" v-if="sumsixtwofive != 0" style="text-align: center;font-weight: bold;">
                  {{ sumsixtwofivey }}
                </th>
                <th class="table-secondary" v-if="sumsixthree != 0" style="text-align: center;font-weight: bold;">
                  {{ sumsixthreey }}
                </th>
                <th class="table-secondary" v-if="sumseven != 0" style="text-align: center;font-weight: bold;">
                  {{ sumseveny }}
                </th>
                <th class="table-secondary" v-if="sumsevenfive != 0" style="text-align: center;font-weight: bold;">
                  {{ sumsevenfivey }}
                </th>
              </tr>
            </tbody>
          </table> -->
        </div>
      </div>
    </div>
    <div v-else style="text-align:center" class="mt-5">
      <h5 style="font-size:25px">ไม่พบข้อมูล</h5>
      </div>
  </div>
</template>

<script>
// import longdo from "longdo-map-vue";
import DetailExciseService from "../services/DetailExciseService.js";
import MergeLiquorReportService from "../services/MergeLiquorReportService.js";
import ReportService from "../services/ReportService";
import graphtax from "./graphtax.vue";
// import graphvolumn from "./graphvolumn.vue";
import graphvolumnold from "./graphvolumnold.vue";
import ReportTax from "./ReportTax.vue";

export default {
  name: "App",
  components: {graphtax,
  // graphvolumn,
  graphvolumnold,
  ReportTax},
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
      yearcurrent: "",
      report: [],
      excise_id: "",
      brand_name:[],
      diff:[],
      degree:[],
      span:3,
      spanbrand:1
    };
  },
  methods: {
    getreport() {
      // console.log(this.excise_id);
      ReportService.getVerify(this.excise_id)
        .then((res) => {
          // console.log(res.data);
          this.report = res.data;
        })
        .catch(() => {
          // console.log(e);
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
            this.getreport();
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
                console.log();
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
          MergeLiquorReportService.getDetailbyfactory_code(this.excise_no).then(
            (res) => {
              // console.log(res.data);
              this.detail = res.data;
              if (this.detail.length > 1) {
                this.span = this.detail.length*2*2                
                  this.spanbrand = this.detail.length
              }
              for (let i = 0; i < this.detail.length; i++) {   
                if (this.detail.length == 1) {
                  this.brand_name.push({
                  name:this.detail[i].brand_name + ' ปี ' + String(this.yearcurrent-1),
                  color:'bg-primary'
                }
                );
                this.brand_name.push({
                  name:this.detail[i].brand_name + ' ปี ' + String(this.yearcurrent),
                  color:'bg-success'
                })
                this.degree.push({degree:this.detail[i].degree,
                color:'bg-primary'})  
                this.degree.push({degree:this.detail[i].degree,
                color:'bg-success'})  
                }else{
                  if (i == 0) {
                    this.brand_name.push({
                  name:this.detail[i].brand_name + ' ปี ' + String(this.yearcurrent-1),
                  color:'bg-primary'
                }
                );
                 this.degree.push({degree:this.detail[i].degree,
                color:'bg-primary'})  
                this.degree.push({degree:this.detail[i].degree,
                color:'bg-primary'}) 
                  }else{
                this.brand_name.push({
                  name:this.detail[i].brand_name + ' ปี ' + String(this.yearcurrent),
                  color:'bg-success'
                })
                 this.degree.push({degree:this.detail[i].degree,
                color:'bg-success'})  
                this.degree.push({degree:this.detail[i].degree,
                color:'bg-success'}) 
                  }
                }   
                if (this.detail[i].size == 0.33) {
                  this.detail[i].color = 'bg-warning'
                  
                this.diff.push({size:this.detail[i].size,
                color:'table-warning'})

                }else if (this.detail[i].size == 0.63) {
                  this.detail[i].color = 'table-success'
                  this.diff.push({size:this.detail[i].size,
                color:'table-info'})
                }else if (this.detail[i].size == 0.62) {
                  this.detail[i].color = 'bg-warning'
                  
                this.diff.push({size:this.detail[i].size,
                color:'table-warning'})
                
                }else if (this.detail[i].size == 0.7) {
                  this.detail[i].color = 'table-success'
                  this.diff.push({size:this.detail[i].size,
                color:'table-info'})
                
                }else if (this.detail[i].size == 0.75) {
                  this.detail[i].color = 'table-success'
                  this.diff.push({size:this.detail[i].size,
                color:'table-info'})
                }
                this.series.push({
                  name:
                    this.detail[i].brand_name +
                    " - " +
                    this.detail[i].degree +
                    " - " +
                    this.detail[i].size +
                    " " +
                    String(this.yearcurrent - 1),
                  size: this.detail[i].size,
                  style: {
                    fontSize: "9px",
                  },
                  year: this.yearcurrent - 2,
                });
                this.series.push({
                  name:
                    this.detail[i].brand_name +
                    " - " +
                    this.detail[i].degree +
                    " - " +
                    this.detail[i].size +
                    " " +
                    String(this.yearcurrent),
                  size: this.detail[i].size,
                  style: {
                    fontSize: "9px",
                  },
                  year: this.yearcurrent - 1,
                });
              }
              for (let s = 0; s < this.series.length; s++) {
                if (this.series[s].year == this.yearcurrent - 2) {
                  if (this.series[s].size == 0.33) {
                    this.statusthreethree = true;
                    this.series[s]["data"] = this.numthreethree;
                  } else if (this.series[s].size == 0.625) {
                    this.statussixtwofive = true;
                    this.series[s]["data"] = this.numsixtwofive;
                  } else if (this.series[s].size == 0.63) {
                    this.statussixthree = true;
                    this.series[s]["data"] = this.numsixthree;
                  } else if (this.series[s].size == 0.7) {
                    this.statusseven = true;
                    this.series[s]["data"] = this.numseven;
                  } else if (this.series[s].size == 0.75) {
                    this.statussevenfive = true;
                    this.series[s]["data"] = this.numsevenfive;
                  }
                } else if (this.series[s].year == this.yearcurrent - 1) {
                  if (this.series[s].size == 0.33) {
                    this.statusthreethree = true;
                    this.series[s]["data"] = this.numthreethreecurrent;
                  } else if (this.series[s].size == 0.625) {
                    this.statussixtwofive = true;
                    this.series[s]["data"] = this.numsixtwofivecurrent;
                  } else if (this.series[s].size == 0.63) {
                    this.statussixthree = true;
                    this.series[s]["data"] = this.numsixthreecurrent;
                  } else if (this.series[s].size == 0.7) {
                    this.statusseven = true;
                    this.series[s]["data"] = this.numsevencurrent;
                  } else if (this.series[s].size == 0.75) {
                    this.statussevenfive = true;
                    this.series[s]["data"] = this.numsevenfivecurrent;
                  }
                }
              }
              // console.log(this.brand_name);
              this.loadchartOptions();
            }
          );
        })
        .catch((err) => {
          this.show = false;
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
        colors: ["#77B6EA", "#545454", "#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "กราฟแสดงการชำระภาษีสุรา",
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
          categories: [
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม",
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
          ],
          title: {
            text: "เดือน",
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
            text: "จำนวนขวด หรือดวง",
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
  },
  mounted() {
    const date = new Date();
    this.date = date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    this.excise_no = this.$route.params.id;
    // console.log(this.$route.params.id);
    const d = new Date();
    this.yearcurrent = parseInt(d.getFullYear() + 543);
    //  console.log(this.yearcurrent+543);
    this.loadDetail();
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
th{
  font-weight: normal;
}
</style>
