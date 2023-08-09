<template>
  <div class="container-fluid row" style="padding: 30px">
    <apexchart
      width="500"
      type="pie"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import DashboardService from "../services/DashboardService";

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  data() {
    return {
      options: {},
      series: [],
      category: [],
      data: [],
      list:[],
      color:[]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      DashboardService.getTypeOneDashboards().then((res) => {
        console.log(res.data);
        this.list = res.data
        for (let r = 0; r < res.data.length; r++) {
          this.category.push(res.data[r].categories)
        this.data.push(res.data[r].data)
        this.color.push(res.data[r].color)
        }
        
        console.log(this.category );
         console.log(this.data );
        this.loadOption();
      });
    },

    loadOption() {
      this.options = {
        colors: this.color,
        series: this.data,
    labels: this.category,
    dataLabels: {
        formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex]
        },
      },
        chart: {
          type: "pie",
          events: {
            dataPointSelection: (event, chartContext, config) => {
              // console.log(config);
              console.log(config.dataPointIndex);
              var id = ''
              console.log(this.list);
              for (let r = 0; r < this.list.length; r++) {
                console.log(r);
                if (config.dataPointIndex == r) {
                  id = this.list[r].id
                }
              }
              console.log(id);
              window.open("detailtype/" + id, "_blank");
            },
            // click: function (event, chartContext, config) {
            //     window.open("detaillevel/" + config.xaxis.categories[config.dataPointIndex], "_blank");
            // },
          },
        },
        title: {
          text: "กราฟแสดงจำนวนผลิตภัณฑ์ที่ไม่ผ่านการตรวจสอบตามเงื่อนไข",
        },
        style: {
          fontSize: "9px",
          fontWeight: "bold",
          fontFamily: "Niramit",
        }
      };
      
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
