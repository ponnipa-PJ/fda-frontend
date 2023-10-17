<template>
  <div class="container">
    <div class="row">
      <div>
        <div class="form-group mt-5">
          <label for="exampleFormControlTextarea1">URL</label>
          <textarea
            v-model="data.url"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Content</label>
          <textarea
            v-model="data.content"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="7"
          ></textarea>
        </div>
        <button @click="search()" type="submit" class="mb-3 btn btn-success">
          ค้นหา
        </button>
      </div>
      <table class="table table-bordered mt-3 mb-5" v-if="status">
        <tbody>
          <tr>
            <th style="background-color: #ffb454">รายละเอียดสินค้า</th>
            <th style="background-color: #ffb454">ข้อความโฆษณา</th>
          </tr>
          <tr>
            <td :style="colorkey" style="width: 40%">
              <span v-html="list.sentence_keyword"></span>
            </td>
            <!-- <th :style="colorkey">ข้อความโฆษณา</th> -->
            <td :style="colorkey" v-if="list.keyword != 0">
              <tr v-for="(k, i) in list.keyword" :key="i">
                <td>
                  <span v-html="k.sentent"></span><br />
                  {{ k.percentage.toFixed(2) }}%
                </td>
                <!-- <td>
                  <span v-if="k.status == 1">เกินจริง</span
                  ><span v-if="k.status == 9">ไม่เกินจริง</span
                  ><span v-if="k.status == 0"></span>
                </td> -->

                <!-- <td>
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
                </td> -->
              </tr>
            </td>
            <td :style="colorkey" v-else>
              <tr>
                ไม่พบข้อความโฆษณา
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
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

export default {
  name: "App",
  components: {},
  data() {
    return {
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
      product_token:0
    };
  },
  methods: {
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
    savetorule_based(data, answer) {
      // console.log(sen.length);
      // console.log('answer',answer);
      // console.log(data);

      var maprule = {
        keyword_id: 1,
        advertise_id: null,
        status: 1,
        answer: answer,
        user: 1,
      };
      MapRuleBasedService.createmap_rule_based(maprule).then(async (res) => {
        // console.log(res.data);
        var map_id = res.data.id;
        var sendata = JSON.parse(data.dict_id);
        var dict_name = JSON.parse(data.dict_name);
        for (let d = 0; d < sendata.length; d++) {
          var rule = {
            map_rule_based_id: map_id,
            dict_id: sendata[d],
            dict_name: dict_name[d],
            no: d + 1,
          };
          RuleBasedService.createrule_based(rule).then(() => {
            if (d + 1 == sendata.length) {
              alert("บันทึกสำเร็จ");
            }
          });
        }
      });

      // if (id.length != sen.length) {
      //   for (let a = 0; a < sen.length; a++) {
      //     DictService.getdicts("", sen[a]).then((res) => {
      //       // console.log(res.data);
      //       if (res.data.length == 0) {
      //         var prodata = {
      //           name: sen[a],
      //           status: 1,
      //         };
      //         // console.log(prodata);
      //         DictService.createdict(prodata).then(() => {
      //           //   RuleBasedService.createdcolumnrule_based(res.data.id).then(() => {

      //           // });
      //           if (a + 1 == sen.length) {
      //             this.savetorule(sen, answer);
      //           }
      //         });
      //       }
      //     });
      //   }
      // } else {
      // this.savetorule(sendata, answer);
      // }
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
    finddescription(data) {
      // console.log(data);
      var text = ["รายละเอียด"];
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
    async search() {
      await this.loaddict();
      this.status = false;
      if (this.data.url == null || this.data.url == "") {
        alert("กรุณากรอก URL");
      } else if (this.data.content == null || this.data.content == "") {
        alert("กรุณากรอกข้อความโฆษณา");
      } else {
        var content = "";
        content = this.data.content.replaceAll(
          /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
          ""
        );
        content = content.replaceAll(
          /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
          ""
        );
        
        content = content.replaceAll(
          /\ud83d[\ude00-\ude4f]/g,""
        );
        content = content.replaceAll(/(\r\n|\n|\r)/gm, " ");
        content = content.replaceAll("_", "");
        content = content.replaceAll("!", "");
        content = content.replaceAll("*", "");
        content = content.replaceAll("&", "");
        content = content.replaceAll("#", "");
        content = content.replaceAll("•", "");
        content = content.replaceAll("+", "");
        content = content.replaceAll(`_/l\_`, ""); // eslint-disable-line
        var url = this.data.url.split("-i.");
        //  console.log(url);
        var selectpro = {
          url: url[0],
        };
        MapRuleBasedService.getproduct_token(selectpro).then(async (res) => {
          console.log(res.data);
          // console.log(content);
          if (res.data.length == 0) {
            // console.log(LinkService.getpythonlink()+'/worktokendesc?text=' + content);
            var con = {
              content: content,
            };
            await axios
              .post(LinkService.getpythonlink() + "/wordtokendesc", con)
              .then(async (res) => {
                console.log(res.data);
                // var sentence = res.data.sentent.replaceAll("<spanstyle", "<span style");
                var des = {
                  url: url[0],
                  sentence: this.data.content,
                  sentence_keyword: res.data.sentent,
                  keyword_id:res.data.keywordId,
                  status: 1,
                };
                console.log(des);
                await MapRuleBasedService.createproduct_token(des).then(
                  async (res) => {
                    // console.log(res.data.id);
                    var product_token = res.data.id;

                    await axios
                      .post(LinkService.getpythonlink() + "/checkkeyword", con)
                      .then(async (res) => {
                        console.log(res.data);
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
                            product_token_id: product_token,
                            keyword_dict_id: res.data[r].keyword_dict_id,
                            dict_id: res.data[r].dict_id,
                            dict_name: res.data[r].dict_name,
                            sentent: sentencetoken,
                            sen: res.data[r].sen,
                          };
                          AdvertiseService.createadvertise(advertise).then(
                            () => {
                              if (r + 1 == res.data.length) {
                                MapRuleBasedService.getproduct_token(
                                  selectpro
                                ).then((pro) => {
                                  this.product_token = pro.data.id
                                  // this.list = res.data
                                  this.tokendata(pro.data);
                                });
                              }
                            }
                          );
                        }
                        // if (keys.data.length > 0) {
                        //   res.data[l].keyword = keys.data
                        // } else {
                        //   res.data[l].keyword = 0
                        // }
                        // if (l + 1 == res.data.length) {
                        //   this.list = res.data
                        // }
                      });
                  }
                );
              });
          } else {
            this.tokendata(res.data);
            this.product_token = res.data.id
            // console.log(this.list);
          }
        });
      }
    },
    tokendata(list) {
      console.log(list);
      for (let l = 0; l < list.keyword.length; l++) {
        console.log(list.keyword[l].keyword_dict_id);
        if (list.keyword[l].keyword_dict_id) {
          var map = {
            url: list.keyword[l].keyword_dict_id,
            keyword_id:list.keyword[l].dict_id,
          };
          console.log(map);
          MapRuleBasedService.getmapproduct(map).then((res) => {
            list.keyword[l].rulebase = res.data;
            if (l + 1 == list.keyword.length) {
              this.compare(list);
            }
          });
        }

        // }
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
          this.status = true;
        }
      }
    },
  },
  mounted() {
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
