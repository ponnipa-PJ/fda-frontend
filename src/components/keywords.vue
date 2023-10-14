<template>
  <div class="container mt-5">
    <!-- <div style="text-align:right"> <button @click="getid(0)"
          data-bs-toggle="modal"
          data-bs-target="#AddScopus"
           type="submit" class="mb-3 btn btn-success">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button></div> -->
     <table class="table" v-if="list.length > 0" width="100%">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ข้อความ</th>
            <!-- <th scope="col">ตัดคำ</th> -->
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in list" :key="i">
            <td :style="l.bg">{{ i + 1 }}</td>
            <td :style="l.bg">{{ l.name }}</td>
            <td :style="l.bg">{{ l.token }}</td>
            <td>
            <!-- <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#AddScopus"
              >
                <i class="fa fa-edit"></i></button
            ></a>&nbsp;
            <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#DeleteScopus"
              >
                <i class="fa fa-trash"></i></button
            ></a> -->
          </td>
          </tr>
        </tbody>
      </table>
      <!-- <table class="table" v-if="list.length > 0" width="100%">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ข้อความ</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in pageOfItems" :key="i">
            <td :style="l.bg">{{ i + 1 }}</td>
            <td :style="l.bg">{{ l.name }}</td>
            <td>
            <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#AddScopus"
              >
                <i class="fa fa-edit"></i></button
            ></a>&nbsp;
            <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#DeleteScopus"
              >
                <i class="fa fa-trash"></i></button
            ></a>
          </td>
          </tr>
        </tbody>
      </table>
      <div class="row" align="right">
        <div class="col-md-12 mb-5 mt-3">
          <jw-pagination
            :items="list"
            @changePage="onChangePage"
            :labels="customLabels"
            :pageSize="20"
          ></jw-pagination>
        </div>
      </div>
      <div v-if="list.length == 0" class="mt-5">
<h3 style="text-align:center">ไม่พบข้อมูล</h3>
      </div> -->
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
      KeywordService.deletekeyword(this.pro_id).then((res)=>{
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
          KeywordService.createkeyword(prodata).then((res) => {
            console.log(res.data);
            if (res.data.err == 1062) {
              alert('มีคำนี้ในระบบแล้ว')
            }else{
          DictService.createdict(prodata).then((res) => {
            console.log(res.data );
            RuleBasedService.createdcolumnrule_based(res.data.id).then(() => {
              
            document.getElementById("closedcategory").click();
            this.getcategory();
            alert('บันทึกสำเร็จ')
          })
        })
      }
      })
        } else {
          KeywordService.updatekeyword(this.pro_id,prodata).then(() => {
            document.getElementById("closedcategory").click();
            this.getcategory();
            alert('บันทึกสำเร็จ')
            
          })
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
    updatetoken(data){
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
        KeywordService.updatekeywordall(data.id, tokendata).then(() => {
          // console.log(res.data);
          // if (type == 'update') {
          //   document.getElementById("closedcategory").click();
          //   this.getcategory();
          //   alert('บันทึกสำเร็จ')
          // }
          if (this.list.length == data.id) {
            alert('บันทึกสำเร็จ')
            
          }
        });
      });
    },
    getcategory(){
      // axios.get(LinkService.getpythonlink()+'/tokenkeyword?text=เห็นถึงขนาดที่แท้จริง').then((res) => {
      //   // this.tokenize = res.data
      //   console.log(res.data);
      //   // tokenize = res.data
      // });
      KeywordService.getkeywordsall(1).then(async (res)=>{
        this.list = res.data
        for (let l = 0; l < this.list.length; l++) {
          var sentence = this.list[l].token.split('|')
          // console.log(sentence.length);
          var dictlist =[]
          var dictname=[]
          for (let s = 0; s < sentence.length; s++) {
            // console.log(sentence[s]);
            var sen = sentence[s].replaceAll(' ','')
            // console.log(sen);
             await DictService.getdicts('',sen).then((res)=>{
    //         console.log(sen);
    // console.log(res.data);
    if (res.data.length == 0) {
var prodata = {
          name: sen,
          status:1,
        };
        DictService.createdict(prodata).then((res) => {
            
      dictlist.push(res.data.id)
      dictname.push(sen)
        })
      // console.log(sentence[s].replaceAll(' ',''))
    }else{
      dictlist.push(res.data[0].id)
      dictname.push(res.data[0].name)
      // console.log(s+1, sentence.length);
      if (s+1 == sentence.length) {
      var dictid = {
        dict_id:dictlist,
        dict_name:dictname
        };

      // console.log(dictlist);
      KeywordService.updatedictid(this.list[l].id,dictid).then(()=>{
// console.log(res.data);
      })
        
      }
    }
  })
          }
 
  
}
        // for (let l = 0; l < this.list.length; l++) {
          // this.updatetoken(this.list[l])
          // for (let t = 0; t < this.list[l].token.length; t++) {
          //   console.log(this.list[l].token[t]);
            
          // }
          
        // }
      })
    },
    getid(id) {
      // console.log(id);
      this.pro_id = id;
      if (this.pro_id != 0) {
        this.title = "แก้ไขข้อมูลข้อความ";
        // console.log(this.user_id);
        KeywordService.getkeyword(this.pro_id).then((res) => {
          // console.log(res.data);
          this.data = res.data;
        });
      } else {
        this.title = "เพิ่มข้อมูลข้อความ";
        this.data = [];
      }
    },
  },
  mounted() {
    this.getcategory()
   

//  for (let t = 0; t < this.list.length; t++) {
//   console.log(this.list[t].name);
//   axios.get(LinkService.getpythonlink()+'/tokenkeyword?text=' + this.list[t].name).then((res) => {
//         console.log(res.data);
//         this.list[t].token = res.data

//   });
            // this.list[t].token = this.token(this.list[t].name)
            // console.log(this.list[t].token);
          // }
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
}</style>
