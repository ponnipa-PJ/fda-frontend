<template>
  <div class="hello container mt-5">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <td colspan="3" style="text-align: center">
            จำนวนโรงอุตสาหกรรมที่ไม่ชำระภาษี
          </td>
        </tr>
        <tr>
          <td style="text-align: center"></td>
          <td style="text-align: center"></td>
          <td style="text-align: center"></td>
        </tr>
        <tr>
          <td style="text-align: center">{{ convertnamemonth(threeno) }}</td>
          <td style="text-align: center">{{ convertnamemonth(twono) }}</td>
          <td style="text-align: center">{{ convertnamemonth(oneno) }}</td>
        </tr>
        <tr>
          <td @click="loaddata(threeno)" style="text-align: center">
            <a href="#">{{ marcount.length }} </a>
          </td>
          <td @click="loaddata(twono)" style="text-align: center">
            <a href="#">{{ febcount.length }}</a>
          </td>
          <td @click="loaddata(oneno)" style="text-align: center">
            <a href="#">{{ jancount.length }}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <h5 style="text-align: center" class="mt-5">
      รายชื่อโรงอุตสาหกรรมที่ไม่ได้ชำระภาษี เดือน{{ monthname }}
      <span v-if="monthname != 'ธันวาคม'">{{ yearcurrent }}</span>
       <span v-else>{{ yearcurrent-1 }}</span>
    </h5>
    <div class="row">
      <!-- <div class="col-9"></div> -->
      <!-- <div class="col-3" align="right">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-6 col-form-label"
            >Order By</label
          >
          <div class="col-sm-6">
            <select
              class="custom-select"
              id="inputGroupSelect01"
              v-model="sortid"
              @change="orderby"
            >
              <option value="0">อำเภอ</option>
              <option value="2">เลขทะเบียนสรรพสามิต</option>
            </select>
          </div>
        </div>
      </div> -->
    </div>
    <table class="table mb-5">
      <thead>
        <tr>
          <th scope="col" class="table-secondary">ลำดับที่</th>
          <th scope="col" class="table-secondary">เลขทะเบียนสรรพสามิต</th>
          <th scope="col" class="table-secondary">รหัสโรงงาน</th>
          <th scope="col" class="table-secondary">ชื่อโรงอุตสาหกรรม</th>
          <th scope="col" class="table-secondary">อำเภอ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="l.id">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            <a
              :href="'/map/' + l.excise_no + '/map'"
              target="_blank"
              style="color: black; text-decoration: none"
            >
              {{ l.excise_id }}
            </a>
          </td>
          <td>
            <a
              :href="'/map/' + l.excise_no + '/map'"
              target="_blank"
              style="color: black; text-decoration: none"
            >
              {{ l.excise_no }}
            </a>
          </td>
          <td>
            <a
              :href="'/map/' + l.excise_no + '/map'"
              target="_blank"
              style="color: black; text-decoration: none"
            >
              {{ l.excise_name }}
            </a>
          </td>
          <td>
            <a
              :href="'/map/' + l.excise_no + '/map'"
              target="_blank"
              style="color: black; text-decoration: none"
            >
              {{ l.industrial_district }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MergeLiquorReportService from "../services/MergeLiquorReportService";
// import ReportService from "../services/ReportService";

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
      no: "",
      jancount: [],
      febcount: [],
      marcount: [],
      yearcurrent: "",
      monthname: "",
      onename: "",
      twoname: "",
      threename: "",
      oneno: "",
      twono: "",
      threeno: "",
      count: 1,
      sortid: 0,
    };
  },
  props: {
    msg: String,
  },
  computed: {},
  mounted() {
    const d = new Date();
    this.yearcurrent = parseInt(d.getFullYear() + 543);
    // var oneDate = new Date(d.setMonth(d.getMonth() + 1));
    // var twoDate = new Date(d.setMonth(d.getMonth() - 1));
    // var threeDate = new Date(d.setMonth(d.getMonth() - 1));
    this.oneno = parseInt(d.getMonth()+1);
    this.twono = parseInt(d.getMonth()+1-1);
    this.threeno = parseInt(d.getMonth()+1-2);
    if(this.oneno == 0){
this.oneno = 12
    }
    if(this.twono == 0){
this.twono = 12
    }
    if(this.threeno == 0){
this.threeno = 12
    }
    // console.log(d)
    // console.log(this.oneno)
    // console.log(this.twono)
    // console.log(this.threeno)
    this.count = this.oneno;
    this.monthname = this.convertnamemonth(this.oneno);
    this.getcount();
  },
  methods: {
    convertnamemonth(month) {
      if (month == 1) {
        return "มกราคม";
      } else if (month == 2) {
        return "กุมภาพันธ์";
      } else if (month == 3) {
        return "มีนาคม";
      } else if (month == 4) {
        return "เมษายน";
      } else if (month == 5) {
        return "พฤษภาคม";
      } else if (month == 6) {
        return "มิถุนายน";
      } else if (month == 7) {
        return "กรกฎาคม";
      } else if (month == 8) {
        return "สิงหาคม";
      } else if (month == 9) {
        return "กันยายน";
      } else if (month == 10) {
        return "ตุลาคม";
      } else if (month == 11) {
        return "พฤศจิกายน";
      } else if (month == 12) {
        return "ธันวาคม";
      }
    },
    orderby(event) {
      this.sortid = event.target.value;
      this.loaddata(this.count);
    },
    mergenottax(list, month) {
      console.log(month);
      var listdata = [];
      var close = 0;
      var open = 0;
      for (let j = 0; j < list.length; j++) {
        if (list[j].registration_status == "ปิดกิจการ") {
          close = close + 1;
        } else {
          open = open + 1;
        }
        // if (list[j].registration_status == "ปิดกิจการ") {
        //   // console.log(list[j].registration_status);
        //   // console.log(list[j].status_date);
        //   var m = new Date(list[j].status_date);
        //   m.setDate(m.getDate() - 1);
        //   // console.log(m.getFullYear());
        //   if (m.getFullYear() == this.yearcurrent) {
        //     // console.log(m.getMonth() + 1 , month);
        //     if (m.getMonth() + 1 == month) {
        //       // console.log(list[j].status_date);
        //       listdata.push({
        //         excise_name: list[j].excise_name,
        //         excise_id: list[j].excise_id,
        //         excise_no: list[j].excise_no,
        //         industrial_district: list[j].industrial_district,
        //       });
        //     }
        //   }
        // } else if (list[j].registration_status == "ดำเนินกิจการ") {
        //   listdata.push({
        //     excise_name: list[j].excise_name,
        //     excise_id: list[j].excise_id,
        //     excise_no: list[j].excise_no,
        //     industrial_district: list[j].industrial_district,
        //   });
        // }
        listdata.push({
            excise_name: list[j].excise_name,
            excise_id: list[j].excise_id,
            excise_no: list[j].excise_no,
            industrial_district: list[j].industrial_district,
          });
      }
      // console.log(close, open);
      // console.log(listdata)
      return listdata;
    },
    getcount() {
      var yearone = this.yearcurrent
      var yeartwo = this.yearcurrent
      var yearthree = this.yearcurrent
      if (this.oneno == 12) {
        yearone = this.yearcurrent-1
      }

      if (this.twono == 12) {
        yeartwo = this.yearcurrent-1
      }

      if (this.threeno == 12) {
        yearthree = this.yearcurrent-1
      }
      console.log(this.oneno, this.twono, this.threeno);
      console.log(yearone, yeartwo, yearthree);
      MergeLiquorReportService.getCountNotTax(
        this.oneno,
        yearone,
        this.sortid
      ).then((res) => {
        // console.log(res.data);
        this.jancount = this.mergenottax(res.data, this.oneno);
        // console.log(this.jancount);
        this.list = this.jancount;
      });
      MergeLiquorReportService.getCountNotTax(
        this.twono,
        yeartwo,
        this.sortid
      ).then((res) => {
        this.febcount = this.mergenottax(res.data, this.twono);
      });
      MergeLiquorReportService.getCountNotTax(
        this.threeno,
        yearthree,
        this.sortid
      ).then((res) => {
        this.marcount = this.mergenottax(res.data, this.threeno);
      });
    },
    loaddata(month) {
      // console.log(month);
      // console.log(this.sortid);
      this.count = month;
      
      var year = this.yearcurrent
      if (this.count == 12) {
        year = this.yearcurrent-1
      }
      this.monthname = this.convertnamemonth(month);
      MergeLiquorReportService.getCountNotTax(
        this.count,
        year,
        this.sortid
      ).then((res) => {
        this.list = this.mergenottax(res.data, this.count);
      });
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
</style>
