<template>
  <div class="hello container mt-5">
    <h5 style="text-align: center">รายละเอียดการชำระภาษีสุรา</h5>
    <h5 style="text-align: center">
      {{ data.excise_name }} โดย {{ data.excise_by }}
    </h5>
    <h5 style="text-align: center">ทะเบียนสรรพสามิต {{ data.excise_id }}</h5>
    <h5 style="text-align: center">ปีงบประมาณ {{ yearcurrent }}</h5>
    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th rowspan="2">เดือน</th>
          <th
            scope="col"
            class="table-secondary"
            rowspan="2"
            style="text-align: center"
          >
            ยี่ห้อ
          </th>
          <th
            scope="col"
            class="table-secondary"
            rowspan="2"
            style="text-align: center"
          >
            ดีกรี
          </th>
          <th
            scope="col"
            class="table-secondary"
            rowspan="2"
            style="text-align: center"
          >
            ขนาดบรรจุ
          </th>
          <th scope="col" colspan="3" style="text-align: center">
            ปีนี้ (ต.ค. 64 - ก.ย. 65)
          </th>
          <th scope="col" colspan="3" style="text-align: center">
            ปีก่อน (ต.ค. 63 - ก.ย. 64)
          </th>
          <th scope="col" colspan="4" style="text-align: center">ผลต่าง</th>
        </tr>
        <tr>
          <th style="text-align: center" class="table-secondary">
            จำนวนแสตมป์
          </th>
          <th style="text-align: center" class="table-secondary">
            ปริมาณน้ำสุรา
          </th>
          <th style="text-align: center" class="table-secondary">ภาษีสุรา</th>
          <th style="text-align: center" class="table-secondary">
            จำนวนแสตมป์
          </th>
          <th style="text-align: center" class="table-secondary">
            ปริมาณน้ำสุรา
          </th>
          <th style="text-align: center" class="table-secondary">ภาษีสุรา</th>
          <th style="text-align: center" class="table-secondary">
            จำนวนแสตมป์
          </th>
          <th style="text-align: center" class="table-secondary">
            ปริมาณน้ำสุรา
          </th>
          <th style="text-align: center" class="table-secondary">ภาษีสุรา</th>
          <th style="text-align: center" class="table-secondary">ร้อยละ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(m, i) in content" :key="i">
          <th v-if="m.month == 1">มกราคม</th>
          <th v-if="m.month == 2">กุมภาพันธ์</th>
          <th v-if="m.month == 3">มีนาคม</th>
          <th v-if="m.month == 4">เมษายน</th>
          <th v-if="m.month == 5">พฤษภาคม</th>
          <th v-if="m.month == 6">มิถุนายน</th>
          <th v-if="m.month == 7">กรกฎาคม</th>
          <th v-if="m.month == 8">สิงหาคม</th>
          <th v-if="m.month == 9">กันยายน</th>
          <th v-if="m.month == 10">ตุลาคม</th>
          <th v-if="m.month == 11">พฤศจิกายน</th>
          <th v-if="m.month == 12">ธันวาคม</th>
          <th v-if="m.month == ''"></th>
          <th :style="m.colour" v-if="m.month == 'รวม'">
            {{ m.month }}
          </th>
          <th style="text-align: center">{{ m.brand_name }}</th>
          <th scope="col" style="text-align: center">
            {{ m.degree }}
          </th>
          <th scope="col" style="text-align: center">
            {{ m.size }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ m.summunbery || "" }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ m.sumvolume_liquory || "" }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ m.sumtaxy || "" }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ m.summunber }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ m.sumvolume_liquor }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ m.sumtax || 0 }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ caldiff(m.summunbery, m.summunber) }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ caldiff(m.sumvolume_liquory, m.sumvolume_liquor) }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ caldiff(m.sumtaxy, m.sumtax) }}
          </th>
          <th scope="col" :style="m.colour + ';text-align: right'">
            {{ calpercentage(m.summunbery - m.summunber, m.summunber) }}
          </th>
        </tr>
        <tr v-for="h in header" :key="h.size">
          <td style="text-align: center; font-weight: bold" class="table-info">
            {{ h.title }}
          </td>
          <th
            scope="col"
            style="text-align: center; font-weight: bold"
            class="table-info"
          >
            {{ h.brand_name }}
          </th>
          <th
            scope="col"
            style="text-align: center; font-weight: bold"
            class="table-info"
          >
            {{ h.degree }}
          </th>
          <th
            scope="col"
            style="text-align: center; font-weight: bold"
            class="table-info"
          >
            {{ h.size }}
          </th>
          <th
            scope="col"
            style="text-align: right; font-weight: bold"
            class="table-info"
          >
            {{ h.summunbery }}
          </th>
          <th
            scope="col"
            style="text-align: right; font-weight: bold"
            class="table-info"
          >
            {{ h.summunber }}
          </th>
          <th
            scope="col"
            style="text-align: right; font-weight: bold"
            class="table-info"
          >
            {{ h.sumtax }}
          </th>
          <th
            scope="col"
            style="text-align: right; font-weight: bold"
            class="table-info"
          >
            {{ h.sumvolume_liquory }}
          </th>
          <th
            scope="col"
            style="text-align: right; font-weight: bold"
            class="table-info"
          >
            {{ h.sumvolume_liquor }}
          </th>
          <th style="text-align: right; font-weight: bold" class="table-info">
            {{ h.sumtaxy }}
          </th>
          <th
            scope="col"
            style="text-align: right; font-weight: bold"
            class="table-info"
          >
            {{ h.summunbery - h.sumvolume_liquory }}
          </th>
          <th
            scope="col"
            style="text-align: right; font-weight: bold"
            class="table-info"
          >
            {{ h.summunber - h.sumvolume_liquor }}
          </th>
          <th
            scope="col"
            style="text-align: right; font-weight: bold"
            class="table-info"
          >
            {{ h.sumtax - h.sumtaxy }}
          </th>
          <th
            scope="col"
            style="text-align: right; font-weight: bold"
            class="table-info"
          >
            {{ h.percentage }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MergeLiquorReportService from "../services/MergeLiquorReportService.js";
import DetailExciseService from "../services/DetailExciseService";

export default {
  name: "HelloWorld",
  data() {
    return {
      list: [],
      itemPreviewImage: "",
      id: "",
      item: [],
      data: [],
      img: "",
      image: "",
      net_tax: [],
      startdate: "",
      enddate: "",
      factory_code: "",
      yearcurrent: "",
      newlist: [],
      tbmonth: [
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
      tbsize: [0.33, 0.625, 0.63, 0.7, 0.75],
      header: [],
      content: [],
      tbyear: [],
      before: [],
      current: [],
      taxlist: [],
      summunber: 0,
      summunbery: 0,
      sumvolume_liquor: 0,
      sumvolume_liquory: 0,
      summunbertwo: 0,
      summunberytwo: 0,
      sumvolume_liquortwo: 0,
      sumvolume_liquorytwo: 0,
      difsummunber: 0,
      difsumvolume_liquor: 0,
      difsummunbertwo: 0,
      difsumvolume_liquortwo: 0,
      taxdatabefore: [],
      sumthreethree: 0,
      sumsixthree: 0,
      sumsixtwofive: 0,
      sumseven: 0,
      sumsevenfive: 0,
      taxdatacurrent: [],
      sumthreethreec: 0,
      sumsixthreec: 0,
      sumsixtwofivec: 0,
      sumsevenc: 0,
      sumsevenfivec: 0,
      sumtax: 0,
      sumtaxy: 0,
      sumtaxtwo: 0,
      sumtaxytwo: 0,
      difsumtax: 0,
      difsumtaxtwo: 0,
      percentage: 0,
      percentagetwo: 0,
      months: "",
    };
  },
  props: {
    msg: String,
  },
  computed: {},
  mounted() {
    const d = new Date();
    this.yearcurrent = parseInt(d.getFullYear() + 543);
    this.months = parseInt(d.getMonth());
    // console.log(this.$route.params.id);
    this.factory_code = this.$route.params.id;
    this.loaddata();
    this.getheader();
  },
  methods: {
    caldiff(x, y) {
      var r = 0;
      const ischeck = Number.isInteger(x);
      if (ischeck) {
        r = x - y;
        if (r == "-" + y) {
          r = "";
        }
        // console.log(r);
      } else {
        r = "";
      }
      return r;
    },
    calpercentage(x, y) {
      var r = 0;
      const ischeck = Number.isInteger(x);
      if (ischeck) {
        var a = x / y;
        r = parseFloat(a * 100).toFixed(2);
        if (r == Infinity) {
          r = 0;
        }
      } else {
        r = "";
      }
      return r;
    },
    search() {
      // var startdate = this.convertdatesort(this.startdate);
      // var enddate = this.convertdatesort(this.enddate);
      // console.log(this.enddate);
      MergeLiquorReportService.getReportLiquorTax(this.factory_code).then(
        (res) => {
          this.list = [];
          console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            // if (res.data[i].factory_code == res.data[i - 1].factory_code) {
            // sum_net_tax = res.data[i].net + res.data[i - 1].net;
            // }
            this.list.push({
              tax_payment_date: this.convertdatetothai(
                res.data[i].tax_payment_date
              ),
              no: res.data[i].no,
              factory_code: res.data[i].factory_code,
              brand_name: res.data[i].brand_name,
              number: res.data[i].number,
              degree: res.data[i].degree,
              size: res.data[i].size,
              per_each: res.data[i].per_each,
              volume_liquor: res.data[i].volume_liquor,
              net: this.cal(
                res.data[i].factory_code,
                res.data[i].number,
                res.data[i].per_each,
                res.data[i].degree,
                res.data[i].size
              ),
              colour: "table-success",
            });
          }
          this.cal_net_tax();
        }
      );
    },
    convertdatesort(date) {
      var streetaddress = String(date);
      // console.log(streetaddress);
      var y = streetaddress.substring(0, streetaddress.indexOf("-"));
      var m = streetaddress.substring(7, streetaddress.indexOf("-"));
      m = m.substring(1, 3);
      var d = streetaddress.substring(8, 10);
      y = parseInt(y) + 543;
      var full = y + "-" + m + "-" + d;
      // console.log(d)
      // console.log(m)
      // console.log(y);
      // console.log(full);
      // var timestamp = Date.parse(full);
      // var dateObject = new Date(timestamp);
      // dateObject.setDate(dateObject.getDate() + 1);
      // console.log(dateObject);
      // const result = dateObject.toLocaleDateString("en-EN");
      // console.log(result);
      return full;
    },
    getheader() {
      this.tbyear = [
        this.yearcurrent,
        this.yearcurrent - 1,
        this.yearcurrent - 2,
      ];
      this.show = true;
      DetailExciseService.getDetailExcise(this.factory_code).then((res) => {
        this.data = res.data;
        // console.log(res.data);
      });
      MergeLiquorReportService.getReportLiquorTaxHeader(this.factory_code).then(
        (res) => {
          this.header = res.data;
        }
      );
      MergeLiquorReportService.getReportLiquorTaxDetail(
        this.factory_code,
        String(this.yearcurrent - 2 + "-10-01"),
        String(this.yearcurrent - 1 + "-10-01")
      ).then((res) => {
        this.before = res.data;
        // console.log(this.before);
        MergeLiquorReportService.getReportLiquorTaxDetail(
          this.factory_code,
          String(this.yearcurrent - 1 + "-10-01"),
          String(this.yearcurrent + "-09-01")
        ).then((res) => {
          this.current = res.data;
          // this.content = this.current;
          // console.log(this.before);
          for (let hh = 0; hh < this.tbmonth.length; hh++) {
            for (let hhh = 0; hhh < this.header.length; hhh++) {
              this.content.push({
                month: this.tbmonth[hh].month,
                size: this.header[hhh].size,
                degree: this.header[hhh].degree,
                brand_name: this.header[hhh].brand_name,
                summunber: 0,
                sumvolume_liquor: 0,
                summunbery: 0,
                sumvolume_liquory: 0,
              });
            }
          }
          for (let cc = 0; cc < this.current.length; cc++) {
            for (let con = 0; con < this.content.length; con++) {
              if (
                this.current[cc].month == this.content[con].month &&
                this.current[cc].size == this.content[con].size
              ) {
                this.content[con].summunbery = this.current[cc].summunber;
                this.content[con].sumvolume_liquory =
                  this.current[cc].sumvolume_liquor;
              }
            }
          }
          for (let b = 0; b < this.content.length; b++) {
            for (let c = 0; c < this.before.length; c++) {
              if (
                this.before[c].month == this.content[b].month &&
                this.before[c].size == this.content[b].size
              ) {
                this.content[b].summunber = this.before[c].summunber;
                this.content[b].sumvolume_liquor =
                  this.before[c].sumvolume_liquor;
              }
            }
          }
          console.log(this.content);
          this.summonth();
          // console.log(this.header.length);
          if (this.header.length == 2) {
            for (let i = 0; i < this.content.length; i++) {
              if (
                i == 2 ||
                i == 5 ||
                i == 8 ||
                i == 11 ||
                i == 14 ||
                i == 17 ||
                i == 20 ||
                i == 23 ||
                i == 26 ||
                i == 29 ||
                i == 32
              ) {
                this.content.splice([i], 0, {
                  month: "รวม",
                  summunber:
                    this.content[i - 1].summunber +
                    this.content[i - 2].summunber,
                  summunbery:
                    this.content[i - 1].summunbery +
                    this.content[i - 2].summunbery,
                  sumvolume_liquor:
                    this.content[i - 1].sumvolume_liquor +
                    this.content[i - 2].sumvolume_liquor,
                  sumvolume_liquory:
                    this.content[i - 1].sumvolume_liquory +
                    this.content[i - 2].sumvolume_liquory,
                  sumtax:
                    this.content[i - 1].sumtax + this.content[i - 2].sumtax,
                  sumtaxy:
                    this.content[i - 1].sumtaxy + this.content[i - 2].sumtaxy,
                  colour: "font-weight: bold",
                });
              }
              if (
                i == 1 ||
                i == 4 ||
                i == 7 ||
                i == 10 ||
                i == 13 ||
                i == 16 ||
                i == 19 ||
                i == 22 ||
                i == 25 ||
                i == 28 ||
                i == 31 ||
                i == 34
              ) {
                this.content[i].month = "";
              }
              if (i == 34) {
                this.content.splice([i + 1], 0, {
                  month: "รวม",
                  summunber:
                    this.content[i - 1].summunber + this.content[i].summunber,
                  summunbery:
                    this.content[i - 1].summunbery + this.content[i].summunbery,
                  sumvolume_liquor:
                    this.content[i - 1].sumvolume_liquor +
                    this.content[i].sumvolume_liquor,
                  sumvolume_liquory:
                    this.content[i - 1].sumvolume_liquory +
                    this.content[i].sumvolume_liquory,
                  sumtax: this.content[i - 1].sumtax + this.content[i].sumtax,
                  sumtaxy:
                    this.content[i - 1].sumtaxy + this.content[i].sumtaxy,
                  colour: "font-weight: bold",
                });
              }
            }
          }

          // console.log(this.content);

          if (this.header.length == 2) {
            for (let t = 0; t < this.content.length; t++) {
              if (
                t == 0 ||
                t == 3 ||
                t == 6 ||
                t == 9 ||
                t == 12 ||
                t == 15 ||
                t == 18 ||
                t == 21 ||
                t == 24 ||
                t == 27 ||
                t == 30 ||
                t == 33
              ) {
                // console.log(this.content[t].summunbery - this.content[t].summunber);
                this.summunber = parseInt(
                  this.summunber + this.content[t].summunber
                );
                const isValidsumtaxy = Number.isInteger(
                  this.content[t].sumtaxy
                );
                // console.log(isValidsummunbery);
                if (isValidsumtaxy) {
                  this.sumtax = parseInt(this.sumtax + this.content[t].sumtaxy);
                }
                const isValidsumtax = Number.isInteger(this.content[t].sumtaxy);
                // console.log(isValidsummunbery);
                if (isValidsumtax) {
                  this.sumtaxy = parseInt(
                    this.sumtaxy + this.content[t].sumtax
                  );
                }
                this.sumvolume_liquor = parseInt(
                  this.sumvolume_liquor + this.content[t].sumvolume_liquor
                );
                const isValidsummunbery = Number.isInteger(
                  this.content[t].summunbery
                );
                // console.log(isValidsummunbery);
                if (isValidsummunbery) {
                  this.summunbery = parseInt(
                    this.summunbery + this.content[t].summunbery
                  );
                }
                const isValidsumvolume_liquory = Number.isInteger(
                  this.content[t].sumvolume_liquory
                );
                if (isValidsumvolume_liquory) {
                  this.sumvolume_liquory = parseInt(
                    this.sumvolume_liquory + this.content[t].sumvolume_liquory
                  );
                }
                var cal =
                  this.content[t].summunbery - this.content[t].summunber;
                const ischecks = Number.isInteger(cal);
                if (!ischecks) {
                  cal = 0;
                } else {
                  cal = this.calpercentage(cal, this.content[t].summunber);
                  this.percentage = (
                    parseFloat(this.percentage) + parseFloat(cal)
                  ).toFixed(2);
                }
              }
              if (
                t == 1 ||
                t == 4 ||
                t == 7 ||
                t == 10 ||
                t == 13 ||
                t == 16 ||
                t == 19 ||
                t == 22 ||
                t == 25 ||
                t == 28 ||
                t == 31 ||
                t == 34
              ) {
                this.summunbertwo = parseInt(
                  this.summunbertwo + this.content[t].summunber
                );
                const isValidsumtaxy = Number.isInteger(
                  this.content[t].sumtaxy
                );
                // console.log(isValidsummunbery);
                if (isValidsumtaxy) {
                  this.sumtaxtwo = parseInt(
                    this.sumtaxtwo + this.content[t].sumtaxy
                  );
                }
                this.sumvolume_liquortwo = parseInt(
                  this.sumvolume_liquortwo + this.content[t].sumvolume_liquor
                );
                const isValidsummunbery = Number.isInteger(
                  this.content[t].summunbery
                );
                // console.log(isValidsummunbery);
                if (isValidsummunbery) {
                  this.summunberytwo = parseInt(
                    this.summunberytwo + this.content[t].summunbery
                  );
                }
                const isValidsumtax = Number.isInteger(this.content[t].sumtax);
                // console.log(isValidsummunbery);
                if (isValidsumtax) {
                  this.sumtaxytwo = parseInt(
                    this.sumtaxytwo + this.content[t].sumtax
                  );
                }

                const isValidsumvolume_liquory = Number.isInteger(
                  this.content[t].sumvolume_liquory
                );
                // console.log(this.content[t].sumtax);

                if (isValidsumvolume_liquory) {
                  this.sumvolume_liquorytwo = parseInt(
                    this.sumvolume_liquorytwo +
                      this.content[t].sumvolume_liquory
                  );
                }
                var cals =
                  this.content[t].summunbery - this.content[t].summunber;
                const ischecks = Number.isInteger(cals);
                if (!ischecks) {
                  cals = 0;
                } else {
                  cals = this.calpercentage(cals, this.content[t].summunber);
                  // console.log(cals);
                  this.percentagetwo = (
                    parseFloat(this.percentagetwo) + parseFloat(cals)
                  ).toFixed(2);
                }
              }
            }
          } else {
            for (let t = 0; t < this.content.length; t++) {
              const isValidsummunbery = Number.isInteger(
                this.content[t].summunbery
              );
              // console.log(this.content[t].summunbery);
              if (isValidsummunbery) {
                this.summunbery =
                  parseInt(this.summunbery) +
                  parseInt(this.content[t].summunbery);
              }
              const isValidsumvolume_liquory = Number.isInteger(
                this.content[t].sumvolume_liquory
              );
              if (isValidsumvolume_liquory) {
                this.summunber = parseInt(
                  this.summunber + this.content[t].sumvolume_liquory
                );
              }
              const isValidsumtaxy = Number.isInteger(this.content[t].sumtaxy);
              if (isValidsumtaxy) {
                this.sumtax =
                  parseInt(this.sumtax) + parseInt(this.content[t].sumtaxy);
              }

              const isValidsummunber = Number.isInteger(
                this.content[t].summunber
              );
              if (isValidsummunber) {
                this.sumvolume_liquory =
                  parseInt(this.sumvolume_liquory) +
                  parseInt(this.content[t].summunber);
              }

              const isValidsumvolume_liquor = Number.isInteger(
                this.content[t].sumvolume_liquor
              );
              if (isValidsumvolume_liquor) {
                this.sumvolume_liquor =
                  parseInt(this.sumvolume_liquor) +
                  parseInt(this.content[t].sumvolume_liquor);
              }

              const isValidsumtax = Number.isInteger(this.content[t].sumtax);
              if (isValidsumtax) {
                this.sumtaxy =
                  parseInt(this.sumtaxy) + parseInt(this.content[t].sumtax);
              }
              var calss =
                this.content[t].summunbery - this.content[t].summunber;
              const ischecks = Number.isInteger(calss);
              if (!ischecks) {
                calss = 0;
              } else {
                calss = this.calpercentage(calss, this.content[t].summunber);
                // console.log(calss);
                this.percentage = (
                  parseFloat(this.percentage) + parseFloat(calss)
                ).toFixed(2);
              }
            }
          }
          // console.log(this.sumtaxy);

          for (let h = 0; h < this.header.length; h++) {
            if (h == 0) {
              (this.header[h].title = "รวมทั้งสิ้น"),
                (this.header[h].summunbery = this.summunbery),
                (this.header[h].summunber = this.summunber),
                (this.header[h].sumvolume_liquor = this.sumvolume_liquor),
                (this.header[h].sumvolume_liquory = this.sumvolume_liquory);
              this.header[h].sumtax = this.sumtax;
              this.header[h].sumtaxy = this.sumtaxy;
              this.header[h].percentage = this.percentage;
            } else {
              (this.header[h].summunbery = this.summunberytwo),
                (this.header[h].summunber = this.summunbertwo),
                (this.header[h].sumvolume_liquor = this.sumvolume_liquortwo),
                (this.header[h].sumvolume_liquory = this.sumvolume_liquorytwo);
              this.header[h].sumtax = this.sumtaxtwo;
              this.header[h].sumtaxy = this.sumtaxytwo;
              this.header[h].percentage = this.percentagetwo;
            }
          }
          // console.log(this.header);
        });
      });
    },
    loaddata() {
      MergeLiquorReportService.getReportLiquorTax(this.factory_code)
        .then((res) => {
          // console.log(res.data);
          this.list = res.data;
          // var sum_net_tax = 0;
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].net = this.cal(
              res.data[i].number,
              res.data[i].per_each,
              res.data[i].degree,
              res.data[i].size
            );
          }
          // console.log(this.list);
          // this.calsum()
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
      this.taxlist = this.groupBy(this.list, "month");
      // console.log(this.taxlist);
      // console.log(this.taxlist[1].length);
      for (let tax = 0; tax < this.tbmonth.length; tax++) {
        this.sumthreethree = 0;
        this.sumsixthree = 0;
        this.sumsixtwofive = 0;
        this.sumseven = 0;
        this.sumsevenfive = 0;
        this.sumthreethreec = 0;
        this.sumsixthreec = 0;
        this.sumsixtwofivec = 0;
        this.sumsevenc = 0;
        this.sumsevenfivec = 0;
        var m = 10;
        if (this.taxlist[tax + 1]) {
          for (let tbl = 0; tbl < this.taxlist[tax + 1].length; tbl++) {
            // console.log(this.taxlist[tax+1].length);
            for (let s = 0; s < this.tbsize.length; s++) {
              if (
                ((this.taxlist[tax + 1][tbl].month == 10 &&
                  this.taxlist[tax + 1][tbl].year == this.yearcurrent - 2) ||
                  (this.taxlist[tax + 1][tbl].month == 11 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 2) ||
                  (this.taxlist[tax + 1][tbl].month == 12 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 2) ||
                  (this.taxlist[tax + 1][tbl].month == 1 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 2 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 3 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 4 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 5 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 6 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 7 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 8 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
                  (this.taxlist[tax + 1][tbl].month == 9 &&
                    this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1)) &&
                this.taxlist[tax + 1][tbl].size == this.tbsize[s]
              ) {
                m = this.taxlist[tax + 1][tbl].month;
                if (this.tbsize[s] == 0.33) {
                  this.sumthreethree = Math.floor(
                    parseFloat(this.sumthreethree) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.63) {
                  this.sumsixthree = Math.floor(
                    parseFloat(this.sumsixthree) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.625) {
                  this.sumsixtwofive = Math.floor(
                    parseFloat(this.sumsixtwofive) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.7) {
                  this.sumseven = Math.floor(
                    parseFloat(this.sumseven) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.75) {
                  this.sumsevenfive = Math.floor(
                    parseFloat(this.sumsevenfive) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                }
              } else if (
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
                  this.sumthreethreec = Math.floor(
                    parseFloat(this.sumthreethreec) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.63) {
                  this.sumsixthreec = Math.floor(
                    parseFloat(this.sumsixthreec) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.625) {
                  this.sumsixtwofivec = Math.floor(
                    parseFloat(this.sumsixtwofivec) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.7) {
                  this.sumsevenc = Math.floor(
                    parseFloat(this.sumsevenc) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                } else if (this.tbsize[s] == 0.75) {
                  this.sumsevenfivec = Math.floor(
                    parseFloat(this.sumsevenfivec) +
                      parseFloat(this.taxlist[tax + 1][tbl].net)
                  );
                }
              }
            }
          }
        }

        if (this.sumthreethree) {
          this.taxdatabefore.push({
            month: m,
            size: 0.33,
            sumtax: this.sumthreethree,
          });
        } else {
          this.taxdatabefore.push({
            month: m,
            size: 0.33,
            sumtax: 0,
          });
        }
        if (this.sumsixthree) {
          this.taxdatabefore.push({
            month: m,
            size: 0.63,
            sumtax: this.sumsixthree,
          });
        } else {
          this.taxdatabefore.push({
            month: m,
            size: 0.63,
            sumtax: 0,
          });
        }
        if (this.sumsixtwofive) {
          this.taxdatabefore.push({
            month: m,
            size: 0.625,
            sumtax: this.sumsixtwofive,
          });
        } else {
          this.taxdatabefore.push({
            month: m,
            size: 0.625,
            sumtax: 0,
          });
        }
        if (this.sumsevenfive) {
          this.taxdatabefore.push({
            month: m,
            size: 0.75,
            sumtax: this.sumsevenfive,
          });
        } else {
          this.taxdatabefore.push({
            month: m,
            size: 0.75,
            sumtax: 0,
          });
        }
        if (this.sumseven) {
          this.taxdatabefore.push({
            month: m,
            size: 0.7,
            sumtax: this.sumseven,
          });
        } else {
          this.taxdatabefore.push({
            month: m,
            size: 0.7,
            sumtax: 0,
          });
        }

        if (this.sumthreethreec) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.33,
            sumtaxy: this.sumthreethreec,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.33,
            sumtaxy: 0,
          });
        }
        if (this.sumsixthreec) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.63,
            sumtaxy: this.sumsixthreec,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.63,
            sumtaxy: 0,
          });
        }
        if (this.sumsixtwofivec) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.625,
            sumtaxy: this.sumsixtwofivec,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.625,
            sumtaxy: 0,
          });
        }
        if (this.sumsevenfivec) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.75,
            sumtaxy: this.sumsevenfivec,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.75,
            sumtaxy: 0,
          });
        }
        if (this.sumsevenc) {
          this.taxdatacurrent.push({
            month: m,
            size: 0.7,
            sumtaxy: this.sumsevenc,
          });
        } else {
          this.taxdatacurrent.push({
            month: m,
            size: 0.7,
            sumtaxy: 0,
          });
        }
      }
      // console.log(this.taxdatabefore);
      // console.log(this.taxdatacurrent);

      for (let c = 0; c < this.taxdatabefore.length; c++) {
        for (let b = 0; b < this.content.length; b++) {
          if (
            this.taxdatabefore[c].month == this.content[b].month &&
            this.taxdatabefore[c].size == this.content[b].size
          ) {
            // console.log(this.taxdatabefore[c].sumtax);
            this.content[b].sumtax = this.taxdatabefore[c].sumtax;
          }
        }
      }
      for (let cc = 0; cc < this.content.length; cc++) {
        for (let tt = 0; tt < this.taxdatacurrent.length; tt++) {
          if (
            this.taxdatacurrent[tt].month == this.content[cc].month &&
            this.taxdatacurrent[tt].size == this.content[cc].size
          ) {
            // console.log(this.taxdatacurrent[tt].sumtaxy);
            this.content[cc].sumtaxy = this.taxdatacurrent[tt].sumtaxy;
          }
        }
      }
      // console.log(this.content);
    },
    calsum() {
      // var sumstamp = 0
      // var sumvolumn = 0
      // var sumtax = 0
      var sumstampy = 0;
      var sumvolumny = 0;
      var sumtaxy = 0;

      for (let c = 0; c < this.list.length; c++) {
        sumstampy = parseInt(sumstampy + this.list[c].number);
        sumvolumny = parseInt(sumvolumny + this.list[c].volume_liquor);
        sumtaxy = Math.floor(
          parseFloat(sumtaxy) + parseFloat(this.list[c].net)
        );
        this.list[c].sumnumber = sumstampy;
        this.list[c].sumvolume_liquor = sumvolumny;
        this.list[c].sumnet = sumtaxy;
      }
      console.log(this.newlist);
    },
    cal_net_tax() {
      for (let i = 0; i < this.list.length; i++) {
        if (i != 0) {
          if (this.list[i].no == this.list[i - 1].no) {
            // console.log("i", this.list[i].net);
            // console.log(this.list[i -1].net);
            this.list[i - 1].net_tax = Math.floor(
              parseFloat(this.list[i].net) + parseFloat(this.list[i - 1].net)
            );
          } else {
            this.list[i].net_tax = Math.floor(parseFloat(this.list[i].net));
          }
        } else {
          this.list[i].net_tax = Math.floor(parseFloat(this.list[i].net));
        }
      }
    },
    cal(number, per_each, degree, size) {
      var x1 = 0;
      var x2 = 0;
      var x3 = 0;
      var x4 = 0;
      if (this.factory_code == 540002) {
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
th {
  font-weight: normal;
}
</style>
