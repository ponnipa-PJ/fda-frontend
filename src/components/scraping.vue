<template>
  <div class="container mt-5">
    <!-- <div class="col-md-4">
      <label>สถานะ</label>
      <select class="form-select" v-model="status" @change="getproduct">
  <option value="1">ดึงข้อมูลแล้ว</option>
  <option value="0">ยังไม่ได้ดึงข้อมูล</option>
</select>
    </div> -->
   <div class="row">
    <div class="col-md-12">
      <div class="card-body">

<div class="form-group">
                  <label for="password">หมวด</label>
                  <select class="form-control form-control-sm" v-model="data.cat_id">
  <option v-for="(i,r) in category" :key="r" :value="i.id">{{i.name}}</option>
</select>
                </div>
                <div class="form-group">
                  <label>ชื่อไฟล์</label>
                  <input
                    v-model="data.file"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                  />
                </div>
                <div class="form-group mt-3">
                  <label>URL</label>
                  <textarea
                  rows="10"
                    v-model="data.url"
                    type="text"
                    class="form-control form-control-sm"
                  ></textarea>
                </div>
                <button type="button" class="btn btn-success" @click="save()">
              บันทึก
            </button>
              </div>
    </div>
   </div>
   รายการสินค้าที่ตรวจสอบ
    <div style="text-align:right" v-if="status == 0"> <button @click="getid(0)"
          data-bs-toggle="modal"
          data-bs-target="#AddProduct"
           type="submit" class="mb-3 btn btn-success">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button></div>
      <table class="table mt-3" v-if="list.length > 0">
        <thead>
          <tr>
            <th scope="col">ชื่อไฟล์</th>           
             <th scope="col" v-if="status ==1">เลขที่อนุญาต</th>

            <th scope="col">หมวด</th>
            <th scope="col" v-if="status ==1">ชื่อสินค้า</th>
            <th scope="col" v-if="status ==1">ข้อมูลสินค้า</th>
            <th scope="col" style="width: 100px!important;" v-if="status ==1">สถานะการตรวจสอบ</th>
            
            <th scope="col">url</th>
            <th scope="col"></th>
            <th scope="col" v-if="status == 0"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in pageOfItems" :key="i">           
             <td :style="l.bg">{{ l.file }}</td>
             <td :style="l.bg+';cursor: pointer;'" v-if="status ==1" @click="gotosearch(l.id)">{{ l.fda }}</td>

            <td :style="l.bg+';cursor: pointer;'" @click="gotosearch(l.id)">{{ l.cat_fda }}</td>
            <!-- <img :src="imagelists[i].path" style="width:100%">{ -->
            <td :style="l.bg+';cursor: pointer;'" v-if="status ==1" @click="gotosearch(l.id)"><img :src="l.src" style="width:100%">{{ l.name }}</td>
            <td :style="l.bg+';cursor: pointer;'" v-if="status ==1" @click="gotosearch(l.id)">{{ l.content }}</td>
            <td :style="l.bg+';width: 100px!important;'" v-if="status ==1"> <span v-if="l.statusfda == null">ไม่มีเลขอย.</span>  <span v-if="l.statusfda == 0">ไม่ผ่าน <br/>วันที่ตรวจสอบ : {{changdata(l.created_date)}}</span><span v-if="l.statusfda == 1">ผ่าน<br/>วันที่ตรวจสอบ : {{changdata(l.created_date)}}</span></td>
            <td :style="l.bg" v-if="status ==0" style="width: 500px;word-break:break-word;">{{ l.url }}</td>
            <td>
            <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#AddProduct"
              >
                <i class="fa fa-edit"></i></button
            ></a><br/><br/>
            <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-danger" 
                data-bs-toggle="modal"
                data-bs-target="#DeleteProduct"
              >
                <i class="fa fa-trash"></i></button
            ></a><br/><br/>
            <a :href="l.url" target="_blank"><i class="fa fa-globe fa-2x" aria-hidden="true"></i></a>
            
          </td>
            <td :style="l.bg" v-if="status == 0">
              <button @click="scrape(l)" type="submit" class="mb-3 btn btn-success">
                ดึงข้อมูล
    </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row" align="right">
        <div class="col-md-12">
          <jw-pagination
            :items="list"
            @changePage="onChangePage"
            :labels="customLabels"
          ></jw-pagination>
        </div>
      </div>
      <div v-if="list.length == 0" class="mt-5">
<h3 style="text-align:center">ไม่พบข้อมูล</h3>
      </div>
  <!-- Modal -->
  <div
      class="modal fade"
      id="AddProduct"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
            
          </div>
          <div class="modal-body">
            <form>
              <div class="card-body mt-3">

<div class="form-group mt-3">
                  <label for="password">หมวด</label>
                  <select class="form-control" v-model="data.cat_id">
  <option v-for="(i,r) in category" :key="r" :value="i.id">{{i.name}}</option>
</select>
                </div>
                <div class="form-group mt-3">
                  <label>Name File</label>
                  <input
                    v-model="data.file"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                  />
                </div>
                <div class="form-group mt-3">
                  <label>URL</label>
                  <textarea
                  rows="15"
                    v-model="data.url"
                    type="text"
                    class="form-control form-control-sm"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-success" @click="save()">
              บันทึก
            </button>
            <button
            id="closedproduct"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  <div
      class="modal fade"
      id="DeleteProduct"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ยืนยันการลบสินค้า</h5>
            
          </div>
         
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-success" @click="deleteproduct()">
              ยืนยัน
            </button>
            <button
            id="closedDeleteProduct"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
// import axios from "axios";
import ProductsService from '../services/ProductsService.js'
import axios from "axios";
import CategoryService from '../services/CategoryService'
import LinkService from '../services/LinkService'
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
      urlPath:'',
      title:'',
      data:{},
      pro_id:0,
      category:[],
      status:0,
      imagelists:[],
      pageOfItems: [],
      customLabels,
      filepath:''
    };
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
      window.scrollTo(0,0);
    },
     getimagefile(id) {
      axios.get(LinkService.getpythonlink()+'/base64?id=' + id).then((res) => {
        // console.log(res.data);
        // console.log('data:image/jpeg;base64,'+res.data);
        this.imagelists.push({id:id,
        path:'data:image/jpeg;base64,'+res.data})
        // this.imagelists.push('data:image/jpeg;base64,'+res.data)
        // console.log('data:image/jpeg;base64,'+res.data);
        return 'data:image/jpeg;base64,'+res.data
      });
        
      // })
    },
    deleteproduct(){
      var deletestatus ={
        statusdelete:0
      }
      ProductsService.deleteproduct(this.pro_id,deletestatus).then(()=>{
        // console.log(res.data);
        document.getElementById("closedDeleteProduct").click();
        this.getproduct();
        setTimeout(function () {
              location.reload();
            }, 500);

      })
    },
    save() {
      // console.log(this.data);
      // if (this.data.cat_id == null || this.data.cat_id == "") {
      //   alert("กรุณาเลือกหมวด");
      // } else 
      if (this.data.file == null || this.data.file == "") {
        alert("กรุณากรอกชื่อไฟล์");
      }else if (this.data.url == null ||  this.data.url == "") {
        alert("กรุณากรอก url");
      } else {
        var prodata = {
          cat_id: this.data.cat_id,
          file: this.data.file,
          path:'uploads/'+this.data.file+'.html',
          image_path:'uploads/'+this.data.file+'_files',
          status:0,
          url: this.data.url,
          statusdelete:1
        };
        // console.log(prodata);
        if (this.pro_id == 0) {
          ProductsService.createproduct(prodata).then((res) => {
            document.getElementById("closedproduct").click();
            this.getproduct();
            // alert('บันทึกสำเร็จ')
            var data = {
              id:res.data.id,
              path:'uploads/'+this.data.file+'.html',
            }
            
            this.scrape(data)
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        } else {
          ProductsService.updateproduct(this.pro_id, prodata).then(() => {
            // console.log(res.data);
            document.getElementById("closedproduct").click();
            this.getproduct();
            var data = {
              id:this.pro_id,
              path:'uploads/'+this.data.file+'.html',
            }
            
            this.scrape(data)
            alert('บันทึกสำเร็จ')
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        }
      }
    },
    getcategory(){
      CategoryService.getcategorys(1).then((res)=>{
        this.category = res.data
      })
    },
    getid(id) {
      this.pro_id = id;
      if (this.pro_id != 0) {
        this.title = "แก้ไขข้อมูลสินค้า";
        // console.log(this.user_id);
        ProductsService.getproduct(this.pro_id).then((res) => {
          // console.log(res.data);
          this.data = res.data;
        });
      } else {
        this.title = "เพิ่มข้อมูลสินค้า";
        this.data = [];
      }
    },
   getproduct(){
    // console.log(this.status);
    ProductsService.getproducts(this.status,'','').then(async (res)=>{
      // console.log(res.data);
      this.imagelists = []
      this.list = res.data
    })
   },
   changdata(data){
    const date = new Date(data)
    const result = date.toLocaleDateString('th-TH', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})
return result
   },
   findfda(data) {
    // console.log(data);
      var text = ['หมายเลขใบอนุญาต/อย.']
      var end = ['จำนวนสินค้า','ส่วนประกอบ','น้ำหนัก']
      var findfda = data
      for (let t = 0; t < end.length; t++) {
        // console.log(findfda.indexOf(end[t]));
        // console.log(findfda.indexOf(text[0]));
        // console.log(findfda.indexOf(end[t]));
        if (findfda.indexOf(end[t]) != -1) {
          // console.log(end[t]);
          findfda = findfda.substring(findfda.indexOf(text[0]),findfda.indexOf(end[t]));
        }
         

      }
      // console.log(findfda);

      findfda = findfda.replaceAll("หมายเลขใบอนุญาต/อย.", "");
      findfda = findfda.replaceAll("-", "");
      findfda = findfda.replaceAll("–", "");
      // console.log(findfda);
      // var regex = /\d+/g;
      // var matches = findfda.match(regex);  // creates array from matches
      // console.log(matches[0]);
      return findfda
    },
   scrape(data){
    // console.log(data);
    axios.get(LinkService.getpythonlink()+'/scraping?id=' + data.id+'&&path='+data.path).then(() => {
        // this.tokenize = res.data
      });
    // http://127.0.0.1:5000/scraping?id=1&&path=%27uploads/1.html%27
    // var url = 'file:///Users/ponnipa/Documents/GitHub/shophtml/%F0%9F%8D%92%20(%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%97%E0%B9%89100%25)%20Jelly%20Fiber%20%E0%B9%80%E0%B8%88%E0%B8%A5%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B9%84%E0%B8%9F%E0%B9%80%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%20%E0%B8%A5%E0%B8%94%E0%B8%9E%E0%B8%B8%E0%B8%87%20%E0%B8%A5%E0%B8%94%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%81%201%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87_5%20%E0%B8%8B%E0%B8%AD%E0%B8%87%20_%20Shopee%20Thailand.html'
    // var paths = {
    //   id:data.id,
    //   path:data.path
    // }
    // console.log(path);
    // ProductsService.saveimageproduct(path).then(()=>{
    // ProductsService.scraping(paths).then((res)=>{
      axios.get(LinkService.getpythonlink()+'/scrapingcontent?path=' + data.path).then((res) => {
        // console.log(res.data);
      var con = res.data
      // console.log(con);
      var fda = this.findfda(con)
      fda = fda.replaceAll(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
      fda = fda.replaceAll(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');

      // console.log(fda);
      con = con.replaceAll(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
      con = con.replaceAll(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');
      // // console.log(con);scrapingheader
      // ProductsService.scrapingheader(paths).then((res)=>{
              axios.get(LinkService.getpythonlink()+'/scrapingheader?path=' + data.path).then((res) => {
// console.log(res.data);
        var name = res.data
        name = name.replaceAll(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');

        // console.log(name);
        
      if (con) {
        var pro = {
          name:name,
          content:con,
          status:1,
      fda:fda
        }
        // console.log(pro);
        ProductsService.updatescraping(data.id,pro).then(()=>{
          // console.log(res.data);
          // alert('บันทึกเรียบร้อย')
          this.data = {}
          // let route = this.$router.resolve({ path: "/"+ data.id});
          // window.open(route.href);
          // window.location = '/';
          this.gotocheckstatus(data.id)
//           const router = useRouter();
// const routeData = router.resolve({name: '/', query: {id: data.id}});
// window.open(routeData.href, '_blank');
          this.getproduct()
            //     setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          // this.$router.push("/?id="+data.id,'_blank');
        })
    
      }
    });
    })
  // });
   },
   gotosearch(id){
    window.open('/import?id='+id, '_blank');
   },
   gotocheckstatus(id){
    window.open('/check?id='+id, '_blank');
   },
   gotofile(url){
    window.open(this.filepath+url, '_blank');
   }
  },
  mounted() {
    this.getproduct()
    this.getcategory()
    CategoryService.database_path().then((res)=>{
      this.filepath = res.data.backend_path
    })
    // this.getimagefile(1)
//     var data = [
//   { id: 2, name: "FIAT", active: true, parentId: "1" },
//   { id: 11, name: "BMW", active: true, parentId: "1" },
//   { id: 3, name: "RENAULT", active: false, parentId: "1" },
//   { id: 0, name: "AUDI", active: true, parentId: "1" },
// ];
// data = data.sort((a, b) => {
//   if (a.id < b.id) {
//     return -1;
//   }
// });
// console.log(data);
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
}
a{
  
    color: black;
    text-decoration: none;

}</style>
