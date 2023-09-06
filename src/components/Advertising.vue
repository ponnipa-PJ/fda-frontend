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
          <th style="background-color:#ffb454">ข้อความโฆษณา</th>
        </tr>
        <tr>
          <td :style="colorkey" style="width:40%"><span v-html="l.desctext"></span></td>
          <!-- <th :style="colorkey">ข้อความโฆษณา</th> -->
          <td :style="colorkey" v-if="l.keyword != 0">
        <tr v-for="(k, i) in l.keyword" :key="i">
          <td><span v-html="k.sentent"></span></td>
          <td><span v-if="k.status == 1">เกินจริง</span><span v-if="k.status == 9">ไม่เกินจริง</span><span
              v-if="k.status == 0"></span></td>

          <td><button @click="savetorule_based(k.id, k.sen, 1)" type="submit" class="mb-3 btn btn-success">
              <i class="fa fa-check"></i>
            </button>&nbsp;
           <button @click="savetorule_based(k.id, k.sen, 9)" type="submit" class="mb-3 btn btn-danger">
              <i class="fa fa-times"></i>
            </button></td>
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
  </div>
</template>

<script>
import axios from "axios";
import ProductsService from '../services/ProductsService.js'
import DictService from '../services/DictService'
import RuleBasedService from '../services/RuleBasedService'
import MapRuleBasedService from '../services/MapRuleBasedService'
import LinkService from '../services/LinkService'

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
      next:0
    };
  },
  methods: {
    savetorule(sen, answer) {
      // console.log(answer);
      var iddata = []

      for (let d = 0; d < sen.length; d++) {
        // console.log(datasplit[d]);
        DictService.getdicts('', sen[d]).then(async (res) => {

          if (res.data.length > 0) {
            // console.log(res.data[0].id);
            iddata.push(res.data[0].id)
          }
          // console.log(d+1 , sen.length);
          // console.log(iddata);
          if (d + 1 == sen.length) {
            var sql = `SELECT r.* FROM map_rule_based m join rule_based r on m.rule_based_id = r.id WHERE m.status = 1 and dict_id = '[${iddata}]'`
            console.log(sql);
            
            await RuleBasedService.getbydict(sql).then((res) => {
              if (res.data.length == 0) {
                let text = ''
                text += '{'
                for (let i = 0; i < iddata.length; i++) {
                  // console.log(iddata[i]);
                  text += '"dict' + iddata[i] + '"' + ':' + 1 + ','

                }
                text += '"answer' + '"' + ':' + answer + ','
                text = text.slice(0, -1);
                text += '}'
                // console.log(text);
                let jsonData = JSON.parse(text);
                // console.log(jsonData);
                RuleBasedService.createrule_based(jsonData).then((res) => {
                  var maprule = {
                    rule_based_id: res.data.id,
                    dict_id: iddata,
                    status:1
                  }
                  MapRuleBasedService.createmap_rule_based(maprule).then(() => {
                    // console.log(res.data);
                    // var pro = {
                    //   map_rule_based:res.data.id
                    // }
                    // ProductsService.map_rule_based(id,pro).then(() => {
                    alert('บันทึกสำเร็จ')

                    this.getdata()
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
                }
                RuleBasedService.updaterule_based(res.data[0].id, updatemaprule).then(() => {
                  alert('บันทึกสำเร็จ')

                  this.getdata()
                })
              }
            });

          }
        });

      }

    },
    savetorule_based(id, sen, answer) {
      // console.log(id.length);
      // console.log(sen.length);
      // console.log('answer',answer);
      if (id.length != sen.length) {
        for (let a = 0; a < sen.length; a++) {
          DictService.getdicts('', sen[a]).then((res) => {
            // console.log(res.data);
            if (res.data.length == 0) {
              var prodata = {
                name: sen[a],
                status: 1,
              };
              // console.log(prodata);
              DictService.createdict(prodata).then(() => {
                //   RuleBasedService.createdcolumnrule_based(res.data.id).then(() => {

                // });
                if (a + 1 == sen.length) {
              this.savetorule(sen, answer)
            }
              });
            }
            
          })

        }
      } else {
        this.savetorule(sen, answer)
      }
      //       this.arrList = []
      //       console.log(answer);
      // keyword= keyword.toString();
      // var data = keyword.replaceAll('<span style="color:red">','')
      //   data = data.replaceAll('</span>','')
      //   data = data.replaceAll('  ',' ')
      //   // console.log(data);
      //   var datasplit = data.split(" ")
      //   // console.log(datasplit);
      //   for (let d = 0; d < datasplit.length; d++) {
      //     if (datasplit[d] != '') {
      //       this.arrList.push(datasplit[d])
      //       // console.log(datasplit[d]);

      //     }
      //   }

      //   console.log(this.arrList);
      //     for (let a = 0; a < this.arrList.length; a++) {
      //     DictService.getdicts('',this.arrList[a]).then((res)=>{
      //         // console.log(res.data);
      //         if (res.data.length == 0) {
      //           var prodata = {
      //           name: this.arrList[a],
      //           status:1,
      //         };
      //         // console.log(prodata);
      //           DictService.createdict(prodata).then((res) => {
      //             RuleBasedService.createdcolumnrule_based(res.data.id).then(() => {
      //           });
      //         });
      //         }
      //       })
      //         if (a+1== this.arrList.length) {
      //       this.savetorule(answer)
      //       // console.log(1);
      //     }
      //     }
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
      var end = this.$route.query.id*5
      // var start = end-4
      var start = this.$route.query.id
      console.log(start);
      ProductsService.getproductkeyword(start,end).then(async (res) => {
        // this.list = res.data
        // console.log(res.data);
        for (let l = 0; l < res.data.length; l++) {
          // var desc = this.finddescription(res.data[l].content)
          // res.data[l].desc =  desc
          // // console.log('http://127.0.0.1:5000/checkkeyword?name=' + desc);   
          axios.get(LinkService.getpythonlink()+'/worktokendesc?text=' + res.data[l].desc).then((desc) => {
            // console.log(res.data);
            res.data[l].desctext = desc.data
            axios.get(LinkService.getpythonlink()+'checkkeyword?name=' + res.data[l].desc).then((keys) => {
              console.log(keys.data);
              if (keys.data.length > 0) {
                res.data[l].keyword = keys.data
              } else {
                res.data[l].keyword = 0
              }
              if (l + 1 == res.data.length) {
                this.list = res.data
              }
            });

          });
          //   }
        }
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
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
}
</style>
