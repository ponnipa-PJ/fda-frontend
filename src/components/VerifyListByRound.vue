<template>
  <div class="hello container mt-5">
    <h5 style="text-align: center" v-if="count != 0">
        รายชื่อโรงอุตสาหกรรมที่ได้รับการตรวจ จำนวน {{count}} ครั้ง
    </h5>
    <h5 style="text-align: center" v-if="count == 0">
        รายชื่อโรงอุตสาหกรรมที่ได้รับการตรวจ
    </h5>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="table-secondary">ลำดับที่</th>
          <th scope="col" class="table-secondary">เลขทะเบียนสรรพสามิต</th>
          <th scope="col" class="table-secondary">รหัสโรงงาน</th>
          <th scope="col" class="table-secondary">ชื่อโรงอุตสาหกรรม</th>
          <th scope="col" class="table-secondary">อำเภอ</th>
          <th scope="col" class="table-secondary">วันที่ตรวจสอบ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in list" :key="l.id">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            <router-link
              :to="'/verifyhistory/' + l.excise_id"
              style="color: black; text-decoration: none"
            >
              {{ l.excise_id }}
            </router-link>
          </td>
          <td>
            <router-link
              :to="'/verifyhistory/' + l.excise_id"
              style="color: black; text-decoration: none"
            >
              {{ l.excise_no }}
            </router-link>
          </td>
          <td>
            <router-link
              :to="'/verifyhistory/' + l.excise_id"
              style="color: black; text-decoration: none"
            >
              {{ l.excise_name }}
            </router-link>
          </td>
          <td>
            <router-link
              :to="'/verifyhistory/' + l.excise_id"
              style="color: black; text-decoration: none"
            >
              {{ l.industrial_district }}
            </router-link>
          </td>
          <td>
            <router-link
              :to="'/verifyhistory/' + l.excise_id"
              style="color: black; text-decoration: none"
            >
              {{ convertdatetothai(l.report_date) }}
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ReportService from "../services/ReportService";

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
      no:'',
      reportlist:[],
      count:''
    };
  },
  props: {
    msg: String,
  },
  computed: {},
  mounted() {
    this.count = this.$route.params.id
    this.loaddata();
  },
  methods: {
    loaddata() {
      ReportService.getVerifies('')
        .then((res) => {
          // console.log(res.data);
          if (this.count == 0) {
            this.list = res.data
          }else{
         this.reportlist = this.groupBy(res.data, "count");
           this.list = this.reportlist[this.count];
           }
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
