<template>
  <div class="container">

    <table class="table table-bordered mt-3" v-for="l in list" :key="l.id">
      <thead>
        <tr>
          <th scope="col" style="text-align:center;background-color:#ffb454" colspan="2">{{ l.file }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th style="background-color:#ffb454">รายละเอียดสินค้า</th>
          <th style="background-color:#ffb454">
            <div class="row">
              <div class="col-md-6">
                ข้อความโฆษณา
              </div>
              <div class="col-md-6">
                
           <div style="text-align: right;"> <button @click="getid(0)"
             style="text-align: right;"
          data-bs-toggle="modal" 
          data-bs-target="#AddScopus"
           type="submit" class="mb-3 btn btn-success">
      <i class="fa fa-plus" aria-hidden="true"></i>
    เพิ่ม keyword</button></div>
              </div>
            </div>  </th>
        </tr>
        <tr>
          <td :style="colorkey" style="width:40%"><span v-html="l.sentent_keyword"></span></td>
          <!-- <th :style="colorkey">ข้อความโฆษณา</th> -->
          <td :style="colorkey" v-if="l.data != 0">
        <tr v-for="(k, i) in l.data" :key="i">
          <td style="width:70%"><span v-html="k.sentent"></span></td>
          <td style="width:20%"><span v-if="k.answer == 1">เกินจริง</span><span v-if="k.answer == 9">ไม่เกินจริง</span><span
              v-if="k.answer == 0"></span></td>
          <td style="width:10%" v-if="!k.answer"><button @click="savetorule_based(k.dict_id, k.dict_name, 1,k.id)" type="submit" class="mb-3 btn btn-success">
              <i class="fa fa-check"></i>
           เกินจริง </button>&nbsp;
           <button @click="savetorule_based(k.dict_id,k.dict_name, 9,k.id)" type="submit" class="mb-3 btn btn-danger">
              <i class="fa fa-times"></i>
            ไม่เกินจริง</button></td>
        </tr>
        </td>
        <td :style="colorkey" v-else>
        <tr >
          ไม่พบข้อความโฆษณา
        </tr>
        </td>
        </tr>
      </tbody>
    </table>
    <div class="row" v-if="list.length">
      <div class="col-md-6">
        <a :href="'Advertising?id='+back"> <button type="submit" class="mb-3 btn btn-info" v-if="$route.query.id !=1">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button></a>
      </div>
      <div class="col-md-6" style="text-align: right;" v-if="$route.query.id < alldata">
        <a :href="'Advertising?id='+next"><button type="submit" class="mb-3 btn btn-info" >
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button></a></div>
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
                  <label>ข้อความโฆษณา</label>
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
  </div>
</template>

<script>
import axios from "axios";
import ProductsService from '../services/ProductsService.js'
import DictService from '../services/DictService'
import RuleBasedService from '../services/RuleBasedService'
import MapRuleBasedService from '../services/MapRuleBasedService'
import LinkService from '../services/LinkService'
import KeywordService from '../services/KeywordService'

export default {
  name: "App",
  components: {},
  data() {
    return {
      list: [],
      url: '',
      file: '',
      status: false,
      urlPath: '',
      imagelists: '',
      tokenize: '',
      matchname: '',
      matchcategory: '',
      type: '',
      matchnamesum: '',
      statusname: 0,
      statuscat: 0,
      statusfda: 0,
      colorname: 'background-color:#f9bdbb',
      colorfda: 'background-color:#f9bdbb',
      colorcat: 'background-color:#f9bdbb',
      id: '',
      keyword: [],
      colorkey: 'background-color:#f9bdbb',
      desc: '',
      arrList: [],
      alldata:0,
      back:0,
      next:0,
      title:'',
      data:{},
      pro_id:0,
    };
  },
  methods: {
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
          DictService.createdict(prodata).then(() => {
            // console.log(res.data );
            // RuleBasedService.createdcolumnrule_based(res.data.id).then(() => {
            document.getElementById("closedcategory").click();
            // this.getcategory();
            alert('บันทึกสำเร็จ')
          // });
        });
      });
        } else {
          KeywordService.updatekeyword(this.pro_id,prodata).then(() => {
            document.getElementById("closedcategory").click();
            // this.getcategory();
            alert('บันทึกสำเร็จ')
          });
            }
      }
    },
    savetorule(sen, answer,ad_id) {
      console.log(sen);
      var iddata = []
var dicts =[]
      for (let d = 0; d < sen.length; d++) {
        // console.log(datasplit[d]);
        DictService.getdicts('', sen[d].name).then(async (res) => {

          if (res.data.length > 0) {
            // console.log(res.data[0].id);
            iddata.push(res.data[0].id)
            dicts.push({id:res.data[0].id,
            name:sen[d].name})
          }
          // console.log(d+1 , sen.length);
          console.log(iddata);
          if (d + 1 == sen.length) {
            var sql = `SELECT m.* FROM map_rule_based m WHERE m.status = 1 and m.dict_id = '[${iddata}]'`
            console.log(sql);
            
             RuleBasedService.getbydict(sql).then((res) => {
              console.log(res.data);
              if (res.data.length == 0) {
                var maprule = {
                    rule_based_id: res.data.id,
                    advertise_id: ad_id,
                    status:1,
                    answer:answer
                  }
                  MapRuleBasedService.createmap_rule_based(maprule).then((res) => {
                    console.log(res.data);
                    var map_id = res.data.id
                    var updateadvertise = {
                    dict_id: iddata,
                  }
                  MapRuleBasedService.updateadvertise(ad_id,updateadvertise).then(() => {
                    for (let i = 0; i < dicts.length; i++) {
                var rule = {
                  map_rule_based_id	:map_id,
	dict_id	:dicts[i].id,
  dict_name:dicts[i].name,
	no:i+1
                }
                RuleBasedService.createrule_based(rule).then(() => {

               if (i+1 == iddata.length) {
                
                alert('บันทึกสำเร็จ')
              
              this.getdata()
                             }     
                });
              }
                    // console.log(res.data);
                    // var pro = {
                    //   map_rule_based:res.data.id
                    // }
                    // ProductsService.map_rule_based(id,pro).then(() => {
                    
                    //               setTimeout(function () {
                    //   location.reload();
                    // }, 500);
                    // });
                  });
                  });
                // let text = ''
                // text += '{'
                // for (let i = 0; i < iddata.length; i++) {
                //   // console.log(iddata[i]);
                //   text += '"dict' + iddata[i] + '"' + ':' + 1 + ','

                // }
                // text += '"answer' + '"' + ':' + answer + ','
                // text = text.slice(0, -1);
                // text += '}'
                // // console.log(text);
                // let jsonData = JSON.parse(text);
                // // console.log(jsonData);
                // RuleBasedService.createrule_based(jsonData).then((res) => {
                  
                // });
              } else {
                // console.log(res.data);
                var updatemaprule = {
                  answer: answer,
                }
                MapRuleBasedService.updateanswer(res.data[0].id, updatemaprule).then(() => {
                  alert('บันทึกสำเร็จ')

                  this.getdata()
                })
              }
            });

          }
        });

      }

    },
    savetorule_based(id, name, answer,ad_id) {
      var dicts = JSON.parse(id)
      var dictname = JSON.parse(name)
      MapRuleBasedService.findadanduser(ad_id,this.currentUser.id).then(async (res) => {
console.log(res.data);

if (res.data.length == 0) {
  var maprule = {
                    advertise_id: ad_id,
                    answer:answer,
                    user:this.currentUser.id,
                    status:1

                  }
                  MapRuleBasedService.createmap_rule_based(maprule).then((res) => {
                    var map_id = res.data.id
                    for (let i = 0; i < dicts.length; i++) {
                var rule = {
                  map_rule_based_id	:map_id,
	dict_id	:dicts[i],
  dict_name:dictname[i],
	no:i+1
                }
                RuleBasedService.createrule_based(rule).then(() => {

               if (i+1 == dicts.length) {
                
                alert('บันทึกสำเร็จ')
              
              this.getdata()
                             }     
                });
              }
                });
}
      });
      // sen = JSON.parse(sen)
      // id = JSON.parse(id)
      // console.log(id);
      // console.log(id.length);
      // // console.log(ad_id);
      // console.log(sen.length);
      // console.log('answer',answer);
      // if (id.length != sen.length) {
      //   for (let a = 0; a < sen.length; a++) {
      //     // console.log(sen[a].name);
      //     DictService.getdicts('', sen[a].name).then(async (res) => {
      //       console.log(res.data);
      //       if (res.data.length == 0) {
      //         var prodata = {
      //           name: sen[a].name,
      //           status: 1,
      //         };
      //         console.log(prodata);
      //         DictService.createdict(prodata).then(() => {

      //           //   RuleBasedService.createdcolumnrule_based(res.data.id).then(() => {

      //           // });
      //           // console.log(a + 1,sen.length);
      //         //   if (a + 1 == sen.length) {
      //         //     // console.log(1);
      //         // this.savetorule(sen, answer, ad_id)
      //       // }
      //         });
      //       }else{
      //         // console.log(a + 1,sen.length);
      //           if (a + 1 == sen.length) {
      //             // console.log(1);
      //        this.savetorule(sen, answer, ad_id)
      //       }
      //       }
            
            
      //     })

      //   }
      // } else {
      //   this.savetorule(sen, answer,ad_id)
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
      // console.log('http://127.0.0.1:5000/checkkeyword?name=' + name);
      var desc = this.finddescription(name)
      // console.log('http://127.0.0.1:5000/worktokendesc?text='+desc);
      axios.get(LinkService.getpythonlink()+'/worktokendesc?text=' + desc).then((res) => {
        // console.log(res.data);
        this.desc = res.data
      });
      // name = 'ข้อมูลจำเพาะของสินค้า หมวดหมู่ Shopee กลุ่มผลิตภัณฑ์เพื่อสุขภาพ อาหารเสริมเพื่อความงาม ผิว ยี่ห้อ Bluebird(บลูเบิร์ด) Storage Condition Normal ประเภทสารอาหาร สารต้านอนุมูลอิสระ, วิตามินซี ประเทศต้นกำเนิดสินค้า ไทย หน้าที่ของอาหารเสริมสำหรับความงาม ดูแลสิว, ป้องกันริ้วรอย ประเภทการห่อ ห่อรวมกัน เพศ ทั้งสองเพศ อายุการเก็บรักษา 12 เดือน ประเภทของผลิตภัณฑ์ยา แคปซูล หมายเลขใบอนุญาต/อย. 30-1-26764-5-0051 จำนวนสินค้า 17901 ส่งจาก จังหวัดนครราชสีมา รายละเอียดสินค้า วิตามินซี พลัส ตรา บลูเบิร์ด ตรา บลูเบิร์ด ขนาด 1000 มิลลิกรัม 60 แคปซูล เรทขายส่ง ช่วงราคาที่ 1 สั่งซื้อตั้งแต่ 5 กระปุกขึ้นไป ถึง 20 กระปุก ราคากระปุกละ 93 บาท ช่วงราคาที่ 2 สั่งซื้อตั้งแต่ 21 กระปุกขึ้นไป ถึง 50 กระปุก ราคากระปุกละ 90 บาท ช่วงราคาที่ 3 สั่งซื้อตั้งแต่ 51 กระปุกขึ้นไป ถึง 100 กระปุก ราคากระปุกละ 87 บาท ช่วงราคาที่ 4 สั่งซื้อตั้งแต่ 100 กระปุกขึ้นไป ..................... ราคากระปุกละ 85 บาท Vitamin C Plus Dietary Supplement Product Bluebird Brand ผลิตภัณฑ์เสริมอาหารวิตามินซี พลัส ตรา บลูเบิร์ด ส่วนประกอบทั้งหมดใน 1 แคปซูล ส่วนประกอบที่สำคัญ (Active Ingredient) VITAMIN C (100%) - 60 มิลลิกรัม CITRUS BIOFLAVONOID POWDER - 630 มิลลิกรัม BARBADOSCHERRY POWDER/ACEROLA CHERRY POWDER (ผงบาร์เบโดสเชอร์รี/ผงอะเซโรลาเชอร์รี) (MALPIGHIA GLABRA L.) ผล - 60 มิลลิกรัม ROSEHIP POWDER (ผงโรสฮิปส์) (ROSA CANINA L.) ผล - 60 มิลลิกรัม Rutin - 30 มิลลิกรัม INDIAN GOOSEBERRY POWDER (ผงมะขามป้อม) (PHYLLANTHUS EMBLICA L. ) ผล - 60 มิลลิกรัม ส่วนประกอบที่ไม่สำคัญ (Inactive Ingredient) EDIBLE GELATIN 428 - 98.5 มิลลิกรัม TITANIUM DIOXIDE 171 -1.95 มิลลิกรัม วิธีรับประทาน ครั้งละ 1-2 แคปซูล หลังอาหารเช้า เลขที่ อ.ย. 30-1-26764-5-0051 คำเตือน ควรเก็บให้พ้นแสงแดงและความชื้น เด็ก สตรีมีครรภ์ และสตรีให้นมบุตรไม่ควรรับประทาน ควรกินอาหารหลากหลายให้ครบ 5 หมู่ ในสัดส่วนที่เหมาะสมเป็นประจำ ไม่มีผลในการป้องกันหรือรักษาโรค สรรพคุณ ประโยชน์ของการกินวิตามินซี ️ทำให้หน้าไม่โทรม หน้าตาสดใส ️ช่วยฟื้นฟูผิวหน้า สิว ฝ้า กระ ริ้วรอย ดูจางลง ️ผิวพรรณนุ่มเรียบเนียบ ชุ่มชื่น ️หน้าตาดูเด็กและเด้งขึ้น ️ผิวหน้าขาวอมชมพู สินค้าตัดรอบทุกวันเวลา ตัดรอบเวลา 12.00 น ของทุกวัน แจ้งโอนเกินเวลา ส่งรอบวันถัดไปนะจ๊ะ ส่งพัสดุทุกวัน เว้นวันอาทิตย์ และวันหยุดนักขัตฤกษ์ ขอบพระคุณลูกค้าทุกท่าน ที่ไว้วางใจผลิตภัณฑ์ของเราเสมอมา_/l\_'
      // console.log('http://127.0.0.1:5000/checkkeyword?name=' + desc);    
      axios.get(LinkService.getpythonlink()+'/checkkeyword?name=' + desc).then((res) => {
        // console.log(res.data);
        if (res.data.length > 0) {
          // this.keyword.push(res.data)
          this.keyword = res.data

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
    finddescription(data) {
      // console.log(data);
      var text = ['รายละเอียด']
      var findfda = data
      for (let t = 0; t < text.length; t++) {
        if (findfda.indexOf(text[t]) != -1) {

          findfda = findfda.substring(findfda.indexOf(text[t]));
        }

      }
      // if (findfda == 'อาหาร') {
      //   findfda = findfda+ findfda+'เสริม'
      // }
      // console.log(findfda);
      return findfda
    },
    getdata() {
      // var end = this.$route.query.id*5
      // // var start = end-4
      // var start = this.$route.query.id
      // console.log(start);
      ProductsService.getdecision(this.currentUser.id).then(async (res) => {
      
        this.list = res.data
        // console.log(this.list);
      })


    }
  },
  mounted() {
    // console.log(this.$route.query.id);
    this.back = parseInt(this.$route.query.id)-1
    this.next = parseInt(this.$route.query.id)+1
    // ProductsService.getproducts(1,'','').then((res)=>{
      this.alldata = 75
      // console.log(res.data);
    this.getdata()
    // });
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },    
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
