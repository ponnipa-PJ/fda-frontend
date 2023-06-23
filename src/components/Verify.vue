<template>
  <div class="hello container mt-5">
    <h5 style="text-align: center"></h5>
    <table class="table">
      <!-- <tr>
        <th scope="col">สถานะกิจการ</th>
        <th scope="col">ดำเนินการ</th>
        <th scope="col">{{ count }}</th>
        <th scope="col">โรงอุตสาหกรรม</th>
      </tr> -->
      <tbody>
        <tr>
          <td colspan="4" style="text-align: center">
            จำนวนโรงอุตสาหกรรมที่ออกตรวจ
          </td>
        </tr>
        <tr>
          <td style="text-align:center">0 ครั้ง</td>
          <td style="text-align:center">1 ครั้ง</td>
          <td style="text-align:center">2 ครั้ง</td>
          <td style="text-align:center">3 ครั้งขึ้นไป</td>
          <!-- <td>รวม</td> -->
        </tr>
        <tr>
          <td style="text-align:center" @click="loaddata(0)">
            <a href="#">{{ countzero }} </a>
          </td>
          <td style="text-align:center" @click="loaddata(1)">
            <a href="#">{{ countone }} </a>
          </td>
          <td style="text-align:center" @click="loaddata(2)">
            <a href="#">{{ counttwo }}</a>
          </td>
          <td style="text-align:center" @click="loaddata(3)">
            <a href="#">{{ countthree }}</a>
          </td>
          <!-- <td @click="loaddata(0)">
            <a href="#">{{ countone + counttwo + countthree }}</a>
          </td> -->
        </tr>
      </tbody>
    </table>
    <h5 style="text-align: center" class="mt-5" v-if="round != 0">
      รายชื่อโรงอุตสาหกรรมที่ได้รับการตรวจ จำนวน {{ round }} ครั้ง
    </h5>
    <h5 style="text-align: center" class="mt-5" v-if="round == 0">
      รายชื่อโรงอุตสาหกรรมที่ไม่เคยได้รับการตรวจ
    </h5>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="table-secondary">ลำดับที่</th>
          <th scope="col" class="table-secondary">เลขทะเบียนสรรพสามิต</th>
          <th scope="col" class="table-secondary">รหัสโรงงาน</th>
          <th scope="col" class="table-secondary">ชื่อโรงอุตสาหกรรม</th>
          <th scope="col" class="table-secondary">อำเภอ</th>
          <th scope="col" class="table-secondary" v-if="round != 0">
            วันที่ตรวจสอบ
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="l.id">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            <a
              :href="'/verifyhistory/' + l.excise_id"
              target="_blank"
              style="color: black; text-decoration: none"
            >
              {{ l.excise_id }}
            </a>
          </td>
          <td>
            <a
              :href="'/verifyhistory/' + l.excise_id"
              target="_blank"
              style="color: black; text-decoration: none"
            >
              {{ l.excise_no }}
            </a>
          </td>
          <td>
            <a
              :href="'/verifyhistory/' + l.excise_id"
              target="_blank"
              style="color: black; text-decoration: none"
            >
              {{ l.excise_name }}
            </a>
          </td>
          <td>
            <a
              :href="'/verifyhistory/' + l.excise_id"
              target="_blank"
              style="color: black; text-decoration: none"
            >
              {{ l.industrial_district }}
            </a>
          </td>
          <td v-if="round != 0" style="text-align: right">
            <a
              :href="'/verifyhistory/' + l.excise_id"
              target="_blank"
              style="color: black; text-decoration: none"
            >
              {{ convertdatetothai(l.report_date) }}
            </a>
          </td>
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
  components: {},
  data() {
    return {
      list: [],
      itemPreviewImage: "",
      id: "",
      item: [],
      img: "",
      image: "",
      count: "",
      countzero: 0,
      countone: 0,
      counttwo: 0,
      countthree: 0,
      round: 1,
      reportlist: [],
    };
  },
  props: {
    msg: String,
  },
  computed: {},
  mounted() {
    this.loaddata(1);
    this.getcountopen();
  },
  methods: {
    getcountopen() {
      DetailExciseService.getDetailCountOpen().then((res) => {
        this.count = res.data.count;
      });
      DetailExciseService.getDetailCount().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].count == 0) {
            this.countzero = res.data[i].countexcise;
          } else if (res.data[i].count == 1) {
            this.countone += 1;
          } else if (res.data[i].count == 2) {
            this.counttwo += 1;
          } else if (res.data[i].count == 3) {
            this.countthree += 1;
          }
        }
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
    loaddata(r) {
      this.round = r;
      if (this.round == 0) {
        ReportService.getVerifies(0).then((res) => {
          // console.log(res.data);
          this.list = res.data;
        });
      } else {
        ReportService.getVerifies("")
          .then((res) => {
            // console.log(res.data);
            this.list = res.data;
            this.reportlist = this.groupBy(res.data, "count");
            this.list = this.reportlist[this.round];
          })
          .catch((e) => {
            console.log(e);
          });
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
</style>
