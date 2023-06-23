<template>
  <div class="hello mt-5">
    <div class="row">
      <div class="col-md-12">
        <div id="chart">
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
              <th scope="col"></th>
              <th style="text-align: center" scope="col">ตุลาคม</th>
              <th style="text-align: center" scope="col">พฤศจิกายน</th>
              <th style="text-align: center" scope="col">ธันวาคม</th>
              <th style="text-align: center" scope="col">มกราคม</th>
              <th style="text-align: center" scope="col">กุมภาพันธ์</th>
              <th style="text-align: center" scope="col">มีนาคม</th>
              <th style="text-align: center" scope="col">เมษายน</th>
              <th style="text-align: center" scope="col">พฤษภาคม</th>
              <th style="text-align: center" scope="col">มิถุนายน</th>
              <th style="text-align: center" scope="col">กรกฎาคม</th>
              <th style="text-align: center" scope="col">สิงหาคม</th>
              <th style="text-align: center" scope="col">กันยายน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(s, u) in monthtvolumnable" :key="u">
              <th scope="row">
                <span
                  class="apexcharts-legend-marker"
                  rel="1"
                  data:collapsed="false"
                  :style="s.style"
                ></span>
                {{ s.year }}
              </th>
              <td style="text-align: center">{{ numberWithCommas(s.oct) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.nov) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.dec) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.jan) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.feb) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.mar) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.apr) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.may) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.jun) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.jul) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.aug) }}</td>
              <td style="text-align: center">{{ numberWithCommas(s.sep) }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table table-bordered mt-3 mb-5">
          <thead>
            <tr>
              <th
                class="table-info"
                style="text-align: center; font-weight: bold"
              >
                ปริมาณการชำระภาษี
              </th>
              <th
                scope="col"
                colspan="3"
                style="
                  background-color: #dae2f3;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ปีนี้ (ต.ค. {{ yearcurrent - 1 }} - ก.ย. {{ yearcurrent }})
              </th>
              <th
                scope="col"
                colspan="3"
                style="
                  background-color: #fff1cc;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ปีก่อน (ต.ค. {{ yearcurrent - 2 }} - ก.ย. {{ yearcurrent - 1 }})
              </th>
              <th
                scope="col"
                colspan="4"
                style="
                  background-color: #e1efd9;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ผลต่าง
              </th>
            </tr>
            <tr>
              <th
                class="table-info"
                style="text-align: center; font-weight: bold"
              >
                เดือน
              </th>
              <th
                style="
                  background-color: #dae2f3;
                  text-align: center;
                  font-weight: bold;
                "
              >
                จำนวนแสตมป์
              </th>
              <th
                style="
                  background-color: #dae2f3;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ปริมาณน้ำสุรา
              </th>
              <th
                style="
                  background-color: #dae2f3;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ภาษีสุทธิ
              </th>
              <th
                style="
                  background-color: #fff1cc;
                  text-align: center;
                  font-weight: bold;
                "
              >
                จำนวนแสตมป์
              </th>
              <th
                style="
                  background-color: #fff1cc;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ปริมาณน้ำสุรา
              </th>
              <th
                style="
                  background-color: #fff1cc;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ภาษีสุทธิ
              </th>
              <th
                style="
                  background-color: #e1efd9;
                  text-align: center;
                  font-weight: bold;
                "
              >
                จำนวนแสตมป์
              </th>
              <th
                style="
                  background-color: #e1efd9;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ปริมาณน้ำสุรา
              </th>
              <th
                style="
                  background-color: #e1efd9;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ภาษีสุทธิ
              </th>
              <th
                style="
                  background-color: #e1efd9;
                  text-align: center;
                  font-weight: bold;
                "
              >
                ร้อยละภาษี
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(m, i) in content" :key="i">
              <th :style="m.colour">{{ m.month }}</th>
              <th
                v-if="m.summunbery"
                scope="col"
                :style="
                  m.colour + ';background-color: #dae2f3; text-align: right'
                "
              >
                {{ numberWithCommas(m.summunbery) || "" }}
              </th>
              <th
                v-if="!m.summunbery"
                scope="col"
                :style="
                  m.colour + ';background-color: #dae2f3; text-align: right'
                "
              >
                0
              </th>
              <th
                scope="col"
                :style="
                  m.colour + ';background-color: #dae2f3; text-align: right'
                "
              >
                {{ m.sumvolume_liquory || 0 }}
              </th>
              <th
                scope="col"
                v-if="m.sumtaxy && m.colour == 'font-weight: bold'"
                :style="
                  m.colour + ';background-color: #dae2f3; text-align: right'
                "
              >
                {{ numberWithCommas(m.sumtaxy) + ".00" }}
              </th>
              <th
                scope="col"
                v-if="m.colour != 'font-weight: bold'"
                :style="
                  m.colour + ';background-color: #dae2f3; text-align: right'
                "
              ></th>
              <th
                v-if="!m.sumtaxy && m.colour == 'font-weight: bold'"
                scope="col"
                :style="
                  m.colour + ';background-color: #dae2f3; text-align: right'
                "
              >
                0.00
              </th>
              <th
                v-if="m.sumtaxy && m.colour != 'font-weight: bold'"
                scope="col"
                :style="
                  m.colour + ';background-color: #dae2f3; text-align: right'
                "
              >
                0.00
              </th>
              <th
                scope="col"
                :style="
                  m.colour + ';background-color: #fff1cc; text-align: right'
                "
              >
                {{ numberWithCommas(m.summunber) }}
              </th>
              <th
                scope="col"
                :style="
                  m.colour + ';background-color: #fff1cc; text-align: right'
                "
              >
                {{ numberWithCommas(m.sumvolume_liquor) }}
              </th>
              <th
                v-if="m.sumtax && m.colour == 'font-weight: bold'"
                scope="col"
                :style="
                  m.colour + ';background-color: #fff1cc; text-align: right'
                "
              >
                {{ numberWithCommas(m.sumtax) + ".00" }}
              </th>
              <th
                v-if="!m.sumtax && m.colour == 'font-weight: bold'"
                scope="col"
                :style="
                  m.colour + ';background-color: #fff1cc; text-align: right'
                "
              >
                0.00
              </th>
              <th
                v-if="!m.sumtax && m.colour != 'font-weight: bold'"
                scope="col"
                :style="
                  m.colour + ';background-color: #fff1cc; text-align: right'
                "
              ></th>
              <th
                v-if="m.sumtax && m.sumtax == 0 && m.statussumtax != true"
                scope="col"
                :style="
                  m.colour + ';background-color: #fff1cc; text-align: right'
                "
              ></th>
              <th
                scope="col"
                :style="
                  m.colour + ';background-color: #e1efd9; text-align: right'
                "
              >
                <div
                  v-if="caldiff(m.summunbery, m.summunber) < 0"
                  style="color: red"
                >
                  {{
                    numberWithCommas(caldiff(m.summunbery, m.summunber)) || 0
                  }}
                </div>
                <div v-if="caldiff(m.summunbery, m.summunber) >= 0">
                  {{
                    numberWithCommas(caldiff(m.summunbery, m.summunber)) || 0
                  }}
                </div>
              </th>
              <th
                scope="col"
                :style="
                  m.colour + ';background-color: #e1efd9; text-align: right'
                "
              >
                <div
                  v-if="caldiff(m.sumvolume_liquory, m.sumvolume_liquor) < 0"
                  style="color: red"
                >
                  {{
                    numberWithCommas(
                      caldiff(m.sumvolume_liquory, m.sumvolume_liquor)
                    ) || 0
                  }}
                </div>
                <div
                  v-if="caldiff(m.sumvolume_liquory, m.sumvolume_liquor) >= 0"
                >
                  {{
                    numberWithCommas(
                      caldiff(m.sumvolume_liquory, m.sumvolume_liquor)
                    ) || 0
                  }}
                </div>
              </th>
              <th
                scope="col"
                :style="
                  m.colour + ';background-color: #e1efd9; text-align: right'
                "
              >
                <div v-if="caldiff(m.sumtaxy, m.sumtax) < 0" style="color: red">
                  {{
                    numberWithCommas(caldiff(m.sumtaxy, m.sumtax).toFixed(2))
                  }}
                </div>
                <div v-if="caldiff(m.sumtaxy, m.sumtax) > 0">
                  {{
                    numberWithCommas(caldiff(m.sumtaxy, m.sumtax).toFixed(2))
                  }}
                </div>
                <div
                  v-if="
                    !caldiff(m.sumtaxy, m.sumtax) &&
                    m.colour == 'font-weight: bold'
                  "
                >
                  0.00
                </div>
              </th>
              <th scope="col" :style="m.colour + ';text-align: right'">
                <div
                  v-if="
                    calpercentage(m.summunbery - m.summunber, m.summunber) <
                      0 && m.colour == 'font-weight: bold'
                  "
                  style="color: red"
                >
                  {{ calpercentage(m.summunbery - m.summunber, m.summunber) }}
                </div>
                <div
                  v-if="
                    calpercentage(m.summunbery - m.summunber, m.summunber) >
                      0 && m.colour == 'font-weight: bold'
                  "
                >
                  {{
                    numberWithCommas(
                      calpercentage(m.summunbery - m.summunber, m.summunber)
                    ) + ".00"
                  }}
                </div>
                <div
                  v-if="
                    calpercentage(m.summunbery - m.summunber, m.summunber) ==
                      0 && m.colour == 'font-weight: bold'
                  "
                >
                  0.00
                </div>
              </th>
            </tr>
            <tr>
              <td
                style="text-align: center; font-weight: bold"
                class="table-info"
              >
                รวม
              </td>
              <th
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
              >
                {{ numberWithCommas(sumlist.summunber) || 0 }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
              >
                {{ numberWithCommas(sumlist.sumvolume_liquor) || 0 }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
              >
                {{ numberWithCommas(sumlist.sumtax) || 0 }}.00
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
              >
                {{ numberWithCommas(sumlist.summunbery) || 0 }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
              >
                {{ numberWithCommas(sumlist.sumvolume_liquory) || 0 }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
              >
                {{ numberWithCommas(sumlist.sumtaxy) || 0 }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold; color: red"
                class="table-info"
                v-if="sumlist.summunber - sumlist.summunbery < 0"
              >
                {{ numberWithCommas(sumlist.summunber - sumlist.summunbery) }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
                v-else
              >
                {{
                  numberWithCommas(sumlist.summunber - sumlist.summunbery) || 0
                }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold; color: red"
                class="table-info"
                v-if="sumlist.sumvolume_liquor - sumlist.sumvolume_liquory < 0"
              >
                {{
                  numberWithCommas(
                    sumlist.sumvolume_liquor - sumlist.sumvolume_liquory
                  ) || 0
                }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
                v-else
              >
                {{
                  numberWithCommas(
                    sumlist.sumvolume_liquor - sumlist.sumvolume_liquory
                  ) || 0
                }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold; color: red"
                class="table-info"
                v-if="sumlist.sumtax - sumlist.sumtaxy < 0"
              >
                {{ numberWithCommas(sumlist.sumtax - sumlist.sumtaxy) || 0 }}
              </th>
              <th
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
                v-else
              >
                {{ numberWithCommas(sumlist.sumtax - sumlist.sumtaxy) || 0 }}.00
              </th>
              <th
                v-if="
                  (
                    ((sumlist.sumtax - sumlist.sumtaxy) / sumlist.sumtax) *
                    100
                  ).toFixed(2) > 0
                "
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
              >
                <!-- {{ numberWithCommas(parseInt(header[0].percentage).toFixed(2)) + '.00' }} -->
                {{
                  (
                    ((sumlist.sumtax - sumlist.sumtaxy) / sumlist.sumtax) *
                    100
                  ).toFixed(2)
                }}
              </th>
              <th
                v-if="
                  ((sumlist.sumtax - sumlist.sumtaxy) / sumlist.sumtax) * 100 <
                  0
                "
                scope="col"
                style="text-align: right; font-weight: bold"
                class="table-info"
              >
                <!-- {{ numberWithCommas(parseInt(header[0].percentage).toFixed(2)) + '.00' }} -->
                0.00
              </th>
              <!-- <th v-if="((((header[0].sumtax - header[0].sumtaxy)) / header[0].sumtax) * 100).toFixed(2) < 0" scope="col"
                style="text-align: center; font-weight: bold;color:red" class="table-info">
                {{ header[0].percentage }}
              </th>
              <th v-if="((((header[0].sumtax - header[0].sumtaxy)) / header[0].sumtax) * 100).toFixed(2) == 0" scope="col" style="text-align: center; font-weight: bold;"
                class="table-info">
                0.00
              </th> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
      chartOptions: {},
      series: [],
      volume_liquorbefore: [],
      volume_liquorcurrent: [],
      monthtvolumnable: [],
      sumlist: {},
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
    this.loadchartOptions();
    MergeLiquorReportService.getsumall(
      this.yearcurrent - 1 + "-10-01",
      this.yearcurrent + "-09-30",
      this.factory_code
    ).then((res) => {
      console.log(res.data);
      this.sumlist = res.data;
    });
  },
  methods: {
    caldiff(x, y) {
      // console.log(x,y);
      var r = 0;
      if (x == y) {
        r = 0;
      }
      r = x - y;
      // console.log(r);
      return r;
    },
    calpercentage(x, y) {
      var r = 0;
      const ischeck = Number.isInteger(x);
      if (ischeck) {
        var a = x / y;
        r = parseFloat(a * 100).toFixed(2);
        // console.log(r);
        if (r == Infinity) {
          r = (0).toFixed(2);
        }
        if (isNaN(r)) {
          r = (0).toFixed(2);
        }
      } else {
        r = (0).toFixed(2);
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
              net: res.data[i].liquor_tax,
              // net: this.cal(
              //   res.data[i].factory_code,
              //   res.data[i].number,
              //   res.data[i].per_each,
              //   res.data[i].degree,
              //   res.data[i].size
              // ),
              net_tax: res.data[i].net_tax,
              colour: "table-success",
            });
          }
          // this.cal_net_tax();
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
    total(list) {
      var sumnumber = 0;
      var sumvolume = 0;
      // var sumpereach = 0
      var sumtax = 0;
      var sumnettax = 0;
      // console.log(this.list);
      for (let l = 0; l < list.length; l++) {
        sumnumber = sumnumber + list[l].number;
        sumvolume = sumvolume + list[l].volume_liquor;
        // sumpereach = sumvolume + list[l].per_each;
        sumtax = sumtax + parseInt(list[l].net);
        if (list[l].net_tax) {
          sumnettax = sumnettax + parseFloat(list[l].net_tax);
        }
      }
      return sumnettax;
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
          // console.log(this.current);
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
          console.log(this.current);
          console.log(this.content);
          for (let cc = 0; cc < this.current.length; cc++) {
            for (let con = 0; con < this.content.length; con++) {
              if (
                this.current[cc].month == this.content[con].month &&
                this.current[cc].size == this.content[con].size
              ) {
                this.content[con].summunbery = this.current[cc].summunber;
                this.content[con].sumvolume_liquory =
                  this.current[cc].sumvolume_liquor;
                //   if (this.current[cc].degree == 35 && this.current[cc].size == 0.63  && this.factory_code == '541022') {
                //     this.content[con].summunbery =0
                // this.content[con].sumvolume_liquory = 0
                //   }
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
                //   if (this.before[c].size == 0.63 && this.before[c].degree == 35 && this.factory_code == '541022') {
                //     this.content[b].summunber =0
                // this.content[b].sumvolume_liquor = 0
                //   }
              }
            }
          }
          // console.log(this.content);
          this.summonth();
          console.log(this.header.length);
          if (this.header.length == 3) {
            for (let i = 0; i < this.content.length; i++) {
              if (
                i == 0 ||
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
                i == 34 ||
                i == 37 ||
                i == 40 ||
                i == 43 ||
                i == 46 ||
                i == 49
              ) {
                var monthTHt = "";
                if (this.content[i].month == 10) {
                  monthTHt = "ตุลาคม";
                } else if (this.content[i].month == 11) {
                  monthTHt = "พฤศจิกายน";
                } else if (this.content[i].month == 12) {
                  monthTHt = "ธันวาคม";
                } else if (this.content[i].month == 1) {
                  monthTHt = "มกราคม";
                } else if (this.content[i].month == 2) {
                  monthTHt = "กุมภาพันธ์";
                } else if (this.content[i].month == 3) {
                  monthTHt = "มีนาคม";
                } else if (this.content[i].month == 4) {
                  monthTHt = "เมษายน";
                } else if (this.content[i].month == 5) {
                  monthTHt = "พฤษภาคม";
                } else if (this.content[i].month == 6) {
                  monthTHt = "มิถุนายน";
                } else if (this.content[i].month == 7) {
                  monthTHt = "กรกฎาคม";
                } else if (this.content[i].month == 8) {
                  monthTHt = "สิงหาคม";
                } else if (this.content[i].month == 9) {
                  monthTHt = "กันยายน";
                }
                this.content.splice([i], 0, {
                  month: monthTHt,
                  summunber:
                    this.content[i].summunber + this.content[i + 1].summunber,
                  summunbery:
                    this.content[i].summunbery + this.content[i + 1].summunbery,
                  sumvolume_liquor:
                    this.content[i].sumvolume_liquor +
                    this.content[i + 1].sumvolume_liquor,
                  sumvolume_liquory:
                    this.content[i].sumvolume_liquory +
                    this.content[i + 1].sumvolume_liquory,
                  sumtax: this.content[i].sumtax + this.content[i + 1].sumtax,
                  sumtaxy:
                    this.content[i].sumtaxy + this.content[i + 1].sumtaxy,
                  colour: "font-weight: bold",
                });
              } else {
                (this.content[i].sumtaxy = 0),
                  (this.content[i].sumtax = 0),
                  (this.content[i].statussumtaxy = true),
                  (this.content[i].statussumtax = true),
                  (this.content[i].month =
                    this.content[i].brand_name +
                    "-" +
                    this.content[i].degree +
                    "-" +
                    this.content[i].size);
              }
              // if (i == 34) {
              //   this.content.splice([i + 1], 0, {
              //     month: "รวม",
              //     summunber:
              //       this.content[i - 1].summunber + this.content[i].summunber,
              //     summunbery:
              //       this.content[i - 1].summunbery + this.content[i].summunbery,
              //     sumvolume_liquor:
              //       this.content[i - 1].sumvolume_liquor +
              //       this.content[i].sumvolume_liquor,
              //     sumvolume_liquory:
              //       this.content[i - 1].sumvolume_liquory +
              //       this.content[i].sumvolume_liquory,
              //     sumtax: this.content[i - 1].sumtax + this.content[i].sumtax,
              //     sumtaxy:
              //       this.content[i - 1].sumtaxy + this.content[i].sumtaxy,
              //     colour: "font-weight: bold",
              //   });
              // }
            }
          } else if (this.header.length == 2) {
            for (let i = 0; i < this.content.length; i++) {
              if (
                i == 0 ||
                i == 3 ||
                i == 6 ||
                i == 9 ||
                i == 12 ||
                i == 15 ||
                i == 18 ||
                i == 21 ||
                i == 24 ||
                i == 27 ||
                i == 30 ||
                i == 33 ||
                i == 36
              ) {
                var monthTH = "";
                if (this.content[i].month == 10) {
                  monthTH = "ตุลาคม";
                } else if (this.content[i].month == 11) {
                  monthTH = "พฤศจิกายน";
                } else if (this.content[i].month == 12) {
                  monthTH = "ธันวาคม";
                } else if (this.content[i].month == 1) {
                  monthTH = "มกราคม";
                } else if (this.content[i].month == 2) {
                  monthTH = "กุมภาพันธ์";
                } else if (this.content[i].month == 3) {
                  monthTH = "มีนาคม";
                } else if (this.content[i].month == 4) {
                  monthTH = "เมษายน";
                } else if (this.content[i].month == 5) {
                  monthTH = "พฤษภาคม";
                } else if (this.content[i].month == 6) {
                  monthTH = "มิถุนายน";
                } else if (this.content[i].month == 7) {
                  monthTH = "กรกฎาคม";
                } else if (this.content[i].month == 8) {
                  monthTH = "สิงหาคม";
                } else if (this.content[i].month == 9) {
                  monthTH = "กันยายน";
                }
                this.content.splice([i], 0, {
                  month: monthTH,
                  summunber:
                    this.content[i].summunber + this.content[i + 1].summunber,
                  summunbery:
                    this.content[i].summunbery + this.content[i + 1].summunbery,
                  sumvolume_liquor:
                    this.content[i].sumvolume_liquor +
                    this.content[i + 1].sumvolume_liquor,
                  sumvolume_liquory:
                    this.content[i].sumvolume_liquory +
                    this.content[i + 1].sumvolume_liquory,
                  sumtax: this.content[i].sumtax + this.content[i + 1].sumtax,
                  sumtaxy:
                    this.content[i].sumtaxy + this.content[i + 1].sumtaxy,
                  colour: "font-weight: bold",
                });
              } else {
                (this.content[i].sumtaxy = 0),
                  (this.content[i].sumtax = 0),
                  (this.content[i].statussumtaxy = true),
                  (this.content[i].statussumtax = true),
                  (this.content[i].month =
                    this.content[i].brand_name +
                    "-" +
                    this.content[i].degree +
                    "-" +
                    this.content[i].size);
              }
              // if (i == 34) {
              //   this.content.splice([i + 1], 0, {
              //     month: "รวม",
              //     summunber:
              //       this.content[i - 1].summunber + this.content[i].summunber,
              //     summunbery:
              //       this.content[i - 1].summunbery + this.content[i].summunbery,
              //     sumvolume_liquor:
              //       this.content[i - 1].sumvolume_liquor +
              //       this.content[i].sumvolume_liquor,
              //     sumvolume_liquory:
              //       this.content[i - 1].sumvolume_liquory +
              //       this.content[i].sumvolume_liquory,
              //     sumtax: this.content[i - 1].sumtax + this.content[i].sumtax,
              //     sumtaxy:
              //       this.content[i - 1].sumtaxy + this.content[i].sumtaxy,
              //     colour: "font-weight: bold",
              //   });
              // }
            }
          } else {
            for (let j = 0; j < this.content.length; j++) {
              var monthTH1 = "";
              if (this.content[j].month == 10) {
                monthTH1 = "ตุลาคม";
              } else if (this.content[j].month == 11) {
                monthTH1 = "พฤศจิกายน";
              } else if (this.content[j].month == 12) {
                monthTH1 = "ธันวาคม";
              } else if (this.content[j].month == 1) {
                monthTH1 = "มกราคม";
              } else if (this.content[j].month == 2) {
                monthTH1 = "กุมภาพันธ์";
              } else if (this.content[j].month == 3) {
                monthTH1 = "มีนาคม";
              } else if (this.content[j].month == 4) {
                monthTH1 = "เมษายน";
              } else if (this.content[j].month == 5) {
                monthTH1 = "พฤษภาคม";
              } else if (this.content[j].month == 6) {
                monthTH1 = "มิถุนายน";
              } else if (this.content[j].month == 7) {
                monthTH1 = "กรกฎาคม";
              } else if (this.content[j].month == 8) {
                monthTH1 = "สิงหาคม";
              } else if (this.content[j].month == 9) {
                monthTH1 = "กันยายน";
              }
              this.content[j].month = monthTH1;
              this.content[j].colour = "font-weight: bold";
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
          this.sumtaxy = 0;
          // console.log(this.content);
          for (let ct = 0; ct < this.content.length; ct++) {
            // console.log(this.content[ct].sumtax);
            const isValidsumtaxyy = Number.isInteger(this.content[ct].sumtax);
            if (isValidsumtaxyy) {
              this.sumtaxy = this.sumtaxy + this.content[ct].sumtax;
            }
          }
          MergeLiquorReportService.getsumall(
            this.yearcurrent - 2 + "-10-01",
            this.yearcurrent - 1 + "-09-30",
            this.factory_code
          ).then((res) => {
            console.log(res.data);
            this.sumlist.summunbery = res.data.summunber;
            this.sumlist.sumvolume_liquory = res.data.sumvolume_liquor;
            this.sumlist.sumtaxy = res.data.sumtax;
            console.log(this.sumlist);
          });
          MergeLiquorReportService.getMergeLiquorReportByCode(
            this.factory_code,
            this.yearcurrent - 1 + "-10-01",
            this.yearcurrent + "-09-31"
          ).then((res) => {
            var list = [];
            for (let i = 0; i < res.data.length; i++) {
              // if (res.data[i].factory_code == res.data[i - 1].factory_code) {
              // sum_net_tax = res.data[i].net + res.data[i - 1].net;
              // }
              list.push({
                tax_payment_date: this.convertdatetothai(
                  res.data[i].tax_payment_date
                ),
                no: res.data[i].no,
                factory_code: res.data[i].factory_code,
                brand_name:
                  res.data[i].brand_name +
                  "-" +
                  res.data[i].degree +
                  "-" +
                  res.data[i].size,
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
                net_tax: res.data[i].net_tax,
                colour: "table-success",
                type: res.data[i].type,
              });
            }
            for (let h = 0; h < this.header.length; h++) {
              if (h == 0) {
                (this.header[h].title =
                  this.header[h].brand_name +
                  "-" +
                  this.header[h].degree +
                  "-" +
                  this.header[h].size),
                  (this.header[h].summunbery = this.summunbery),
                  (this.header[h].summunber = this.summunber),
                  (this.header[h].sumvolume_liquor = this.sumvolume_liquor),
                  (this.header[h].sumvolume_liquory = this.sumvolume_liquory);
                // this.header[h].sumtax = this.sumtax;
                this.header[h].sumtax = this.total(list);
                this.header[h].sumtaxy = this.sumtaxy;
                this.header[h].percentage = this.percentage;
              } else {
                (this.header[h].title =
                  this.header[h].brand_name +
                  "-" +
                  this.header[h].degree +
                  "-" +
                  this.header[h].size),
                  (this.header[h].summunbery = this.summunberytwo),
                  (this.header[h].summunber = this.summunbertwo),
                  (this.header[h].sumvolume_liquor = this.sumvolume_liquortwo),
                  (this.header[h].sumvolume_liquory =
                    this.sumvolume_liquorytwo);
                this.header[h].sumtax = this.sumtaxtwo;
                this.header[h].sumtaxy = this.sumtaxytwo;
                this.header[h].percentage = this.percentagetwo;
              }
            }
            this.loadgraph();
            // console.log(this.header);
          });
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
          // console.log(this.content);
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
        // console.log(this.taxlist);
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
                  // console.log(Math.floor(
                  //   parseFloat(this.sumsixthreec) +
                  //   parseFloat(this.taxlist[tax + 1][tbl].net)
                  // ));
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
        }
      }
      // console.log(this.sumsixthree);
      // console.log(this.taxdatacurrent);
      // console.log(this.content);
      // console.log(this.taxdatabefore);
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
    // summonth() {
    //   // console.log(this.list);
    //   this.taxlist = this.groupBy(this.list, "month");
    //   // console.log(this.taxlist);
    //   // console.log(this.taxlist[1].length);
    //   for (let tax = 0; tax < this.tbmonth.length; tax++) {
    //     this.sumthreethree = 0;
    //     this.sumsixthree = 0;
    //     this.sumsixtwofive = 0;
    //     this.sumseven = 0;
    //     this.sumsevenfive = 0;
    //     this.sumthreethreec = 0;
    //     this.sumsixthreec = 0;
    //     this.sumsixtwofivec = 0;
    //     this.sumsevenc = 0;
    //     this.sumsevenfivec = 0;
    //     var m = 10;
    //     if (this.taxlist[tax + 1]) {
    //       for (let tbl = 0; tbl < this.taxlist[tax + 1].length; tbl++) {
    //         // console.log(this.taxlist[tax+1].length);
    //         for (let s = 0; s < this.tbsize.length; s++) {
    //           if (
    //             ((this.taxlist[tax + 1][tbl].month == 10 &&
    //               this.taxlist[tax + 1][tbl].year == this.yearcurrent - 2) ||
    //               (this.taxlist[tax + 1][tbl].month == 11 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 2) ||
    //               (this.taxlist[tax + 1][tbl].month == 12 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 2) ||
    //               (this.taxlist[tax + 1][tbl].month == 1 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 2 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 3 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 4 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 5 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 6 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 7 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 8 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 9 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1)) &&
    //             this.taxlist[tax + 1][tbl].size == this.tbsize[s]
    //           ) {
    //             m = this.taxlist[tax + 1][tbl].month;
    //             const ischecksnet_tax = Number.isInteger(this.taxlist[tax + 1][tbl].net_tax);
    //           if (!ischecksnet_tax) {
    //             this.taxlist[tax + 1][tbl].net_tax = 0;
    //           }
    //             if (this.tbsize[s] == 0.33) {
    //               this.sumthreethree = Math.floor(
    //                 parseFloat(this.sumthreethree) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             } else if (this.tbsize[s] == 0.63) {
    //               this.sumsixthree = Math.floor(
    //                 parseFloat(this.sumsixthree) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             } else if (this.tbsize[s] == 0.625) {
    //               this.sumsixtwofive = Math.floor(
    //                 parseFloat(this.sumsixtwofive) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             } else if (this.tbsize[s] == 0.7) {
    //               this.sumseven = Math.floor(
    //                 parseFloat(this.sumseven) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             } else if (this.tbsize[s] == 0.75) {
    //               this.sumsevenfive = Math.floor(
    //                 parseFloat(this.sumsevenfive) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             }
    //           } else if (
    //             ((this.taxlist[tax + 1][tbl].month == 10 &&
    //               this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 11 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 12 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent - 1) ||
    //               (this.taxlist[tax + 1][tbl].month == 1 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
    //               (this.taxlist[tax + 1][tbl].month == 2 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
    //               (this.taxlist[tax + 1][tbl].month == 3 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
    //               (this.taxlist[tax + 1][tbl].month == 4 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
    //               (this.taxlist[tax + 1][tbl].month == 5 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
    //               (this.taxlist[tax + 1][tbl].month == 6 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
    //               (this.taxlist[tax + 1][tbl].month == 7 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
    //               (this.taxlist[tax + 1][tbl].month == 8 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent) ||
    //               (this.taxlist[tax + 1][tbl].month == 9 &&
    //                 this.taxlist[tax + 1][tbl].year == this.yearcurrent)) &&
    //             this.taxlist[tax + 1][tbl].size == this.tbsize[s]
    //           ) {
    //             m = this.taxlist[tax + 1][tbl].month;
    //             const ischecksnet_taxtwo = Number.isInteger(this.taxlist[tax + 1][tbl].net_tax);
    //           if (!ischecksnet_taxtwo) {
    //             this.taxlist[tax + 1][tbl].net_tax = 0;
    //           }
    //             if (this.tbsize[s] == 0.33) {
    //               this.sumthreethreec = Math.floor(
    //                 parseFloat(this.sumthreethreec) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             } else if (this.tbsize[s] == 0.63) {
    //               this.sumsixthreec = Math.floor(
    //                 parseFloat(this.sumsixthreec) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             } else if (this.tbsize[s] == 0.625) {
    //               this.sumsixtwofivec = Math.floor(
    //                 parseFloat(this.sumsixtwofivec) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             } else if (this.tbsize[s] == 0.7) {
    //               this.sumsevenc = Math.floor(
    //                 parseFloat(this.sumsevenc) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             } else if (this.tbsize[s] == 0.75) {
    //               this.sumsevenfivec = Math.floor(
    //                 parseFloat(this.sumsevenfivec) +
    //                   parseFloat(this.taxlist[tax + 1][tbl].net_tax)
    //               );
    //             }
    //           }
    //         }
    //       }
    //     }
    //     if (this.sumthreethree) {
    //       this.taxdatabefore.push({
    //         month: m,
    //         size: 0.33,
    //         sumtax: this.sumthreethree,
    //       });
    //     }
    //     if (this.sumsixthree) {
    //       this.taxdatabefore.push({
    //         month: m,
    //         size: 0.63,
    //         sumtax: this.sumsixthree,
    //       });
    //     }
    //     if (this.sumsixtwofive) {
    //       this.taxdatabefore.push({
    //         month: m,
    //         size: 0.625,
    //         sumtax: this.sumsixtwofive,
    //       });
    //     }
    //     if (this.sumsevenfive) {
    //       this.taxdatabefore.push({
    //         month: m,
    //         size: 0.75,
    //         sumtax: this.sumsevenfive,
    //       });
    //     }
    //     if (this.sumseven) {
    //       this.taxdatabefore.push({
    //         month: m,
    //         size: 0.7,
    //         sumtax: this.sumseven,
    //       });
    //     }

    //     if (this.sumthreethreec) {
    //       this.taxdatacurrent.push({
    //         month: m,
    //         size: 0.33,
    //         sumtaxy: this.sumthreethreec,
    //       });
    //     }
    //     if (this.sumsixthreec) {
    //       this.taxdatacurrent.push({
    //         month: m,
    //         size: 0.63,
    //         sumtaxy: this.sumsixthreec,
    //       });
    //     }
    //     if (this.sumsixtwofivec) {
    //       this.taxdatacurrent.push({
    //         month: m,
    //         size: 0.625,
    //         sumtaxy: this.sumsixtwofivec,
    //       });
    //     }
    //     if (this.sumsevenfivec) {
    //       this.taxdatacurrent.push({
    //         month: m,
    //         size: 0.75,
    //         sumtaxy: this.sumsevenfivec,
    //       });
    //     }
    //     if (this.sumsevenc) {
    //       this.taxdatacurrent.push({
    //         month: m,
    //         size: 0.7,
    //         sumtaxy: this.sumsevenc,
    //       });
    //     }
    //   }
    //   console.log(this.taxdatacurrent);
    //   for (let c = 0; c < this.taxdatabefore.length; c++) {
    //     for (let b = 0; b < this.content.length; b++) {
    //       if (
    //         this.taxdatabefore[c].month == this.content[b].month &&
    //         this.taxdatabefore[c].size == this.content[b].size) {
    //         // console.log(this.taxdatabefore[c].month,this.taxdatabefore[c].size,this.taxdatabefore[c].sumtax);
    //         this.content[b].sumtax = this.taxdatabefore[c].sumtax;
    //       }
    //     }
    //   }
    //   // console.log(this.taxdatacurrent);
    //   for (let cc = 0; cc < this.content.length; cc++) {
    //     for (let tt = 0; tt < this.taxdatacurrent.length; tt++) {
    //       if (
    //         this.taxdatacurrent[tt].month == this.content[cc].month &&
    //         this.taxdatacurrent[tt].size == this.content[cc].size
    //       ) {
    //         // console.log(this.taxdatacurrent[tt].sumtaxy);
    //         this.content[cc].sumtaxy = this.taxdatacurrent[tt].sumtaxy;
    //       }
    //     }
    //   }
    //   // console.log(this.content);
    // },
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
          parseFloat(sumtaxy) + parseFloat(this.list[c].net_tax)
        );
        this.list[c].sumnumber = sumstampy;
        this.list[c].sumvolume_liquor = sumvolumny;
        this.list[c].sumnet = sumtaxy;
      }
      // console.log(this.newlist);
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
        colors: ["#77B6EA", "#EC7C30"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "กราฟแสดงสถิติการชำระภาษี",
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
            text: "ปริมาณน้ำสุรา (ลิตร)",
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
    loadvolumnable() {
      // console.log(this.series);
      this.monthtvolumnable.push({
        year: this.yearcurrent,
        style:
          "background: rgb(119, 182, 234) !important; color: rgb(119, 182, 234); height: 12px; width: 12px; left: 0px; top: 0px; border-width: 0px; border-color: rgb(255, 255, 255); border-radius: 12px;",
      });
      this.monthtvolumnable.push({
        year: this.yearcurrent - 1,
        style:
          "background: rgb(236, 124, 48) !important; color: rgb(236, 124, 48); height: 12px; width: 12px; left: 0px; top: 0px; border-width: 0px; border-color: rgb(255, 255, 255); border-radius: 12px;",
      });
      // console.log(this.volume_liquorbefore);
      for (let cc = 0; cc < this.monthtvolumnable.length; cc++) {
        if (cc == 0) {
          for (let bb = 0; bb < this.volume_liquorcurrent.length; bb++) {
            // console.log(this.volume_liquorcurrent[bb]);
            if (bb == 0) {
              this.monthtvolumnable[cc].oct = this.volume_liquorcurrent[bb];
            } else if (bb == 1) {
              this.monthtvolumnable[cc].nov = this.volume_liquorcurrent[bb];
            } else if (bb == 2) {
              this.monthtvolumnable[cc].dec = this.volume_liquorcurrent[bb];
            } else if (bb == 3) {
              this.monthtvolumnable[cc].jan = this.volume_liquorcurrent[bb];
            } else if (bb == 4) {
              this.monthtvolumnable[cc].feb = this.volume_liquorcurrent[bb];
            } else if (bb == 5) {
              this.monthtvolumnable[cc].mar = this.volume_liquorcurrent[bb];
            } else if (bb == 6) {
              this.monthtvolumnable[cc].apr = this.volume_liquorcurrent[bb];
            } else if (bb == 7) {
              this.monthtvolumnable[cc].may = this.volume_liquorcurrent[bb];
            } else if (bb == 8) {
              this.monthtvolumnable[cc].jun = this.volume_liquorcurrent[bb];
            } else if (bb == 9) {
              this.monthtvolumnable[cc].jul = this.volume_liquorcurrent[bb];
            } else if (bb == 10) {
              this.monthtvolumnable[cc].aug = this.volume_liquorcurrent[bb];
            } else if (bb == 11) {
              this.monthtvolumnable[cc].sep = this.volume_liquorcurrent[bb];
            }
          }
        }
        if (cc == 1) {
          for (let bb = 0; bb < this.volume_liquorbefore.length; bb++) {
            // console.log(this.volume_liquorbefore[bb]);
            if (bb == 0) {
              this.monthtvolumnable[cc].oct = this.volume_liquorbefore[bb];
            } else if (bb == 1) {
              this.monthtvolumnable[cc].nov = this.volume_liquorbefore[bb];
            } else if (bb == 2) {
              this.monthtvolumnable[cc].dec = this.volume_liquorbefore[bb];
            } else if (bb == 3) {
              this.monthtvolumnable[cc].jan = this.volume_liquorbefore[bb];
            } else if (bb == 4) {
              this.monthtvolumnable[cc].feb = this.volume_liquorbefore[bb];
            } else if (bb == 5) {
              this.monthtvolumnable[cc].mar = this.volume_liquorbefore[bb];
            } else if (bb == 6) {
              this.monthtvolumnable[cc].apr = this.volume_liquorbefore[bb];
            } else if (bb == 7) {
              this.monthtvolumnable[cc].may = this.volume_liquorbefore[bb];
            } else if (bb == 8) {
              this.monthtvolumnable[cc].jun = this.volume_liquorbefore[bb];
            } else if (bb == 9) {
              this.monthtvolumnable[cc].jul = this.volume_liquorbefore[bb];
            } else if (bb == 10) {
              this.monthtvolumnable[cc].aug = this.volume_liquorbefore[bb];
            } else if (bb == 11) {
              this.monthtvolumnable[cc].sep = this.volume_liquorbefore[bb];
            }
          }
        }
      }
      // console.log(this.monthtvolumnable);
    },
    loadgraph() {
      this.series.push({
        name: String(this.yearcurrent),
        style: {
          fontSize: "9px",
        },
        year: this.yearcurrent,
      });
      this.series.push({
        name: String(this.yearcurrent - 1),
        style: {
          fontSize: "9px",
        },
        year: this.yearcurrent - 1,
      });
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
            if (this.content[t].sumvolume_liquory == 0) {
              this.volume_liquorcurrent.push(null);
            } else {
              this.volume_liquorcurrent.push(this.content[t].sumvolume_liquory);
            }
            this.volume_liquorbefore.push(this.content[t].sumvolume_liquor);
          }
        }
      } else {
        for (let g = 0; g < this.content.length; g++) {
          if (this.content[g].sumvolume_liquory == 0) {
            this.volume_liquorcurrent.push(null);
          } else {
            this.volume_liquorcurrent.push(this.content[g].sumvolume_liquory);
          }
          this.volume_liquorbefore.push(this.content[g].sumvolume_liquor);
        }
      }
      for (let se = 0; se < this.series.length; se++) {
        if (this.series[se].year == this.yearcurrent - 1) {
          this.series[se]["data"] = this.volume_liquorbefore;
        } else if (this.series[se].year == this.yearcurrent) {
          this.series[se]["data"] = this.volume_liquorcurrent;
        }
      }
      this.loadvolumnable();
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
