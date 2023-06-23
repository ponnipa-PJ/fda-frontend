<template>
  <div class="hello container mt-5">
    <div class="row"> 
      <div class="col-6">
        <label for="exampleInputEmail1" class="form-label">วันเริ่มต้น</label>
        <!-- <input
          v-model="startdate"
          type="date"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        /> -->
        <input id="start_date" class="form-control" />
      </div>
      <div class="col-6">
        <label for="exampleInputEmail1" class="form-label">วันสิ้นสุด</label>
        <!-- <input
          v-model="enddate"
          type="date"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        /> -->
        <input id="end_date" class="form-control" />
      </div>
      <div class="col-12" align="center">
        <button
          @click="search()"
          type="submit"
          class="btn btn-primary"
          style="margin-top: 10px;text-align:right"
        >
          ค้นหา
        </button>
      </div>
      </div>
      <div class="col-12" align="right" style="display:none;">
        <vue-excel-xlsx
        :data="data"
        :columns="columns"
        :file-name="'filename'"
        :file-type="'xlsx'"
        :sheet-name="'sheetname'"
        >
        Export Excel
    </vue-excel-xlsx>
    </div>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">เลขรับที่</th>
          <th scope="col">วันที่ชำระภาษี</th>
          <th scope="col">รหัสโรงงาน</th>
          <th scope="col">ชื่อยี่ห้อ</th>
          <th scope="col">จำนวน (ดวง)</th>
          <th scope="col">ดีกรี</th>
          <th scope="col">ขนาด</th>
          <th scope="col">ราคาขายปลีกแนะนำ</th>
          <th scope="col">ปริมาณน้ำสุรา</th>
          <th scope="col">จำนวนเงิน</th>
          <th scope="col">ภาษีสุทธิ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="i">
          <td :class="l.colour">{{ l.no }}</td>
          <td :class="l.colour">
            {{ l.tax_payment_date }}
          </td>
          <td :class="l.colour">{{ l.factory_code }}</td>
          <td :class="l.colour">{{ l.brand_name }}</td>
          <td :class="l.colour">{{ l.number }}</td>
          <td :class="l.colour">{{ l.degree }}</td>
          <td :class="l.colour">{{ l.size }}</td>
          <td :class="l.colour">{{ l.per_each }}</td>
          <td :class="l.colour">{{ l.volume_liquor }}</td>
          <td :class="l.colour">
            {{ numberWithCommas(l.net) }}
          </td>
          <td :class="l.colour">
            {{ numberWithCommas(l.net_tax) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

  <script src="https://api-excise.ponnipa.in.th/picker_date.js"></script>

<script>
import MergeLiquorReportService from "../services/MergeLiquorReportService.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      list: [],
      itemPreviewImage: "",
      id: "",
      item: [],
      img: "",
      image: "",
      net_tax: [],
      startdate: "",
      enddate: "",
      columns:[],
      data:[]
    };
  },
  props: {
    msg: String,
  },
  computed: {},
  mounted() {
    this.loaddata();
    this.generateexcel()
    picker_date(document.getElementById("start_date"), { year_range: "-12:+10" });
    picker_date(document.getElementById("end_date"), { year_range: "-12:+10" });

  },
  methods: {
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
      if(document.getElementById("start_date").value == '' ||document.getElementById("end_date").value ==''){
this.loaddata()
      }else{
      var startdate = this.createddate(document.getElementById("start_date").value);
      var enddate = this.createddate(document.getElementById("end_date").value);
      console.log(enddate);
      MergeLiquorReportService.getMergeLiquorReportSortDate(
        startdate,
        enddate
      ).then((res) => {
        this.list = [];
        //  console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data);
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
            net:res.data[i].liquor_tax,
            // net: this.cal(
            //   res.data[i].factory_code,
            //   res.data[i].number,
            //   res.data[i].per_each,
            //   res.data[i].degree,
            //   res.data[i].size
            // ),
            net_tax:res.data[i].net_tax,
            colour: "table-success",
          });
        }
        this.cal_net_tax();      
            });
      }
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
      this.list = []
      var date = new Date()
      var month = date.getMonth()+1
      var year = date.getFullYear()+543
       console.log(year)

      MergeLiquorReportService.getMergeLiquorReport(month,year)
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
              brand_name: res.data[i].brand_name,
              number: res.data[i].number,
              degree: res.data[i].degree,
              size: res.data[i].size,
              per_each: res.data[i].per_each,
              volume_liquor: res.data[i].volume_liquor,
              net:res.data[i].liquor_tax,
              // net: this.cal(
              //   res.data[i].factory_code,
              //   res.data[i].number,
              //   res.data[i].per_each,
              //   res.data[i].degree,
              //   res.data[i].size
              // ),
              net_tax:res.data[i].net_tax,
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
      console.log(this.list);
      // console.log(this.group(this.list, "tax_payment_date"))
      // for (let i = 0; i < this.list.length; i++) {
      //   if (i != 0) {
      //     if (this.list[i].tax_payment_date == this.list[i - 1].tax_payment_date &&
      //     this.list[i].factory_code == this.list[i - 1].factory_code &&
      //     this.list[i].brand_name == this.list[i - 1].brand_name) {
      //       // console.log("i", this.list[i].net);
      //       // console.log(this.list[i -1].net);
      //       this.list[i - 1].net_tax = (Math.floor(
      //         parseFloat(this.list[i].net) + parseFloat(this.list[i - 1].net)).toFixed(2)
      //       );
      //     } else {
      //       this.list[i].net_tax = Math.floor(parseFloat(this.list[i].net)).toFixed(2);
      //     }
      //   } else {
      //     this.list[i].net_tax = Math.floor(parseFloat(this.list[i].net)).toFixed(2);
      //   }
      // }
      for (let i = 0; i < this.list.length; i++) {
        if (i != 0) {
          if (
            this.list[i].tax_payment_date == this.list[i - 1].tax_payment_date &&
            this.list[i].factory_code == this.list[i - 1].factory_code &&
            this.list[i - 2].colour == "table-success"
          ) {
            // console.log(this.list[i].colour);
            this.list[i].colour = "table-white";
            this.list[i - 1].colour = "table-white";
          } else if (
            this.list[i].factory_code == this.list[i - 1].factory_code &&
            this.list[i].tax_payment_date == this.list[i - 1].tax_payment_date &&
            this.list[i - 1].colour == "table-white"
          ) {
            this.list[i].colour = "table-success";
            this.list[i - 1].colour = "table-success";
          } else if (
            this.list[i].factory_code != this.list[i - 1].factory_code &&
            this.list[i - 1].colour == "table-white"
          ) {
            this.list[i].colour = "table-success";
          } else if (
            this.list[i].factory_code != this.list[i - 1].factory_code &&
            this.list[i - 1].colour == "table-success"
          ) {
            this.list[i].colour = "table-white";
          }          
        }
        for (let ll = 0; ll < this.list.length; ll++) {
          if (
            this.list[ll].net_tax == null
          ) {
            this.list[ll].colour = this.list[ll-1].colour;
          }          
        }
      }
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
      var r =0
      x = parseInt(x)
      if (isNaN(x)) {
        r = ''
      }else{
        r =  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return r
    },
    generateexcel(){
      
    this.columns.push(
                    {
                        label: "วันที่ชำระภาษี",
                        field: "tax_payment_date",
                    },
                    {
                        label: "รหัสโรงงาน",
                        field: "factory_code",
                    },
                    {
                        label: "ชื่อยี่ห้อ",
                        field: "brand_name",
                    },
                    {
                        label: "จำนวน (ดวง)",
                        field: "number",
                    },
                    {
                        label: "ดีกรี",
                        field: "degree",
                    },
                    {
                        label: "ขนาด",
                        field: "size",
                    },
                    {
                        label: "ราคาขายปลีกแนะนำ",
                        field: "per_each",
                    },
                    {
                        label: "ปริมาณน้ำสุรา",
                        field: "volume_liquor",
                    },
                    {
                        label: "จำนวนเงิน",
                        field: "net",
                    },
                    {
                        label: "ภาษีสุทธิ",
                        field: "net_tax",
                    })
    this.data = this.list
    }
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
