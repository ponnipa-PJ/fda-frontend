<template>
  <div class="container mt-5">
    <!-- <div style="text-align:right"> <button @click="getid(0)"
          data-bs-toggle="modal"
          data-bs-target="#AddScopus"
           type="submit" class="mb-3 btn btn-success">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button></div> -->
    <div class="mb-5">
      <table class="table table-striped table-bordered" style="background-color:#4472C4" v-if="list.length > 0" width="100%">
        <thead>
          <tr>
            <th scope="col" style="text-align:center">ลำดับของเว็บไซต์</th>
            <th scope="col">ประเภทผลิตภัณฑ์</th>
            <th scope="col">รายละเอียดสินค้า</th>
            <th scope="col"></th>
            
            <th scope="col" style="text-align:center">เข้าสู่ระบบการเทรน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in list" :key="i+1">
            <td style="width:20%">{{ l.url }}</td>
            <td style="width:20%">{{ l.typename }}</td>
            <td style="width:40%">
              <img :src="l.img_path" style="width:50%"><br>
              {{ l.sentence }}</td>
            <td style="width:5%">{{ l.rulename }}</td>
          <td style="text-align:center"><a :href="'/addproducttoken?id='+l.id"> <button
                type="button"
                style="color:white;"
                class="btn btn-warning"
              >  <i class="fa fa-edit"></i>
               </button
            > </a>
            &nbsp;<a :href="'/product/'+l.id"> <button
                type="button"
                style="background-color: #4472C4;color:white;"
                class="btn"
              >เทรน
               </button
            > </a></td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="row" align="right">
        <div class="col-md-12">
          <jw-pagination
            :items="list"
            @changePage="onChangePage"
            :labels="customLabels"
          ></jw-pagination>
        </div>
      </div> -->
      <div v-if="list.length == 0" class="mt-5">
<h3 style="text-align:center">ไม่พบข้อมูล</h3>
      </div>
    </div>
  <!-- Modal -->
  <div
      class="modal fade"
      id="AddScopus"
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
                  <label>ข้อความ</label>
                  <input
                    v-model="data.name"
                    type="text"
                    min="1"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-success" @click="save()">
              บันทึก
            </button>
            <button
            id="closedcategory"
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
      id="DeleteScopus"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ยืนยันการลบหมวด</h5>
            
          </div>
         
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-success" @click="deleteScopus()">
              ยืนยัน
            </button>
            <button
            id="closedDeleteScopus"
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

import KeywordService from '../services/KeywordService'
import axios from 'axios';
import RuleBasedService from '../services/RuleBasedService'
import DictService from '../services/DictService'
import MapRuleBasedService from '../services/MapRuleBasedService'
import LinkService from '../services/LinkService'
import ProductsService from '../services/ProductsService'

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
     onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
      window.scrollTo(0,0);
    },
    deleteScopus(){
      console.log(this.pro_id);
      var data ={
        status: 0
      }
      MapRuleBasedService.deletemap_rule_based(this.pro_id,data).then((res)=>{
        console.log(res.data);
        document.getElementById("closedDeleteScopus").click();
        this.getcategory();
        alert('บันทึกสำเร็จ')
      })
    },
    save() {
      console.log(this.data);
      if (this.data.name == null || this.data.cat_id == "") {
        alert("กรุณากรอกข้อความ");
      } else {
        var prodata = {
          id:this.data.id,
          name: this.data.name,
          status:1,
        };
        console.log(prodata); 
        if (this.pro_id == 0) {
          KeywordService.createkeyword(prodata).then(() => {
          DictService.createdict(prodata).then((res) => {
            // console.log(res.data );
            RuleBasedService.createdcolumnrule_based(res.data.id).then(() => {
            document.getElementById("closedcategory").click();
            this.getcategory();
            alert('บันทึกสำเร็จ')
          });
        });
      });
        } else {
          KeywordService.updatekeyword(this.pro_id,prodata).then(() => {
            document.getElementById("closedcategory").click();
            this.getcategory();
            alert('บันทึกสำเร็จ')
          });
            }
      }
    },
    token(text){
      var tokenize = ''
      axios.get(LinkService.getpythonlink()+'/tokenkeyword?text=' + text).then((res) => {
        // this.tokenize = res.data
        // console.log(res.data);
        tokenize = res.data
      });
      return tokenize
    },
    updatetoken(data,type){
      // console.log(data);
      var tokenize= ''
      // data.name = data.name.replaceAll(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
      // data.name = data.name.replaceAll(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');

      axios.get(LinkService.getpythonlink()+'/tokenkeyword?text=' + data.name).then((res) => {
        this.tokenize = res.data
        // console.log(res.data);
        tokenize = res.data.replaceAll(" ",'')
        tokenize = tokenize.replaceAll(".",'')
        tokenize = tokenize.replaceAll("''",'')
        tokenize = tokenize.replaceAll(",,",',')
        tokenize = tokenize.replaceAll('[','')
        tokenize = tokenize.replaceAll(']','')
        tokenize = tokenize.replaceAll("'",'')
        tokenize = tokenize.replaceAll(",",' | ')
      var tokendata = {
        name:data.name,
        token: tokenize,
        };
        // console.log(tokendata);
        // console.log(data.id);
        KeywordService.updatekeyword(data.id, tokendata).then(() => {
          // console.log(res.data);
          if (type == 'update') {
            document.getElementById("closedcategory").click();
            this.getcategory();
            alert('บันทึกสำเร็จ')
          }
        });
      });
    },
    getcategory(){
      ProductsService.getproductstoken('').then((res)=>{
        console.log(res.data);
        this.list = res.data
        
      })
    },
    getid(id) {
      // console.log(id);
      this.pro_id = id;
    },
  },
  mounted() {
    this.getcategory()
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
}
/* .table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
   background-color: #CFD5EA;
} */
.table-striped>tbody>tr:nth-child(odd)>td,
.table-striped>tbody>tr:nth-child(odd)>th {
  background-color: #CFD5EA;
  /* color: white; */
}
.table-striped>tbody>tr:nth-child(even)>td,
.table-striped>tbody>tr:nth-child(even)>th {
  background-color: #E7EBF5;
  /* color: white; */
}
</style>
