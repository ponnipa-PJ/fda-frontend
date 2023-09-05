<template>
  <div class="container" style="height: 600px">
    <div  v-for="(l, i) in list" :key="i">
      <div v-if="!l.fdaid">
<Advertising :fdaid="l.id" class="mb-5"></Advertising></div>
  </div>
</div>
</template>

<script>
import ProductsService from '../services/ProductsService.js'
import Advertising from '../components/Advertising.vue'

export default {
  name: "App",
  components: {Advertising},
  data() { 
    return {
      fdaid:0,
      list: [],
      url: '',
      file: '',
      status: false,
      urlPath: '',
      imagelists: '',
      tokenize: '',
      matchname:'',
      matchcategory:'',
      type:'',
      matchnamesum:'',
      statusname:0,
      statuscat:0,
      statusfda:0,
      colorname:'background-color:#f9bdbb',
      colorfda:'background-color:#f9bdbb',
      colorcat:'background-color:#f9bdbb',
      id:'',
      
    };
  },
  methods: {
  },
  mounted() {
    ProductsService.getproducts(1,'','').then(async (res)=>{
        this.list = res.data
      // }
      })
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
}
</style>
