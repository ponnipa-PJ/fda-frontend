<template>
  <div class="hello mt-5">
    <div class="row">
      <div class="col-6">
        <label for="exampleInputEmail1" class="form-label">วันเริ่มต้น</label>
        <input id="start_date" class="form-control" />
        <!-- <input
          @change="changeyearstart"
          v-model="startdate"
          type="date"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        /> -->
      </div>
      <div class="col-6">
        <label for="exampleInputEmail1" class="form-label">วันสิ้นสุด</label>
        <input id="end_date" class="form-control" />
        <!-- <input
          @change="changeyearend"
          v-model="enddate"
          type="date"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        /> -->
      </div>
      <div class="col-12 mb-3" align="center">
        <button
          @click="search()"
          type="submit"
          class="btn btn-success"
          style="margin-top: 10px; text-align: right"
        >
          ค้นหา
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th
                scope="col"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #deebf7;
                "
              >
                วันที่
              </th>
              <th
                scope="col"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #deebf7;
                "
              >
                รายการสินค้า
              </th>
              <th
                scope="col"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #deebf7;
                "
              >
                ดีกรี
              </th>
              <th
                scope="col"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #deebf7;
                "
              >
                ขนาดบรรจุ (ลิตร)
              </th>
              <th
                scope="col"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #deebf7;
                "
              >
                จำนวน (ดวง)
              </th>
              <th
                scope="col"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #deebf7;
                "
              >
                ปริมาณน้ำสุรา (ลิตร)
              </th>
              <th
                scope="col"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #deebf7;
                "
              >
                ราคาขายปลีกแนะนำ
              </th>
              <th
                scope="col"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #deebf7;
                "
              >
                ภาษีสุรา (บาท)
              </th>
              <th
                scope="col"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #deebf7;
                "
              >
                ภาษีสุทธิ (บาท)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, i) in list" :key="i">
              <td style="text-align: center; background-color: #eaeef7">
                {{ l.tax_payment_date }}
              </td>
              <td style="text-align: center; background-color: #eaeef7">
                {{ l.brand_name }}
              </td>
              <td style="text-align: right; background-color: #eaeef7">
                {{ l.degree }}
              </td>
              <td style="text-align: right; background-color: #eaeef7">
                {{ l.size }}
              </td>
              <td style="text-align: right; background-color: #eaeef7">
                {{ l.number }}
              </td>
              <td style="text-align: right; background-color: #eaeef7">
                {{ l.volume_liquor }}
              </td>
              <td style="text-align: right; background-color: #eaeef7">
                {{ l.per_each }}
              </td>
              <td style="text-align: right; background-color: #eaeef7">
                {{ numberWithCommas(l.net) + ".00" }}
              </td>
              <td
                v-if="l.net_tax"
                style="text-align: right; background-color: #eaeef7"
              >
                {{ numberWithCommas(l.net_tax) + ".00" }}
              </td>
              <td
                v-if="!l.net_tax"
                style="text-align: right; background-color: #eaeef7"
              ></td>
            </tr>
            <tr>
              <td
                colspan="4"
                style="
                  font-weight: bold;
                  text-align: center;
                  background-color: #eaeef7;
                "
              >
                รวมทั้งสิ้น
              </td>
              <td
                style="
                  font-weight: bold;
                  text-align: right;
                  background-color: #eaeef7;
                "
              >
                {{ numberWithCommas(sumnumber) }}
              </td>
              <td
                style="
                  font-weight: bold;
                  text-align: right;
                  background-color: #eaeef7;
                "
              >
                {{ numberWithCommas(sumvolume) }}
              </td>
              <td
                style="
                  font-weight: bold;
                  text-align: right;
                  background-color: #eaeef7;
                "
              >
                <!-- {{ numberWithCommas(sumpereach) }} -->
              </td>
              <td
                style="
                  font-weight: bold;
                  text-align: right;
                  background-color: #eaeef7;
                "
              >
                {{ numberWithCommas(sumtax) }}
              </td>
              <td
                style="
                  font-weight: bold;
                  text-align: right;
                  background-color: #eaeef7;
                "
              >
                {{ numberWithCommas(sumnettax) + ".00" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

  <script src="https://api-sbpacdb.ponnipa.in.th/picker_date.js"></script>

<script>
import MergeLiquorReportService from "../services/MergeLiquorReportService.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      sumnumber: 0,
      sumvolume: 0,
      sumtax: 0,
      list: [],
      itemPreviewImage: "",
      id: "",
      item: [],
      img: "",
      image: "",
      net_tax: [],
      startdate: "",
      enddate: "",
      factory_code: "",
      monthcurrent: "",
      yearcurrent: "",
      sumpereach: 0,
      sumnettax: 0,
    };
  },
  computed: {},
  mounted() {
    const d = new Date();
    this.monthcurrent = parseInt(d.getMonth());
    this.yearcurrent = parseInt(d.getFullYear() + 543);
    picker_date(document.getElementById("start_date"), { year_range: "-12:+10" });
    picker_date(document.getElementById("end_date"), { year_range: "-12:+10" });
    // console.log(this.$route.params.id);
    this.factory_code = this.$route.params.id;
    this.loaddata();
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.startdate = this.yearcurrent-1 + "-10-01";
    if ((this.monthcurrent + 1).toString().length == 1) {
      this.enddate =
        this.yearcurrent +
        "-0" +
        parseInt(this.monthcurrent + 1) +
        "-" +
        lastDay.getDate();
    } else {
      this.enddate =
        this.yearcurrent +
        "-" +
        parseInt(this.monthcurrent + 1) +
        "-" +
        lastDay.getDate();
    }
      document.getElementById("start_date").value = this.getdate(this.startdate)
      document.getElementById("end_date").value = this.getdate(this.enddate)

  },
  methods: {
     getdate(value) {      
    var date = new Date(value);
    // console.log(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    // console.log(day,month,year);
    if (day.toString().length == 1) {
      day = "0" + day;
    }
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    return  day+ "/"+month + "/" + year;
  },
    changeyearend() {
      var m = this.enddate.substring(0, 2);
      if (m == 20) {
        var end = new Date(this.enddate);
        var year = this.enddate.substring(0, 4);
        var day = end.getDate();
        var month = end.getMonth() + 1;
        if (day.toString().length == 1) {
          day = "0" + day;
        }
        if (month.toString().length == 1) {
          month = "0" + month;
        }
        var c = parseInt(year) + 543 + "-" + month + "-" + day;
        // console.log(c);
        this.enddate = c;
      }
    },
    changeyearstart() {
      var m = this.startdate.substring(0, 2);
      if (m == 20) {
        var start = new Date(this.startdate);
        var years = this.startdate.substring(0, 4);
        var days = start.getDate();
        var months = start.getMonth() + 1;
        if (days.toString().length == 1) {
          days = "0" + days;
        }
        if (months.toString().length == 1) {
          months = "0" + months;
        }
        var cu = parseInt(years) + 543 + "-" + months + "-" + days;
        this.startdate = cu;
      }
    },
    createddate(value) {   
  var streetaddress = String(value);
    var d = streetaddress.substring(0, streetaddress.indexOf("/"));
    var m = streetaddress.substring(5, streetaddress.indexOf("/"));
    m = m.substring(1, 3);
    var y = streetaddress.substring(5);
    var full = m + "/" + d + y;
    // console.log(full);
    var date = new Date(full);
    // console.log(date);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    if (day.toString().length == 1) {
      day = "0" + day;
    }
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    return  year + "-" + month + "-" + day;
  },
    search() {
      this.startdate = this.createddate(document.getElementById("start_date").value);
      this.enddate = this.createddate(document.getElementById("end_date").value);
      // console.log(this.enddate);
      // console.log(this.startdate);
      // var startdate = this.convertdatesort(this.startdate);
      // var enddate = this.convertdatesort(this.enddate);
      MergeLiquorReportService.getMergeLiquorReportByCode(
        this.factory_code,
        this.startdate,
        this.enddate
      ).then((res) => {
        this.list = [];
        // console.log(res.data);
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
            brand_name: res.data[i].brand_name + '-'+res.data[i].degree+ '-'+res.data[i].size,
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
          });
        }
        this.cal_net_tax();
      });
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
    loaddata() {
      const now = new Date();
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      MergeLiquorReportService.getMergeLiquorReportByCode(
        this.factory_code,
        String(this.yearcurrent-1 + "-10-01"),
        String(
          this.yearcurrent +
            "-" +
            parseInt(this.monthcurrent + 1) +
            "-" +
            lastDay.getDate()
        )
      )
        .then((res) => {
          // console.log(res.data);
          // this.list = res.data;
          // var sum_net_tax = 0;
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
              brand_name: res.data[i].brand_name + '-'+res.data[i].degree+ '-'+res.data[i].size,
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
          this.cal_net_tax();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cal_net_tax() {
      // for (let i = 0; i < this.list.length; i++) {
      //   if (i != 0) {
      //     if (
      //       this.list[i].tax_payment_date == this.list[i - 1].tax_payment_date
      //     ) {
      //       // console.log("i", this.list[i].net);
      //       // console.log(this.list[i -1].net);
      //       this.list[i - 1].net_tax = Math.floor(
      //         parseFloat(this.list[i].net) + parseFloat(this.list[i - 1].net)
      //       ).toFixed(2);
      //     } else {
      //       this.list[i].net_tax = Math.floor(
      //         parseFloat(this.list[i].net)
      //       ).toFixed(2);
      //     }
      //   } else {
      //     this.list[i].net_tax = Math.floor(
      //       parseFloat(this.list[i].net)
      //     ).toFixed(2);
      //   }
      // }

      this.total();
    },
    cal(factory_code, number, per_each, degree, size) {
      var x1 = 0;
      var x2 = 0;
      var x3 = 0;
      var x4 = 0;
      if (factory_code == 540002) {
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
    total() {
      
      this.sumnumber = 0
this.sumvolume = 0
this.sumpereach = 0
this.sumtax = 0
this.sumnettax = 0
      // console.log(this.list);
      for (let l = 0; l < this.list.length; l++) {
        this.sumnumber = this.sumnumber + this.list[l].number;
        this.sumvolume = this.sumvolume + this.list[l].volume_liquor;
        this.sumpereach = this.sumvolume + this.list[l].per_each;
        this.sumtax = this.sumtax + parseInt(this.list[l].net);
        if (this.list[l].net_tax) {
          this.sumnettax = this.sumnettax + parseFloat(this.list[l].net_tax);
        }
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
</style>
