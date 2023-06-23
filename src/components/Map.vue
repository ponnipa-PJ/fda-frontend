<template>
  <div>
    <div v-if="show" style="padding: 20px">
      <div class="row">
        <div class="col-6">
          <div>{{ data.excise_name }}</div>
          <div>ทะเบียนสรรพสามิต {{ data.excise_id }}</div>
          <img src="" />
          <div
            class="mt-5"
            style="border-style: solid; padding: 10px; text-align: center"
          >
            <label>พิกัด {{ data.latitude }} , {{ data.longitude }}</label>
          </div>
        </div>
        <div class="col-6">
          <div style="text-align: right">ข้อมูล ณ วันที่ {{ date }}</div>
          <div style="text-align: right">
            {{ data.industrial_moo }} {{ data.industrial_subdistrict }}
            {{ data.industrial_district }} {{ data.industrial_province }}
          </div>
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
                <th scope="col">จำนวนดวงแสตมป์</th>
                <th scope="col" style="text-align: center">รายการสินค้า</th>
              </tr>
              <tr>
                <th scope="col">(ดวง)</th>
                <th scope="col" v-for="s in detail" :key="s.name">
                  {{ s.brand_name }}
                </th>
                <th
                  rowspan="4"
                  style="text-align: center"
                  align="center"
                  scope="col"
                >
                  รวม
                </th>
              </tr>
              <tr>
                <th scope="col"></th>
                <th
                  scope="col"
                  style="text-align: right"
                  v-for="s in detail"
                  :key="s.name"
                >
                  {{ s.degree }} ดีกรี
                </th>
              </tr>
              <tr>
                <th scope="col">เดือนที่ชำระภาษี</th>
                <th
                  scope="col"
                  style="text-align: right"
                  v-for="s in detail"
                  :key="s.name"
                >
                  {{ s.size }} ลิตร
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in table" :key="t.name">
                <th v-if="t.month == 1">มกราคม {{ t.year }}</th>
                <th v-if="t.month == 2">กุมภาพันธ์ {{ t.year }}</th>
                <th v-if="t.month == 3">มีนาคม {{ t.year }}</th>
                <th v-if="t.month == 4">เมษายน {{ t.year }}</th>
                <th v-if="t.month == 5">พฤษภาคม {{ t.year }}</th>
                <th v-if="t.month == 6">มิถุนายน {{ t.year }}</th>
                <th v-if="t.month == 7">กรกฎาคม {{ t.year }}</th>
                <th v-if="t.month == 8">สิงหาคม {{ t.year }}</th>
                <th v-if="t.month == 9">กันยายน {{ t.year }}</th>
                <th v-if="t.month == 10">ตุลาคม {{ t.year }}</th>
                <th v-if="t.month == 11">พฤศจิกายน {{ t.year }}</th>
                <th v-if="t.month == 12">ธันวาคม {{ t.year }}</th>
                <th v-if="statusthreethree" style="text-align: right">
                  {{ t.threethree }}
                </th>
                <th v-if="statussixtwofive" style="text-align: right">
                  {{ t.sixtwofive }}
                </th>
                <th v-if="statussixthree" style="text-align: right">
                  {{ t.sixthree }}
                </th>
                <th v-if="statusseven" style="text-align: right">
                  {{ t.seven }}
                </th>
                <th v-if="statussevenfive" style="text-align: right">
                  {{ t.sevenfive }}
                </th>
                <th style="text-align: right">{{ t.sumnumber }}</th>
              </tr>
              <tr>
                <th>รวม</th>
                <th v-if="sumthreethree != 0" style="text-align: right">
                  {{ sumthreethree }}
                </th>
                <th v-if="sumsixtwofive != 0" style="text-align: right">
                  {{ sumsixtwofive }}
                </th>
                <th v-if="sumsixthree != 0" style="text-align: right">
                  {{ sumsixthree }}
                </th>
                <th v-if="sumseven != 0" style="text-align: right">
                  {{ sumseven }}
                </th>
                <th v-if="sumsevenfive != 0" style="text-align: right">
                  {{ sumsevenfive }}
                </th>
                <th v-if="total != 0" style="text-align: right">{{ total }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <longdo-map
      :zoom="10"
      v-if="markers"
      :location="{ lon: 100.19, lat: 19.22 }"
      :lastView="false"
      @load="event"
    >
      <longdo-map-marker
        v-for="(item, i) in markers"
        :key="i"
        :id="item.id"
        :location="item.location"
        :title="item.title"
        :icon="item.icon"
      />
    </longdo-map>
  </div>
</template>

<script>
// import longdo from "longdo-map-vue";
import DetailExciseService from "../services/DetailExciseService.js";
import MergeLiquorReportService from "../services/MergeLiquorReportService";

export default {
  name: "App",
  components: {},
  data() {
    return {
      show: false,
      loncurrent: "",
      locat: {},
      locationList: [
        { lon: 99, lat: 14 },
        { lon: 100, lat: 13 },
        { lon: 102, lat: 13 },
        { lon: 103, lat: 14 },
      ],
      markers: [],
      series: [],
      numthreethree: [],
      numsixtwofive: [],
      numsixthree: [],
      numseven: [],
      numsevenfive: [],
      table: [],
      chartOptions: {},
      detail: [],
      month: [],
      sumthreethree: 0,
      sumsixtwofive: 0,
      sumsixthree: 0,
      sumseven: 0,
      sumsevenfive: 0,
      total: 0,
      checkreport: [],
    };
  },
  methods: {
    go() {},
    loadMap(map) {
      // console.log(map);
      console.log(map.location());
      this.loncurrent = map.location().lon;
      this.latcurrent = map.location().lat;
    },
    event(map) {
      // console.log(map);
      map.Event.bind("overlayClick", function (overlayClick) {
        // console.log(overlayClick);
        var title = overlayClick.title;
        var lon = overlayClick.location().lon
        var lat = overlayClick.location().lat
        DetailExciseService.getlExciseNo(title,lon,lat).then((res) => {
          // console.log(res.data);
          window.open(
            "/map/" + res.data.excise_no + "/map",
            "_blank" // <- This is what makes it open in a new window.
          );
        });
      });
    },
    loadmarker() {
      // ReportService.getCheckReport().then((res) => {
        // console.log(res.data);
        // this.checkreport = res.data;
        DetailExciseService.getDetailmap()
        .then((res) => {
          // console.log(res.data);
          var map = res.data;
          for (let i = 0; i < map.length; i++) {
            var desc =
              // " โดย " +
              // map[i].excise_by +
              // "<br/>" +
              // "ทะเบียนสรรพสามิต " +
              // map[i].excise_id +
              // "<br/>" +
              // map[i].industrial_moo +
              // " " +
              // map[i].industrial_subdistrict +
              // " " +
              // map[i].industrial_district +
              // " " +
              // map[i].industrial_province +
              // "<br/>" +
              // "พิกัด " +
              // map[i].latitude +
              // "," +
              // map[i].longitude +
              // "<br/><br/>" +
              '<iframe src="map/' +
              map[i].excise_no +
              '" height="800" width="800" title="Iframe Example"></iframe>';
            // '<button onclick="alert(0000)">test</button>'+
            // '<div><a href="map/' +
            // map[i].excise_no +
            // '">รายละเอียดเพิ่มเติม</a></div>';
            this.markers.push({
              location: { lon: map[i].longitude, lat: map[i].latitude },
              title: map[i].excise_name,
              id:map[i].excise_no,
              detail: desc,
              excise_no: map[i].excise_no,
              excise_id: map[i].excise_id,
              icon: { url: "https://api-excise.siwapreeya.in.th/map_blue.png" },
              number: map[i].number,
            });
          }
          // console.log(this.markers);
          for (let m = 0; m < this.markers.length; m++) {
            // console.log(this.markers[m].number);
              if (this.markers[m].number <= 200) {
                this.markers[m].icon = {
                  url: "https://api-excise.siwapreeya.in.th/red.png",
                };
              }
          }
        })
        .catch((e) => {
          console.log(e);
        });
      // console.log(this.markers);
      // });
      
    },
    loadDetail() {
      MergeLiquorReportService.getTablebyfactory_code(541164).then((res) => {
        // console.log(res.data);
        this.table = res.data;
        for (let t = 0; t < this.table.length; t++) {
          this.numthreethree.push(this.table[t].threethree);
          this.numsixtwofive.push(this.table[t].sixtwofive);
          this.numsixthree.push(this.table[t].sixthree);
          this.numseven.push(this.table[t].seven);
          this.numsevenfive.push(this.table[t].sevenfive);

          this.total = this.total + this.table[t].sumnumber;
          this.sumthreethree = this.sumthreethree + this.table[t].threethree;
          this.sumsixtwofive = this.sumsixtwofive + this.table[t].sixtwofive;
          this.sumsixthree = this.sumsixthree + this.table[t].sixthree;
          this.sumseven = this.sumseven + this.table[t].seven;
          this.sumsevenfive = this.sumsevenfive + this.table[t].sevenfive;

          if (this.table[t].month == 1) {
            this.month.push("มกราคม");
          } else if (this.table[t].month == 2) {
            this.month.push("กุมภาพันธ์");
          } else if (this.table[t].month == 3) {
            this.month.push("มีนาคม");
          } else if (this.table[t].month == 4) {
            this.month.push("เมษายน");
          } else if (this.table[t].month == 5) {
            this.month.push("พฤษภาคม");
          } else if (this.table[t].month == 6) {
            this.month.push("มิถุนายน");
          } else if (this.table[t].month == 7) {
            this.month.push("กรกฎาคม");
          } else if (this.table[t].month == 8) {
            this.month.push("สิงหาคม");
          } else if (this.table[t].month == 9) {
            this.month.push("กันยายน");
          } else if (this.table[t].month == 10) {
            this.month.push("ตุลาคม");
          } else if (this.table[t].month == 11) {
            this.month.push("พฤศจิกายน");
          } else if (this.table[t].month == 12) {
            this.month.push("ธันวาคม");
          }
        }
      });
      MergeLiquorReportService.getDetailbyfactory_code(541164).then((res) => {
        // console.log(res.data);
        this.detail = res.data;
        for (let i = 0; i < this.detail.length; i++) {
          this.series.push({
            name:
              this.detail[i].brand_name +
              " - " +
              this.detail[i].degree +
              " - " +
              this.detail[i].size,
            size: this.detail[i].size,
          });
        }
        for (let s = 0; s < this.series.length; s++) {
          if (this.series[s].size == "0.33") {
            this.series[s]["data"] = this.numthreethree;
          } else if (this.series[s].size == "0.625") {
            this.series[s]["data"] = this.numsixtwofive;
          } else if (this.series[s].size == "0.63") {
            this.series[s]["data"] = this.numsixthree;
          } else if (this.series[s].size == "0.7") {
            this.series[s]["data"] = this.numseven;
          } else if (this.series[s].size == "0.75") {
            this.series[s]["data"] = this.numsevenfive;
          }
        }
        // console.log(this.series);
        this.loadchartOptions();
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
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "จำนวนดวงแสตมป์",
          align: "left",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: this.month,
          title: {
            text: "เดือน",
          },
        },
        yaxis: {
          title: {
            text: "จำนวนขวด หรือดวง",
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
  },
  mounted() {
    this.loadmarker();
    console.log(this.currentUser);
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style>
html,
body {
  font-size: 9px !important;
  height: 100%;
  margin: 0px;
}
.ldmap_placeholder {
  position: relative;
  width: 100%;
  height: 700px !important;
  min-width: 100px;
  min-height: 700px !important;
  background: #eee;
  font: 12px/1.2 Tahoma, sans-serif;
  overflow: hidden;
  z-index: 0;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
}
.ldmap_placeholder .ldmap_frame .ldmap_popup {
  min-width: 800px !important;
  min-height: 500px !important;
}
.ldmap_placeholder .ldmap_frame .ldmap_popup_detail {
  max-width: 970% !important;
  max-height: 540px !important;
}
.ldmap_placeholder .ldmap_frame .ldmap_popup_title {
  font-size: 9px !important;
}
</style>
