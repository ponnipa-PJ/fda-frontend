<template>
  <div class="container mt-5">
      <table class="table" v-if="list.length > 0" width="100%">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">keyword</th>
            <th scope="col" style="text-align:center"> เกินจริง</th>
            <th scope="col" style="text-align:center"> ไม่เกินจริง</th>
            <th scope="col" style="text-align:center"> Total</th>
            <th scope="col" style="text-align:center"> Probability</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in list" :key="i">
            <td :style="l.bg">{{ i+1 }}</td>
            <td :style="l.bg">{{ l.name }}</td>
            <td style="text-align:center">{{ l.statustrue || 0 }}</td>
            <td style="text-align:center">{{ l.statusfalse || 0 }}</td>
            <td style="text-align:center">{{ l.total || 0 }}</td>
            <td style="text-align:center">{{ Probability(l.statustrue , l.total)}}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>

import KeywordService from '../services/KeywordService'

const customLabels = {
  first: "<<",
  last: ">>",
  previous: "<",
  next: ">",
};

export default {
  name: "App",
  components: {},
  data() {
    return {
      type: 0,
      list: [],
      url:'',
      file:'',
      status:false,
      urlPath:'',
      title:'',
      data:{},
      pro_id:0,
      category:[],
      pageOfItems: [],
      customLabels,
    };
  },
  methods: {
    Probability(statustrue,total){
      var result = 0
      if (statustrue && total) {
        result = (statustrue/total).toFixed(2) + '%'
      }
return result
    },
    getcategory(){
      KeywordService.gettraining().then((res)=>{
        console.log(res.data);
        this.list = res.data
      })
    },
  },
  mounted() {
    this.getcategory()
//     var corpus=
//     {
// dict1 : 1
//     }
//     RuleBasedService.createrule_based(corpus).then((res) => {
//       console.log(res.data);
//     });
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
}</style>
