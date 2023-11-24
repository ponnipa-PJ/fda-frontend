<template>
  <div class="container">
    <div class="row">
      <div>
        <!-- <div class="form-group mt-5">
          <label for="exampleFormControlTextarea1">URL</label>
          <textarea
            v-model="data.url"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div> -->
        <div class="form-group mt-5">
          <label for="exampleFormControlTextarea1">Content</label>
          <textarea
            v-model="data.content"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="7"
          ></textarea>
        </div>
        <button @click="search()" type="submit" class="mb-3 btn btn-success">
          ค้นหา</button
        >&nbsp;
        <button @click="clear()" type="submit" class="mb-3 btn btn-danger">
          ล้างข้อมูล
        </button>
      </div>
      <table class="table table-bordered" v-if="statusprocheck">
        <thead>
          <tr>
            <th
              scope="col"
              style="
                text-align: center;
                vertical-align: middle;
                background-color: #ffb454;
              "
            >
              เงื่อนไขการตรวจสอบข้อที่ 1
            </th>
            <th
              scope="col"
              style="
                text-align: center;
                vertical-align: middle;
                background-color: #ffb454;
              "
            >
              ข้อมูลจากฐานข้อมูลอย.
            </th>
            <th
              scope="col"
              style="
                text-align: center;
                vertical-align: middle;
                background-color: #ffb454;
              "
            >
              ข้อมูลจากเว็บไซต์
            </th>
            <th
              scope="col"
              style="
                text-align: center;
                vertical-align: middle;
                background-color: #ffb454;
              "
            >
              ผลการตรวจสอบ
            </th>
            <th
              scope="col"
              style="
                text-align: center;
                vertical-align: middle;
                background-color: #ffb454;
              "
            >
              ข้อสรุป
            </th>
          </tr>
        </thead>
        <!-- {{procheck}} -->
        <tbody>
          <tr v-for="(p,o) in procheck" :key="o">
            <td :style="colorfda">เลขที่อนุญาต</td>
            <td :style="colorfda">{{ p.mapfda }}</td>
            <td :style="colorfda">{{ p.fda }}</td>
            <td :style="colorfda">{{ p.cncnm }}</td>
            <td
              v-if="
                p.cat_status &&
                p.name_status &&
                p.fda_status == 1
              "
              rowspan="3"
              style="
                text-align: center;
                vertical-align: middle;
                background-color: #a3e9a4;
              "
            >
              <span>ผ่าน</span>
            </td>
            <td
              v-else
              rowspan="3"
              style="
                text-align: center;
                vertical-align: middle;
                background-color: #f9bdbb;
              "
            >
              <span>ไม่ผ่าน</span>
            </td>
          </tr>
          <tr v-for="(pp,oo) in procheck" :key="oo+10">
            <td :style="colorcat">ประเภทผลิตภัณฑ์</td>
            <td :style="colorcat">{{ pp.typepro }}</td>
            <td :style="colorcat">
              <span v-if="pp.typepro">{{ pp.type }}</span
              ><span v-else>-</span>
            </td>
            <td :style="colorcat">
              <span v-if="pp.cat_status">ผ่าน</span
              ><span v-else>ไม่ผ่าน</span>
            </td>
          </tr>
          <tr v-for="(ppp,ooo) in procheck" :key="ooo+20">
            <td :style="colorname">ชื่อผลิตภัณฑ์</td>
            <td :style="colorname">
              {{ ppp.productha }}<br />{{ ppp.produceng }}
            </td>
            <td :style="colorname"><span v-html="ppp.name"></span></td>
            <td :style="colorname">
              <span v-if="ppp.name_status">ผ่าน</span
              ><span v-else>ไม่ผ่าน</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align:center" v-if="statusprocheckone && statuslist"><span> เงื่อนไขการตรวจสอบข้อที่ 1 ไม่สามารถตรวจสอบได้ เนื่องจาก {{prochecktext}}</span></div>
      <table class="table table-bordered mt-3 mb-5" v-if="statuslist">
        <tbody>
          <tr>
            <th style="background-color: #ffb454; vertical-align: middle">
              เงื่อนไขการตรวจสอบข้อที่ 2
            </th>
            <th style="background-color: #ffb454; vertical-align: top">
              ข้อความโฆษณา
            </th>
            <th style="background-color: #ffb454; vertical-align: middle">
              ข้อความโฆษณาเกินจริง<br>
              <div style="text-align: right;">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#AddScopusToken"
                      type="submit"
                      class="mb-3 btn btn-success"
                    >
                      <i class="fa fa-plus" aria-hidden="true">
                        เพิ่ม keyword</i
                      >
                    </button>
                  </div>
            </th>
          </tr>
          <tr>
            <td :style="colorkey">รายละเอียดสินค้า</td>
            <td :style="colorkey" style="width: 40%">
              <span v-html="list.sentence_keyword"></span>
            </td>
            <!-- <th :style="colorkey">ข้อความโฆษณา</th> -->
            <!-- {{list}} -->
            
            <td :style="colorkey" v-if="list.keyword != 1">
             
              <tr v-for="(k, i) in list.keyword" :key="i">
                <td>
                  <span v-html="k.sentence_rulebase"></span><br /><br />
                  <span v-html="getsentent(k.rule_based_name)"></span>
                  <!-- <span v-for="(s, idx) in k.rule_based_name" :key="idx">{{
                    s
                  }}</span> -->
                  <br /><br />
                  <!-- <span>{{getstatuscheck(k.statustrue,k.statusfalse)}}</span> -->
                  <span>ตรงกฎ</span>
                  <span v-if="k.count_rulebased"
                    > {{ getpercentage(k) }}%</span
                  ><br /><br />
                  <!-- <div style="text-align: left">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#AddScopusToken"
                      type="submit"
                      class="mb-3 btn btn-success"
                    >
                      <i class="fa fa-plus" aria-hidden="true">
                        เพิ่ม keyword</i
                      >
                    </button>
                  </div> -->
                </td>
                <td>
                  <span>{{getstatuscheck(k.statustrue,k.statusfalse)}}</span
                  >
                  
                  <!-- <span v-if="answer == 1">เกินจริง</span
                  ><span v-if="answer == 9">ไม่เกินจริง</span
                  ><span v-if="answer == 0"></span> -->
                </td>

                <td>
                  <button
                    @click="savetorule_based(k, 1)"
                    type="submit"
                    class="mb-3 btn btn-success"
                  >
                    <i class="fa fa-check"></i></button
                  >&nbsp;
                  <button
                    @click="savetorule_based(k, 9)"
                    type="submit"
                    class="mb-3 btn btn-danger"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </tr>
            </td>
            <td :style="colorkey" v-else>
              <!-- <div style="text-align: right;">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#AddScopusToken"
                      type="submit"
                      class="mb-3 btn btn-success"
                    >
                      <i class="fa fa-plus" aria-hidden="true">
                        เพิ่ม keyword</i
                      >
                    </button>
                  </div> -->
              <tr>
                ไม่พบข้อความโฆษณาเกินจริง
                <br /><br />
                  <!-- <div style="text-align: left">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#AddScopusToken"
                      type="submit"
                      class="mb-3 btn btn-success"
                    >
                      <i class="fa fa-plus" aria-hidden="true">
                        เพิ่ม keyword</i
                      >
                    </button>
                  </div> -->
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table mt-3" v-if="statusproduct">
        <thead>
          <tr>
            <th scope="col">สินค้า</th>
            <th scope="col">ข้อมูล</th>
            <th scope="col">FDA</th>
            <th scope="col">ตัดคำ</th>
            <th scope="col">ข้อมูลจากฐานข้อมูลอย.</th>
            <!-- <th scope="col"></th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in product" :key="i">
            <td :style="l.bg">{{ l.name }}</td>
            <td :style="l.bg">{{ l.detail }}</td>
            <!-- <td :style="l.bg">
              <div class="row">
          <div class="col-md-2" v-for="(im ,i) in imagelists" :key="i">
            <img :src="im" width="100%"/>
          </div>
        </div>
            </td> -->
            <td :style="l.bg" style="width: 300px">
              <div>
                เลขที่อนุญาต : {{ l.fda }}<br />
                <!-- ชื่อผลิตภัณฑ์: <span v-html="matchname"></span> -->
                <!-- ชื่อผลิตภัณฑ์: {{l.productha}} -->
              </div>
            </td>
            <td :style="l.bg">{{ cut(l.token) }}</td>
            <td
              style="background-color: #bdedff"
              v-if="l.status == 1 || l.status == 3"
            >
              <p class="card-text">สถานะ : {{ l.cncnm || "" }}</p>
              <p class="card-text">
                ประเภทผลิตภัณฑ์ :<span> {{ l.typepro }}</span>
              </p>
              <p class="card-text">
                ใบสำคัญ/เลขที่อนุญาต : <span> {{ l.lcnno }}</span>
              </p>
              <p class="card-text">
                ชื่อผลิตภัณฑ์ (TH) : <span> {{ l.productha }}</span>
              </p>
              <p class="card-text">
                ชื่อผลิตภัณฑ์ (EN) : <span> {{ l.produceng }}</span>
              </p>
              <p class="card-text">ชื่อผู้รับอนุญาต : {{ l.licen }}</p>
              <p class="card-text">สถานที่ผลิต : {{ l.Addr }}</p>
              <p class="card-text">Newcode : {{ l.Newcode }}</p>
            </td>
            <td :style="l.bg" v-else>ไม่พบข้อมูล</td>
            <!-- <td :style="l.bg">
            <i class="fa fa-circle" :style="l.icon" aria-hidden="true"></i>
          </td> -->
          </tr>
        </tbody>
      </table>
      <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
      <!-- Modal -->
      <div
        class="modal fade"
        id="AddScopusToken"
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
                      v-model="key.name"
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import ProductsService from '../services/ProductsService.js'
import DictService from "../services/DictService";
import RuleBasedService from "../services/RuleBasedService";
import MapRuleBasedService from "../services/MapRuleBasedService";
import LinkService from "../services/LinkService";
import AdvertiseService from "../services/AdvertiseService";
import KeywordService from "../services/KeywordService";
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import FDATypesService from "../services/FDATypesService";

export default {
  name: "App",
  components: {
    ClipLoader
  },
  data() {
    return {
      statusprocheck:false,
      statuslist:false,
      statusproduct:false,
      statusprocheckone:false,
      color: '#5bc0de',
      size: '50px',
      margin: '2px',
      radius: '2px',
      loading:false,
      list: [],
      url: "",
      file: "",
      status: false,
      urlPath: "",
      imagelists: "",
      tokenize: "",
      matchname: "",
      matchcategory: "",
      type: "",
      matchnamesum: "",
      statusname: 0,
      statuscat: 0,
      statusfda: 0,
      colorname: "background-color:#f9bdbb",
      colorfda: "background-color:#f9bdbb",
      colorcat: "background-color:#f9bdbb",
      id: "",
      keyword: [],
      colorkey: "background-color:#f9bdbb",
      desc: "",
      arrList: [],
      alldata: 0,
      back: 0,
      next: 0,
      data: {},
      product_token: 0,
      title: "เพิ่ม keyword",
      key: {},
      fda: "",
      product: [],
      procheck: [],
      answer:'',
      typeId:0,
      prochecktext:''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getsentent(data){
      data = JSON.parse(data)
      // var text = ''
      var arr =[]
      for (let d = 0; d < data.length; d++) {
        // text += data[d]
        arr.push(data[d])
      }
      // console.log(arr);
      var arrtxt = String(arr)
      // console.log(arrtxt);
      arrtxt = arrtxt.replaceAll(",","<span style='color:red;'> | </span>")
      // console.log(arrtxt);
return arrtxt
    },
    getstatuscheck(t,f){
      // console.log(t,f);
      var text = ''
if (t == f) {
  text = 'เกินจริง'
}else if (t > f) {
  text = 'เกินจริง'
}else if (f > t) {
  text = 'ไม่เกินจริง'
}
return text
    },
    clear() {
      this.data = [];
      this.product = [];
      this.procheck = [];
      this.loading = false;
      this.status = false
    },
    cut(data) {
      // console.log(data);
      var mapname = ''
      if (data != '-' && data != '') {
        data = data.filter((letter) => letter !== " ");
      mapname = data.toString();

      mapname = mapname.replaceAll(",", " | ");
      }else{
        mapname = data
      }
      
      return mapname;
    },
    save() {
      //console.log(this.key);
      if (this.key.name == null || this.key.name == "") {
        alert("กรุณากรอกข้อความ");
      } else {
        var prodata = {
          name: this.key.name,
          status: 1,
        };
        //console.log(prodata);
        KeywordService.createkeyword(prodata).then((res) => {
          //console.log(res.data);
          if (res.data.err == 1062) {
            alert("มีคำนี้ในระบบแล้ว");
          } else {
            DictService.createdict(prodata).then(() => {
              //console.log(res.data );
              // RuleBasedService.createdcolumnrule_based(res.data.id).then(() => {

              document.getElementById("closedcategory").click();
              alert("บันทึกสำเร็จ");
              // })
            });
          }
        });
      }
    },
    getpercentage(data) {
      // var dict = JSON.parse(data.dict_id)
      // var rule_based_id = JSON.parse(data.rule_based_id)
      // var re = (100 * data.count_rulebased)/ (rule_based_id.length)
      return data.count_rulebased;
    },
    savetorule(sen, answer) {
      // console.log(answer);
      var iddata = [];

      for (let d = 0; d < sen.length; d++) {
        // console.log(datasplit[d]);
        DictService.getdicts("", sen[d]).then(async (res) => {
          if (res.data.length > 0) {
            // console.log(res.data[0].id);
            iddata.push(res.data[0].id);
          }
          // console.log(d+1 , sen.length);
          // console.log(iddata);
          if (d + 1 == sen.length) {
            var sql = `SELECT r.* FROM map_rule_based m join rule_based r on m.rule_based_id = r.id WHERE m.status = 1 and dict_id = '[${iddata}]'`;
            // console.log(sql);

            await RuleBasedService.getbydict(sql).then((res) => {
              if (res.data.length == 0) {
                let text = "";
                text += "{";
                for (let i = 0; i < iddata.length; i++) {
                  // console.log(iddata[i]);
                  text += '"dict' + iddata[i] + '"' + ":" + 1 + ",";
                }
                text += '"answer' + '"' + ":" + answer + ",";
                text = text.slice(0, -1);
                text += "}";
                // console.log(text);
                let jsonData = JSON.parse(text);
                // console.log(jsonData);
                RuleBasedService.createrule_based(jsonData).then((res) => {
                  var maprule = {
                    rule_based_id: res.data.id,
                    dict_id: iddata,
                    status: 1,
                  };
                  MapRuleBasedService.createmap_rule_based(maprule).then(() => {
                    // console.log(res.data);
                    // var pro = {
                    //   map_rule_based:res.data.id
                    // }
                    // ProductsService.map_rule_based(id,pro).then(() => {
                    alert("บันทึกสำเร็จ");

                    this.getdata();
                    //               setTimeout(function () {
                    //   location.reload();
                    // }, 500);
                    // });
                  });
                });
              } else {
                // console.log(res.data);
                var updatemaprule = {
                  answer: answer,
                };
                RuleBasedService.updaterule_based(
                  res.data[0].id,
                  updatemaprule
                ).then(() => {
                  alert("บันทึกสำเร็จ");

                  this.getdata();
                });
              }
            });
          }
        });
      }
    },
    async savetorule_based(data, answer) {
      this.answer = answer
      // console.log(sen.length);
      // console.log('answer',answer);
      // console.log(data);
      var datas = {
        name :data.rule_based_id,
        typeId:this.typeId,
        advertiseId:data.id
      }
      
      // if (!data.mapId) {
        await MapRuleBasedService.checkintb(data.dict_id).then(async (check) => {
          // console.log(check.data);
          var statusfalse = 0
          var statustrue = 0
          var weight = 0
          var advertise_id = []
          if (check.data) {
            advertise_id = JSON.parse(check.data.map_advertise)
          statusfalse = check.data.statusfalse
          statustrue = check.data.statustrue
          datas.rulebasedId = check.data.id
          }
          if (answer == 1) {
            statustrue = statustrue+ parseInt(1)
          }
          if (answer == 9) {
            statusfalse = statusfalse + parseInt(1)
          }
          // console.log(advertise_id);
          advertise_id.push(data.id)
          // console.log(advertise_id);
          weight = statusfalse+statustrue
          var maprule = {
        keyword_id: 1,
        advertise_id: data.id,
        status: 9,
        answer: answer,
        user: this.currentUser.id,
        map_dict: JSON.parse(data.dict_id),
        statusfalse:statusfalse,
        statustrue:statustrue,
        weight:weight,
        map_advertise: advertise_id,
      };
          if (check.data) {
            await MapRuleBasedService.updateanswer(check.data.id, maprule).then(
          async () => {
            // console.log(res.data);
           
     await KeywordService.updateweight(1,datas).then(async ()=>{
            // console.log(res);
            await this.getdetail();
            alert("บันทึกสำเร็จ");
          })
          }
        );
          } else {
            MapRuleBasedService.createmap_rule_based(maprule).then(
              async (res) => {
                // console.log(res.data);
                var map_id = res.data.id;
                datas.rulebasedId = map_id
                var sendata = JSON.parse(data.dict_id);
                // console.log(sendata);
                // console.log(dict_name);
                for (let d = 0; d < sendata.length; d++) {
                  // console.log(sendata[d]);
                  if (sendata[d]) {
                    await DictService.getdict(sendata[d]).then(async (sen) => {
                    // console.log(sen.data);
                    var rule = {
                      map_rule_based_id: map_id,
                      dict_id: sendata[d],
                      dict_name: sen.data.name,
                      no: d + 1,
                    };
                    // console.log(rule);
                    await RuleBasedService.createrule_based(rule).then(async () => {
                      if (d + 1 == sendata.length) {
                        await KeywordService.updateweight(1,datas).then(async (res)=>{
            console.log(res);
            await this.getdetail();
            alert("บันทึกสำเร็จ");
          })
                      }
                    });
                  });
                  }
                }
              }
            );
          }
          
          
        });
     
        // } else {
      //   MapRuleBasedService.deletemap_rule_based(data.mapId, maprule).then(
      //     async () => {
      //       // console.log(res.data);
      //       this.getdetail();
      //       alert("บันทึกสำเร็จ");
      //     }
      //   );
      // }
    },
    checkkeyword(name) {
      // console.log(name);
      //   axios.get('http://localhost:8081/api/keyword_dicts?name=1').then((res) => {
      //     console.log(res.data);
      // for (let r = 0; r < res.data.length; r++) {
      // name = name.replaceAll(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
      //       name = name.replaceAll(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');
      //       name = name.replaceAll(/(\r\n|\n|\r)/gm, "");
      //       name = name.replaceAll("_", "");
      //       name = name.replaceAll("!", "");
      //       name = name.replaceAll("*", "");
      // name = name.replaceAll(`_/l\_`, "");// eslint-disable-line
      // console.log('http://127.0.0.1:5000/checkkeyword?text=' + name);
      var desc = this.finddescription(name);
      // console.log('http://127.0.0.1:5000/worktokendesc?text='+desc);
      axios
        .get(LinkService.getpythonlink() + "/worktokendesc?text=" + desc)
        .then((res) => {
          // console.log(res.data);
          this.desc = res.data;
        });
      // name = 'ข้อมูลจำเพาะของสินค้า หมวดหมู่ Shopee กลุ่มผลิตภัณฑ์เพื่อสุขภาพ อาหารเสริมเพื่อความงาม ผิว ยี่ห้อ Bluebird(บลูเบิร์ด) Storage Condition Normal ประเภทสารอาหาร สารต้านอนุมูลอิสระ, วิตามินซี ประเทศต้นกำเนิดสินค้า ไทย หน้าที่ของอาหารเสริมสำหรับความงาม ดูแลสิว, ป้องกันริ้วรอย ประเภทการห่อ ห่อรวมกัน เพศ ทั้งสองเพศ อายุการเก็บรักษา 12 เดือน ประเภทของผลิตภัณฑ์ยา แคปซูล หมายเลขใบอนุญาต/อย. 30-1-26764-5-0051 จำนวนสินค้า 17901 ส่งจาก จังหวัดนครราชสีมา รายละเอียดสินค้า วิตามินซี พลัส ตรา บลูเบิร์ด ตรา บลูเบิร์ด ขนาด 1000 มิลลิกรัม 60 แคปซูล เรทขายส่ง ช่วงราคาที่ 1 สั่งซื้อตั้งแต่ 5 กระปุกขึ้นไป ถึง 20 กระปุก ราคากระปุกละ 93 บาท ช่วงราคาที่ 2 สั่งซื้อตั้งแต่ 21 กระปุกขึ้นไป ถึง 50 กระปุก ราคากระปุกละ 90 บาท ช่วงราคาที่ 3 สั่งซื้อตั้งแต่ 51 กระปุกขึ้นไป ถึง 100 กระปุก ราคากระปุกละ 87 บาท ช่วงราคาที่ 4 สั่งซื้อตั้งแต่ 100 กระปุกขึ้นไป ..................... ราคากระปุกละ 85 บาท Vitamin C Plus Dietary Supplement Product Bluebird Brand ผลิตภัณฑ์เสริมอาหารวิตามินซี พลัส ตรา บลูเบิร์ด ส่วนประกอบทั้งหมดใน 1 แคปซูล ส่วนประกอบที่สำคัญ (Active Ingredient) VITAMIN C (100%) - 60 มิลลิกรัม CITRUS BIOFLAVONOID POWDER - 630 มิลลิกรัม BARBADOSCHERRY POWDER/ACEROLA CHERRY POWDER (ผงบาร์เบโดสเชอร์รี/ผงอะเซโรลาเชอร์รี) (MALPIGHIA GLABRA L.) ผล - 60 มิลลิกรัม ROSEHIP POWDER (ผงโรสฮิปส์) (ROSA CANINA L.) ผล - 60 มิลลิกรัม Rutin - 30 มิลลิกรัม INDIAN GOOSEBERRY POWDER (ผงมะขามป้อม) (PHYLLANTHUS EMBLICA L. ) ผล - 60 มิลลิกรัม ส่วนประกอบที่ไม่สำคัญ (Inactive Ingredient) EDIBLE GELATIN 428 - 98.5 มิลลิกรัม TITANIUM DIOXIDE 171 -1.95 มิลลิกรัม วิธีรับประทาน ครั้งละ 1-2 แคปซูล หลังอาหารเช้า เลขที่ อ.ย. 30-1-26764-5-0051 คำเตือน ควรเก็บให้พ้นแสงแดงและความชื้น เด็ก สตรีมีครรภ์ และสตรีให้นมบุตรไม่ควรรับประทาน ควรกินอาหารหลากหลายให้ครบ 5 หมู่ ในสัดส่วนที่เหมาะสมเป็นประจำ ไม่มีผลในการป้องกันหรือรักษาโรค สรรพคุณ ประโยชน์ของการกินวิตามินซี ️ทำให้หน้าไม่โทรม หน้าตาสดใส ️ช่วยฟื้นฟูผิวหน้า สิว ฝ้า กระ ริ้วรอย ดูจางลง ️ผิวพรรณนุ่มเรียบเนียบ ชุ่มชื่น ️หน้าตาดูเด็กและเด้งขึ้น ️ผิวหน้าขาวอมชมพู สินค้าตัดรอบทุกวันเวลา ตัดรอบเวลา 12.00 น ของทุกวัน แจ้งโอนเกินเวลา ส่งรอบวันถัดไปนะจ๊ะ ส่งพัสดุทุกวัน เว้นวันอาทิตย์ และวันหยุดนักขัตฤกษ์ ขอบพระคุณลูกค้าทุกท่าน ที่ไว้วางใจผลิตภัณฑ์ของเราเสมอมา_/l\_'
      // console.log('http://127.0.0.1:5000/checkkeyword?text=' + desc);
      var con = {
        content: desc,
      };
      axios
        .post(LinkService.getpythonlink() + "/checkkeyword?text=", con)
        .then((res) => {
          // console.log(res.data);
          if (res.data.length > 0) {
            // this.keyword.push(res.data)
            this.keyword = res.data;
          }
        });
      //     }

      // });
      //       var listkeywords = []
      //       var namesplit = name.split(" ")
      //       // console.log(namesplit);
      //       axios.get('http://localhost:8081/api/keyword_dicts?name=1').then((res) => {
      //         console.log(res.data);
      //         var keylist = []
      //         for (let r = 0; r < res.data.length; r++) {
      //           res.data[r].name = res.data[r].name.replaceAll(".","")
      //           var kk = res.data[r].name.split(" ")
      //           for (let k = 0; k < kk.length; k++) {
      //             keylist.push(kk[k])
      //           }
      //         }
      //         for (let key = 0; key < keylist.length; key++) {
      //           for (let n = 0; n < namesplit.length; n++) {
      //             if (namesplit[n] == keylist[key] && keylist[key] != '' && isNaN(keylist[key])) {
      //               listkeywords.push(keylist[key])
      //             }

      //           }
      //         }
      //         // console.log(keylist);
      //         // console.log(listkeywords);

      //       console.log(listkeywords.length);
      //         if (listkeywords.length == 0) {

      //           this.colorkey = "background-color:#a3e9a4"
      //         }
      //         var result = [];
      //         listkeywords.forEach(function(item) {
      //      if(result.indexOf(item) < 0) {
      //          result.push(item);
      //      }
      // });
      // console.log(result);
      // listkeywords = result
      //         for (let l = 0; l < listkeywords.length; l++) {
      //           // console.log('http://127.0.0.1:5000/checkkeyword?name=' + name+'&&name_real=');
      //           axios.get('http://127.0.0.1:5000/checkkeyword?name=' + name+'&&name_real=' + listkeywords[l]).then((res) => {
      //             // console.log(res.data);
      //         this.keyword.push(res.data)
      //       });

      //         }
      //       });
    },
    find(){
var type = this.findtypeproduct(this.data.content)
console.log(type);
var split = type.split("\n")
console.log(split[3]);
      var content = "";
        content = this.data.content.replaceAll(
          /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
          ""
        );
        content = content.replaceAll(
          /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
          " "
        );

        content = content.replaceAll(/\ud83d[\ude00-\ude4f]/g, " ");
        content = content.replaceAll(/(\r\n|\n|\r)/gm, " ");
        content = content.replaceAll("_", "");
        content = content.replaceAll("!", "");
        content = content.replaceAll("*", "");
        content = content.replaceAll("&", "");
        content = content.replaceAll("#", "");
        content = content.replaceAll("•", "");
        content = content.replaceAll("+", "");
        content = content.replaceAll(`_/l\_`, ""); // eslint-disable-line
        content = content.replaceAll(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          " "
        );
console.log(this.finddescription(content));
    },
    async checkkey(){
      await this.loaddict();
      var content = "";
        content = this.data.content.replaceAll(
          /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
          ""
        );
        content = content.replaceAll(
          /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
          " "
        );

        content = content.replaceAll(/\ud83d[\ude00-\ude4f]/g, " ");
        content = content.replaceAll(/(\r\n|\n|\r)/gm, " ");
        content = content.replaceAll("_", "");
        content = content.replaceAll("!", "");
        content = content.replaceAll("*", "");
        content = content.replaceAll("&", "");
        content = content.replaceAll("#", "");
        content = content.replaceAll("•", "");
        content = content.replaceAll("+", "");
        content = content.replaceAll(`_/l\_`, ""); // eslint-disable-line
        content = content.replaceAll(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          " "
        );
        var desc = this.finddescription(content)
console.log(desc);
var con = {
                      content: desc,
                    };
       axios
                      .post(LinkService.getpythonlink() + "/checkkeyword", con)
                      .then(async (res) => {
                        console.log(res.data);
                      });
    },
    findtypeproduct(data) {
      // console.log(data);
      var text = ["หมวดหมู่"];
      var findfda = data;
      for (let t = 0; t < text.length; t++) {
        if (findfda.indexOf(text[t]) != -1) {
          findfda = findfda.substring(findfda.indexOf(text[t]));
        }
      }
      // if (findfda == 'อาหาร') {
      //   findfda = findfda+ findfda+'เสริม'
      // }
      // console.log(findfda);
      return findfda;
    },
    finddescription(data) {
      // console.log(data);
      var text = ["รายละเอียดสินค้า"];
      var findfda = data;
      for (let t = 0; t < text.length; t++) {
        if (findfda.indexOf(text[t]) != -1) {
          findfda = findfda.substring(findfda.indexOf(text[t]));
        }
      }
      // if (findfda == 'อาหาร') {
      //   findfda = findfda+ findfda+'เสริม'
      // }
      // console.log(findfda);
      return findfda;
    },
    loaddict() {
      axios.get(LinkService.getpythonlink() + "/loaddict").then(async () => {});
    },
    getdetail() {
      // var url = this.data.url.split("-i.");
      // var url = this.data.url.split("-i.");
      // this.data.url = url[0];
      // console.log(this.product_token);
      var selectpro = {
        // url: this.data.url,
        id: this.product_token,
      };
      MapRuleBasedService.getproduct_token(selectpro).then(async (res) => {
        // console.log(res.data);
        // var best = this.getMax(res.data.keyword,'count_rulebased')
        //console.log(best);
        this.list = res.data;
        this.statuslist = true
        this.status = true;
        this.loading = false
        // var data = {
        //   advertise_id: res.data.keyword[0].product_token_id,
        // };
        // MapRuleBasedService.updateweight(
        //   res.data.keyword[0].map_rule_based_id,
        //   data
        // ).then(() => {});
        // this.list.keyword = [best]
        // this.status = true
      });
    },
    async search() {
      // var url = this.data.url.replaceAll(".",'');
      // url = url.split("-i");
      // this.data.url = url[0];
      // console.log(this.data.url);
      this.product = [];
      this.procheck = [];
      this.loading = false;
      this.status = false
      this.statusprocheck = false
      this.statusproduct = false
      this.statuslist = false
      this.product_token = 0;
      var con = {};
      await this.loaddict();
      // if (this.data.url == null || this.data.url == "") {
      //   alert("กรุณากรอก URL");
      // } else 
      if (this.data.content == null || this.data.content == "") {
        alert("กรุณากรอกข้อความโฆษณา");
      } else {

        this.loading = true
        var findtype = this.findtypeproduct(this.data.content)
// console.log(type);
var split = findtype.split("\n")
var type = split[3]
// console.log(type);
await FDATypesService.getfdatypes(type).then(async (res)=>{
  // console.log(res.data);
  if (res.data.length > 0) {
    this.typeId = res.data[0].id
  }else{
    var name = {
      name : type
    }
    await FDATypesService.createfdatype(name).then((res)=>{
      this.typeId = res.data.id
    });
  }
})
// console.log(this.typeId);
        var content = "";
        content = this.data.content.replaceAll(
          /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
          ""
        );
        content = content.replaceAll(
          /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
          " "
        );

        content = content.replaceAll(/\ud83d[\ude00-\ude4f]/g, " ");
        content = content.replaceAll(/(\r\n|\n|\r)/gm, " ");
        content = content.replaceAll("_", "");
        content = content.replaceAll("!", "");
        content = content.replaceAll("*", "");
        content = content.replaceAll("&", "");
        content = content.replaceAll("#", "");
        content = content.replaceAll("•", "");
        content = content.replaceAll("+", "");
        content = content.replaceAll(`_/l\_`, ""); // eslint-disable-line
        content = content.replaceAll(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          " "
        );

        // this.fda = await this.findfda(content);

var desc = this.finddescription(content)
        this.fda = await this.getfda(content)[0]
        console.log(this.fda);
          con = {
            content: desc,
          };
          await axios
            .post(LinkService.getpythonlink() + "/wordtokendesc", con)
            .then(async (res) => {
              // console.log(res.data);
              // var sentence = res.data.sentent.replaceAll("<spanstyle", "<span style");
              var des = {
                url: this.data.url,
                sentence: desc,
                sentence_keyword: res.data.sentent,
                keyword_id: res.data.keywordId,
                status: 1,
              };
              // console.log(des);
              if (this.product_token == 0) {
                await MapRuleBasedService.createproduct_token(des).then(
                  async (producttoken) => {
                    // console.log(producttoken);
                    this.product_token = producttoken.data.id;
                    this.checkfda(content, this.product_token);
                    // console.log(producttoken);
                    this.product_token = producttoken.data.id;
                    con = {
                      content: desc,
                    };
                    //console.log(con);
                    await axios
                      .post(LinkService.getpythonlink() + "/checkkeyword", con)
                      .then(async (res) => {
                        // console.log(res.data);
                        if (res.data.length > 0) {
                          for (let r = 0; r < res.data.length; r++) {
                            var sentencetoken = res.data[r].sentent.replaceAll(
                              '"',
                              ""
                            ); // eslint-disable-line
                            sentencetoken = sentencetoken.replaceAll(
                              "<spanstyle",
                              "<span style"
                            );

                            // sentencetoken = sentencetoken.replaceAll('"color:red\"','"color:red"')
                            var advertise = {
                              product_token_id: this.product_token,
                              keyword_dict_id: res.data[r].keyword_dict_id,
                              dict_id: res.data[r].dict_id,
                              dict_name: res.data[r].dict_name,
                              sentent: sentencetoken,
                              sen: res.data[r].sen,
                            };
                            // console.log(this.product_token);
                            await AdvertiseService.createadvertise(advertise).then(
                              async () => {
                                if (r + 1 == res.data.length) {
                                  var getprotoken = {
                                    url: this.product_token,
                                  };
                                  await MapRuleBasedService.getproductkeyword(
                                    getprotoken
                                  ).then(async (pro) => {
                                    // console.log(pro.data);
                                   await this.tokendata(pro.data);
                                  });
                                }
                              }
                            );
                          }
                        } else {
                          await this.getdetail();
                        }
                      });
                  }
                );
              } else {
                await AdvertiseService.deleteadvertise(this.product_token).then(
                  async () => {
                    await MapRuleBasedService.updatproduct_token(
                      this.product_token,
                      des
                    ).then(async () => {
                      // await AdvertiseService.deleteadvertise(this.product_token).then(async ()=>{
                      // console.log(del);
                      this.checkfda(content, this.product_token);
                      con = {
                        content: desc,
                      };
                      //console.log(con);
                      axios
                        .post(
                          LinkService.getpythonlink() + "/checkkeyword",
                          con
                        )
                        .then(async (res) => {
                          //console.log(res.data);
                          if (res.data.length > 0) {
                            for (let r = 0; r < res.data.length; r++) {
                              var sentencetoken = res.data[
                                r
                              ].sentent.replaceAll('"', ""); // eslint-disable-line
                              sentencetoken = sentencetoken.replaceAll(
                                "<spanstyle",
                                "<span style"
                              );

                              // sentencetoken = sentencetoken.replaceAll('"color:red\"','"color:red"')
                              var advertise = {
                                product_token_id: this.product_token,
                                keyword_dict_id: res.data[r].keyword_dict_id,
                                dict_id: res.data[r].dict_id,
                                dict_name: res.data[r].dict_name,
                                sentent: sentencetoken,
                                sen: res.data[r].sen,
                                status: 1,
                              };
                              // console.log(this.product_token);
                              AdvertiseService.createadvertise(advertise).then(
                                () => {
                                  if (r + 1 == res.data.length) {
                                    var getprotoken = {
                                      url: this.product_token,
                                    };
                                    MapRuleBasedService.getproductkeyword(
                                      getprotoken
                                    ).then((pro) => {
                                      // console.log(pro.data);
                                      this.tokendata(pro.data);
                                    });
                                  }
                                }
                              );
                            }
                          }
                        });
                    });
                  }
                );
              }
            });
        // });
      }
    },
    getMax(arr, prop) {
      var max;
      for (var i = 0; i < arr.length; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
          max = arr[i];
      }
      return max;
    },
    getMaxlength(arr, prop) {
      var max;
      for (var i = 0; i < arr.length; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
          max = arr[i];
      }
      return max;
    },
    getAllMaxArray(arr, value) {
      var array = [];
      arr.map(function (num, idx) {
        if (num.allcount == value) {
          array.push(arr[idx]);
        }
      });
      return array;
    },
    async tokendata(list) {
      //console.log(list);
      if (list.keyword.length > 0) {
        for (let l = 0; l < list.keyword.length; l++) {
          //console.log(list.keyword[l].keyword_dict_id);
          if (list.keyword[l].keyword_dict_id) {
            var map = {
              id: list.keyword[l].id,
              url: list.keyword[l].keyword_dict_id,
              keyword_id: list.keyword[l].dict_id,
            };
            // console.log(map);
            await MapRuleBasedService.getmapproduct(map).then(async (res) => {
              // console.log(res.data);
              var maxvalue = this.getMax(res.data, "allcount");
              // console.log(maxvalue.allcount);
              var i = this.getAllMaxArray(res.data, maxvalue.allcount);
              // console.log(i);
              var bestdata = this.getMax(i, "length");
              // console.log(bestdata);
              // getAllIndexes
              // console.log(bestdata);
              var best = {
                id: list.keyword[l].id,
                sentence: bestdata,
              };
              // console.log(best);
              var rule_based_name = bestdata.name.toString();
              rule_based_name = rule_based_name.replaceAll(",", "");
              // console.log(rule_based_name);
              await axios
                .get(
                  LinkService.getpythonlink() +
                    "/loaddict?word=" +
                    rule_based_name
                )
                .then(async () => {
                  await MapRuleBasedService.getbestrulebased(best).then(
                    async (res) => {
                      // console.log(res.data);

                      var rulebased = {
                        count_rulebased: res.data.count,
                        sentence_rulebase: res.data.sentence,
                        rule_based_id: res.data.rule_based_id,
                        rule_based_name: res.data.rule_based_name,
                        map_rule_based_id: res.data.map_id,
                      };
                      // console.log(rulebased);
                      // console.log(list.keyword[l].id);
                      await MapRuleBasedService.updaterulebased(
                        list.keyword[l].id,
                        rulebased
                      ).then(async () => {
                        if (l + 1 == list.keyword.length) {
                          await this.getdetail();
                        }
                      });
                    }
                  );
                });
              // list.keyword[l].rulebase = res.data;
              // if (l + 1 == list.keyword.length) {
              //   this.compare(list);
              // }
            });
          }

          // }
        }
      } else {
        await this.getdetail();
      }
    },
    compare(list) {
      for (let k = 0; k < list.keyword.length; k++) {
        // console.log(list.keyword[k]);
        var dict_id = JSON.parse(list.keyword[k].dict_id);
        // var rulebased = JSON.parse(list.keyword[k].rulebase)
        // console.log(list.keyword[k].rulebased);
        if (list.keyword[k].rulebase) {
          let uniqueCharsrule = list.keyword[k].rulebase.filter((c, index) => {
            return list.keyword[k].rulebase.indexOf(c) === index;
          });
          var filteredArray = dict_id.filter(function (n) {
            return uniqueCharsrule.indexOf(n) !== -1;
          });
          // console.log(filteredArray);
          // console.log('filteredArray',filteredArray);
          // console.log('dict_id',dict_id.length);
          // console.log(sumdictId.length);
          var percentage =
            (100 * parseInt(filteredArray.length)) / parseInt(dict_id.length);
          // console.log(percentage);
          list.keyword[k].percentage = percentage;
        } else {
          list.keyword[k].percentage = 0;
        }
        if (k + 1 == list.keyword.length) {
          this.list = list;
          // this.status = true;
        }
      }
    },
    getAllIndexes(arr, val) {
      var indexes = [],
        i = -1;
      while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
      }
      return indexes;
    },
    findfda(data) {
      var text = ["หมายเลขใบอนุญาต/อย.","อย."];
      // var end = ['']
      var findfda = data;
      for (let t = 0; t < text.length; t++) {
        findfda = findfda.substring(findfda.indexOf(text[t]), data.length);
        var endindex = this.getAllIndexes(findfda, " ");
        findfda = findfda.substring(findfda.indexOf(text[t]), endindex[1]);
      }
      // console.log(findfda);

      for (let v = 0; v < text.length; v++) {
      findfda = findfda.replaceAll(text[v], "");
      }
      findfda = findfda.replaceAll(/[^\d.-]/g, '');
      findfda = findfda.replaceAll("-", "");
      findfda = findfda.replaceAll("–", "");
      findfda = findfda.replaceAll(" ", "");
      // console.log(findfda);
      // var regex = /\d+/g;
      // var matches = findfda.match(regex);  // creates array from matches
      // console.log(matches[0]);
      return findfda;
    },
    async checkfda(content, id) {
      // console.log(this.fda);
      if (this.fda) {
        var fda = this.fda;
        var product_status = 0;
        const url = "https://tawaiforhealth.org/api/oryor/check-product";
        const data = { number_src: fda };
        // console.log(data);
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(data),
        };

        await fetch(url, options)
          .then((response) => response.json())
          .then(async (data) => {
            // console.log(data);
            if (data.message || data.length > 1) {
              this.product.push({
                name: "-",
                detail: content,
                fda: this.fda,
                cncnm: "-",
                typepro: "-",
                lcnno: "-",
                productha: "-",
                produceng: "-",
                licen: "-",
                Addr: "-",
                Newcode: "-",
                status: "-",
                token: "-",
              });
              this.procheck.push({
                fda: this.fda,
                mapfda: "-",
                cncnm: "-",
                productha: "-",
                produceng: "-",
                name: "-",
                product_status: 0,
                cat_status: 0,
                fda_status: 0,
                name_status: 0,
                typepro: "-",
                type: "-",
              });
              this.statusprocheck = true
              // this.status = true
            } else {
              // console.log(data);
              // console.log(data.cncnm.includes("คงอยู่"))
              if (data.cncnm.includes("ยกเลิก") || data.cncnm.includes("เพิกถอน")) {
                product_status = 3;
              } else {
                product_status = 1;
                this.colorfda = "background-color:#a3e9a4";
              }
              // console.log(this.colorfda);
              var con = {
                fda: fda,
                productha: data.productha,
                produceng: data.produceng,
                typepro: data.typepro,
                content: content,
              };
              await axios
                .post(LinkService.getpythonlink() + "/checkfda", con)
                .then(async (res) => {
                  // console.log(res.data);
                  var pro = {
                    name: res.data.name,
                    fda: fda,
                    product_status: product_status,
                    cat_status: res.data.mapcatstatus,
                    fda_status: product_status,
                    name_status: res.data.mapnamestatus,
                  };
                  // console.log(pro);
                  await MapRuleBasedService.updatemap(id, pro).then(() => {
                    // console.log(res.data);
                    this.product.push({
                      name: data.productha + " " + data.produceng,
                      detail: content,
                      fda: fda,
                      cncnm: data.cncnm,
                      typepro: data.typepro,
                      lcnno: data.lcnno,
                      productha: data.productha,
                      produceng: data.produceng,
                      licen: data.licen,
                      Addr: data.Addr,
                      Newcode: data.Newcode,
                      status: product_status,
                      token: res.data.token,
                    });
                    this.procheck.push({
                      fda: fda,
                      mapfda: data.lcnno,
                      cncnm: data.cncnm,
                      productha: data.productha,
                      produceng: data.produceng,
                      name: res.data.name,
                      product_status: product_status,
                      cat_status: res.data.mapcatstatus,
                      fda_status: product_status,
                      name_status: res.data.mapnamestatus,
                      typepro: data.typepro,
                      type: res.data.category,
                    });
                    this.statusprocheck = true
                    this.colorcat = res.data.colorcat;
                    this.colorname = res.data.colorname;
                    // console.log(this.product);
                    // console.log(this.procheck);
                    // console.log(this.fda);
                  });
                });

              // this.status = true
            }
          }).catch(err=>{
            console.log(err);
            this.statusprocheckone = true
            this.prochecktext = 'Api tawaiforhealth ไม่สามารถทำงานได้'
          });
      } else {
        this.product.push({
          name: "-",
          detail: content,
          fda: this.fda,
          cncnm: "-",
          typepro: "-",
          lcnno: "-",
          productha: "-",
          produceng: "-",
          licen: "-",
          Addr: "-",
          Newcode: "-",
          status: "-",
          token: "",
        });
        this.statusproduct = true
        this.procheck.push({
          fda: this.fda,
          mapfda: "-",
          cncnm: "-",
          productha: "-",
          produceng: "-",
          name: "-",
          product_status: 0,
          cat_status: 0,
          fda_status: 0,
          name_status: 0,
          typepro: "-",
          type: "-",
        });

        // this.status = true
      }
    },
    getfda(content){
        var tt = content.split(' ')

    // console.log(tt);
    var arr = []
    for (let l = 0; l < tt.length; l++) {
      var findfda = tt[l].replaceAll('-', '');
      findfda = findfda.replaceAll("–", "");
      findfda = findfda.replaceAll(".", "");
    findfda = findfda.replaceAll(/[^\d.-]/g, '');
    // console.log(findfda);
    if (findfda) {
      if (findfda.length == 13) {
      arr.push(findfda)
      }
    }
      
    }
    console.log(arr);
    return arr;
    }
  },
  mounted() {
    // var f = this.findfda('หมายเลขใบอนุญาต/อย.เลขจดแจ้ง 13-1-1-7562-2-0006')
    // var text = ["หมายเลขใบอนุญาต/อย.","อย."];
    // var sen = 'อย.14-1-02662-2-0021 อย. 13-1-1-7562-2-0006'
    // var l = sen.split(' ')
    // console.log(l);
    // var f = this.findfda(sen)
    // var text = ["หมายเลขใบอนุญาต/อย.","อย."];
    //   // var end = ['']
    //   var findfda = sen;
    //   for (let t = 0; t < text.length; t++) {
    //     console.log(findfda.indexOf(text[t]));
        
    //     console.log(this.getAllIndexes(l,text[t]));
    //   }
    // console.log(f);
//     var best = {
//     "id": 67,
//     "sentence": {
//         "length": 2,
//         "allcount": 100,
//         "rule": [
//             8899,
//             57
//         ],
//         "name": [
//             "ควบคุม",
//             "น้ำหนัก"
//         ],
//         "map_id": 75
//     }
// }
//                   MapRuleBasedService.getbestrulebased(best).then(
//                      (res) => {
//                       console.log(res.data);
//                     });
    // var text = 'หมายเลขใบอนุญาต/อย. 13-1-13465-5-0052 จำนวนสินค้า 415 ส่งจาก'
    // console.log(this.findfda(text));
    // this.data.url =
    //   "https://shopee.co.th/%E2%99%A6%EF%B8%8F%E0%B9%82%E0%B8%89%E0%B8%A1%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88-%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%97%E0%B9%89%E2%99%A6%EF%B8%8F-%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%94%E0%B8%B5%E0%B8%A1%E0%B8%B2%E0%B8%81-%E0%B8%81%E0%B8%B2%E0%B9%81%E0%B8%9F-%E0%B8%A5%E0%B8%B4%E0%B9%82%E0%B8%8B%E0%B9%88-%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%AA-%E2%80%8B-coffee-lishou-%E0%B8%81%E0%B8%B2%E0%B9%81%E0%B8%9F%E0%B8%84%E0%B8%A7%E0%B8%9A%E0%B8%84%E0%B8%B8%E0%B8%A1%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%81-%E0%B8%81%E0%B8%B2%E0%B9%81%E0%B8%9F%E0%B8%84%E0%B8%B8%E0%B8%A1%E0%B8%AB%E0%B8%B4%E0%B8%A7-%E0%B8%81%E0%B8%B2%E0%B9%81%E0%B8%9F%E0%B8%A5%E0%B8%94%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%81-%E0%B8%81%E0%B8%B2%E0%B9%81%E0%B8%9F%E0%B8%A5%E0%B8%94%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AD%E0%B9%89%E0%B8%A7%E0%B8%99";
    // this.data.content =
    //   "️ถ้าเป็นลูกค้าพิมแล้ว ดูแลจนน้ำหนักลดเลยค่ะ สั่งซื้อสินค้าแล้ว ทักแชทมาคุยกันได้เลยค่ะ";
    // // var url = this.data.url.split('-i.')
    // var content = this.data.content.replaceAll(
    //   /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
    //   ""
    // );
    // content = content.replaceAll(
    //   /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
    //   ""
    // );
    // content = content.replaceAll(/(\r\n|\n|\r)/gm, "");
    // content = content.replaceAll("_", "");
    // content = content.replaceAll("!", "");
    // content = content.replaceAll("*", "");
    // content = content.replaceAll("&", "");
    // content = content.replaceAll("#", "");
    // content = content.replaceAll(`_/l\_`, ""); // eslint-disable-line
    // // console.log(LinkService.getpythonlink()+'/wordtokendesc?text=' + content);
    // // axios.get(LinkService.getpythonlink()+'/wordtokendesc?text='+content).then(async (res) => {
    // //   console.log(res.data);
    // // })
    // console.log(LinkService.getpythonlink() + "/checkkeyword?text=" + content);
    // var con = {
    //   content: content,
    // };
    // axios
    //   .post(LinkService.getpythonlink() + "/checkkeyword?text=" + content, con)
    //   .then(async (res) => {
    //     console.log(res.data);
    //     //       for (let r = 0; r < res.data.length; r++) {
    //     //         var advertise = {
    //     //           product_token_id:1,
    //     //           keyword_dict_id:res.data[r].keyword_dict_id,
    //     //           dict_id:res.data[r].dict_id,
    //     //           dict_name:res.data[r].dict_name,
    //     //           sen:res.data[r].sen,
    //     //           sentent:res.data[r].sentent,
    //     //         }
    //     //         AdvertiseService.createadvertise(advertise).then((res)=>{
    //     //           console.log(res.data);
    //     //         })
    //     //       }
    //   });
    // //  console.log(url);
    // //     var selectpro = {
    // //       url:url[0]
    // //      }
    // //      MapRuleBasedService.getproduct_token(selectpro).then((res)=>{
    // //       console.log(res.data);
    // // var list = res.data
    // // this.tokendata(list)
    // // for (let l = 0; l < list.keyword.length; l++) {
    // //   // console.log(this.list.keyword[l].map);
    // //   // for (let m = 0; m < this.list.keyword[l].length; m++) {
    // //     if (list.keyword[l].map) {
    // //       var map = {
    // //     url:JSON.stringify(list.keyword[l].map)
    // //      }
    // //     //  console.log(map);
    // //      MapRuleBasedService.getmapproduct(map).then((res)=>{
    // //       list.keyword[l].rulebase = res.data
    // //       if (l+1 == list.keyword.length) {
    // //         this.compare(list)
    // //       }
    // //      });
    // //     }
    // //   }
    // // }
    // // console.log(this.list);
    // this.status = true;
    // //  })
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
