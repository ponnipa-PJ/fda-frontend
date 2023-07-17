<template>
  <div class=" mt-5">
      <table class="table" v-if="list.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">url</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in list" :key="i">
            <td :style="l.bg">{{ i + 1 }}</td>
            <td :style="l.bg" style="width:10%">{{ l.url }}</td>
           
            <td :style="l.bg">
              <button @click="scrape(l)" type="submit" class="mb-3 btn btn-success">
      scraping
    </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="list.length == 0" class="mt-5">
<h3 style="text-align:center">ไม่พบข้อมูล</h3>
      </div>
  </div>
</template>

<script>
// import moment from 'moment'
// import axios from "axios";
import ProductsService from '../services/ProductsService.js'
import axios from "axios";

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
      urlPath:''
    };
  },
  methods: {
   getproduct(){
    ProductsService.getproducts('').then((res)=>{
      this.list = res.data
      console.log(res.data);
    })
   },
   scrape(data){
    axios.get('http://127.0.0.1:5000/scraping?id=' + data.id+'&&path='+data.path).then(() => {
        // this.tokenize = res.data
      });
    // http://127.0.0.1:5000/scraping?id=1&&path=%27uploads/1.html%27
    // var url = 'file:///Users/ponnipa/Documents/GitHub/shophtml/%F0%9F%8D%92%20(%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%97%E0%B9%89100%25)%20Jelly%20Fiber%20%E0%B9%80%E0%B8%88%E0%B8%A5%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B9%84%E0%B8%9F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B8%A5%E0%B8%94%E0%B8%9E%E0%B8%B8%E0%B8%87%20%E0%B8%A5%E0%B8%94%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%81%201%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87_5%20%E0%B8%8B%E0%B8%AD%E0%B8%87%20_%20Shopee%20Thailand.html'
    var path = {
      id:data.id,
      path:data.path
    }
    // console.log(path);
    // ProductsService.saveimageproduct(path).then(()=>{
    ProductsService.scraping(path).then((res)=>{
      var con = res.data
      // con = con.replaceAll(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
      con = con.replaceAll(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');
      // console.log(con);
      ProductsService.scrapingheader(path).then((res)=>{
        var name = res.data
        name = name.replaceAll(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');

        // console.log(res.data);
        
      if (con) {
        var pro = {
          name:name,
          content:con,
          status:1
        }
        // console.log(pro);
        ProductsService.updateproduct(data.id,pro).then(()=>{
          // console.log(res.data);
          alert('บันทึกเรียบร้อย')
          this.getproduct()
        })
    
      }
    });
    })
  // });
   }
  },
  mounted() {
    this.getproduct()
    // var url = 'file:///Users/ponnipa/Documents/GitHub/shophtml/%F0%9F%8D%92%20(%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%97%E0%B9%89100%25)%20Jelly%20Fiber%20%E0%B9%80%E0%B8%88%E0%B8%A5%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B9%84%E0%B8%9F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B8%A5%E0%B8%94%E0%B8%9E%E0%B8%B8%E0%B8%87%20%E0%B8%A5%E0%B8%94%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%81%201%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87_5%20%E0%B8%8B%E0%B8%AD%E0%B8%87%20_%20Shopee%20Thailand.html'
    // ProductsService.scraping(url).then((res)=>{
    //   console.log(res.data);
    // })
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
}</style>
