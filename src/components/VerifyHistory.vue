<template>
  <div class="hello container mt-5" style="height: 600px;">
    <h5 style="text-align:center">ประวัติการตรวจสอบภาษี</h5>
     <h5 style="text-align:center">{{data.industrial_name}} โดย {{data.excise_by}}</h5>
      <a
                  :href="'/map/' + data.excise_no + '/map'"
                  target="_blank"
                  style="color: black; text-decoration: none"
                >
                 <h5 style="text-align:center">ทะเบียนสรรพสามิต {{data.excise_id}}</h5>
                </a>
      <!-- <h5 style="text-align:center">ทะเบียนสรรพสามิต {{data.excise_id}}</h5> -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">เลขแผน</th>
          <th scope="col">วันที่รายงานผลการตรวจสอบแล้วเสร็จ</th>
          <th scope="col">วิธีการตรวจสอบ</th>
          <th scope="col">รอบระยะเวลาในการตรวจสอบ</th>
          <th scope="col">ภาษีสรรพสามิต</th>
          <th scope="col">เบี้ยปรับ</th>
          <th scope="col">เงินเพิ่ม</th>
          <th scope="col">ภาษีเพิ่มขึ้นเพื่อราชการส่วนท้องถิ่น</th>
          <th scope="col">รวม</th>
          <th scope="col">หมายเหตุ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in list" :key="l.id">
          <td>
            {{ l.plan_no }}
          </td>
          <td>{{ convertdatetothai(l.report_date) }}</td>
          <td>{{ l.verify }}</td>
          <td>{{ l.period }}</td>
          <td v-if="l.excise_tax">{{ l.excise_tax }}</td>
          <td v-if="!l.excise_tax">-</td>
           <td v-if="l.fine">{{ l.fine.toFixed(2) }}</td>
           <td v-if="!l.fine">-</td>
            <td v-if="l.vat">{{ l.vat.toFixed(2) }}</td>
            <td v-if="!l.vat">-</td>
             <td v-if="l.Increased_taxes">{{ l.Increased_taxes.toFixed(2) }}</td>
              <td v-if="!l.Increased_taxes">-</td>
              <td v-if="l.sum">{{ l.sum.toFixed(2) }}</td>
              <td v-if="!l.sum">-</td>
              <td>{{ l.remark }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ReportService from "../services/ReportService";
import DetailExciseService from "../services/DetailExciseService";

export default {
  name: "HelloWorld",
  data() {
    return {
      list: [],
      excise_no:'',
      data:[]
    };
  },
  props: {
    msg: String,
  },
  computed: {},
  mounted() {
    this.excise_no = this.$route.params.id
    this.loaddata();
    this.getdetail()
  },
  methods: {
    convertdatetothai(datetimes) {
      if (datetimes) {
        var d = new Date(datetimes);
var mm = d.getMonth() + 1;
var dd = d.getDate();
var yy = d.getFullYear();

        var myDateString = dd + '/' + mm + '/' + yy; //(US)
        // console.log(myDateString);
        return myDateString;
      }
    },
    loaddata() {
      ReportService.getVerify(this.excise_no)
        .then((res) => {
          // console.log(res.data);
          this.list = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getdetail(){
      DetailExciseService.getByexiseno(this.excise_no).then((res)=>{
        this.data = res.data;
        console.log(res.data);
      })
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
