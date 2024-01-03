<template>
  <div class="container mt-5">
    <!-- <div style="text-align:right"> <button @click="getid(0)"
          data-bs-toggle="modal"
          data-bs-target="#AddScopus"
           type="submit" class="mb-3 btn btn-success">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button></div> -->

    
    <div class="form-group">
      <label for="exampleInputEmail1">จำนวนการเทส (%)</label>
      <input
        type="number"
        class="form-control"
        id="exampleInputEmail1"
        min="10"
        max="100"
        v-model="testno"
      />
    </div>
    <button type="submit" class="btn btn-success btn-sm" @click="gettest()">
      เทส
    </button>
    <table class="table table-bordered mt-5" v-if="statustest">
      <thead>
        <tr>
          <th scope="col">{{ alltest }}</th>
          <th scope="col">เกินจริง</th>
          <th scope="col">ไม่เกินจริง</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">เกินจริง</th>
          <td style="text-align:center">{{truepos}}</td>
          <td style="text-align:center">{{trueneg}}</td>
        </tr>
        <tr>
          <th scope="row">ไม่เกินจริง</th>
          <td style="text-align:center">{{falsepos}}</td>
          <td style="text-align:center">{{ falseneg }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered" v-if="statustest">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">เกินจริง</th>
          <th scope="col">ไม่เกินจริง</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Recall</th>
          <td style="text-align:center">{{recall.true}}%</td>
          <td style="text-align:center">{{recall.false}}% </td>
        </tr>
        <tr>
          <th scope="row">Precision</th>
          <td style="text-align:center">{{precision.true}}%</td>
          <td style="text-align:center">{{precision.false}}%</td>
        </tr>
        <tr>
          <th scope="row">Accuracy</th>
          <td style="text-align:center" colspan="2">{{accuracy}}%</td>
        </tr>
      </tbody>
    </table>

    <!-- <div v-if="statustest">
    Recall <br>
    เกินจริง : {{recall.true}} % <br>
    ไม่เกินจริง : {{recall.false}} % <br>
    Precision  <br>
    เกินจริง : {{precision.true}} %<br>
    ไม่เกินจริง : {{precision.false}} %<br>
    Accuracy {{accuracy}} %
  </div> -->
    <div class="mb-5" v-if="statustest">
      <table
        class="table table-striped table-bordered"
        style="background-color: #4472c4"
        v-if="listtest.length > 0"
        width="100%"
      >
        <thead>
          <tr>
            <th scope="col" style="text-align: center">ลำดับของเว็บไซต์</th>
            <th scope="col">ประเภทผลิตภัณฑ์</th>
            <th scope="col">รายละเอียดสินค้า</th>
            <th scope="col">รูปประโยค</th>
            <th scope="col" style="text-align: center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in listtest" :key="i + 1">
            <td style="width: 20%">{{ l.url }}</td>
            <td style="width: 20%">{{ l.typename }}</td>
            <td style="width: 40%">
              <img :src="l.img_path" style="width: 50%" /><br />
              {{ l.sentence }}
            </td>
            <td style="width: 5%"><span v-html="l.sen"></span> </td>
            <td style="width: 5%">{{ l.rulename }}</td>
            <!-- <td style="text-align: center">
              <a :href="'/addproducttoken?id=' + l.id">
                <button
                  type="button"
                  style="color: white"
                  class="btn btn-warning"
                >
                  <i class="fa fa-edit"></i>
                </button>
              </a>
              &nbsp;
              <a :href="'/product/' + l.id">
                <button
                  type="button"
                  style="background-color: #4472c4; color: white"
                  class="btn"
                >
                  เทรน
                </button>
              </a>
            </td> -->
          </tr>
        </tbody>
      </table>
      <div v-if="list.length == 0" class="mt-5">
        <h3 style="text-align: center">ไม่พบข้อมูล</h3>
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
            <button
              type="button"
              class="btn btn-success"
              @click="deleteScopus()"
            >
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
import KeywordService from "../services/KeywordService";
import axios from "axios";
import RuleBasedService from "../services/RuleBasedService";
import DictService from "../services/DictService";
import MapRuleBasedService from "../services/MapRuleBasedService";
import LinkService from "../services/LinkService";
import ProductsService from "../services/ProductsService";

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
      url: "",
      file: "",
      status: false,
      urlPath: "",
      title: "",
      data: {},
      pro_id: 0,
      category: [],
      pageOfItems: [],
      customLabels,
      testno: 0,
      alltest: 0,
      listtest: [],
      truepos:0,
      falsepos:0,
      trueneg:0,
      falseneg:0,
      statustest:false,
      recall:{},
      precision:{},
      accuracy:0
    };
  },
  methods: {
    getCountryByCode(code, data) {
      return data.filter(function (data) {
        return data.type_rulebasedId == code;
      });
    },
    gettp(){
      var positive = this.getCountryByCode(1, this.listtest)
      var negative = this.getCountryByCode(2, this.listtest)
      this.truepos = 0
      this.falsepos = 0
      this.trueneg = 0
      this.falseneg = 0
      for (let t = 0; t < positive.length; t++) {
        if (positive[t].statustestid == 1) {
          this.truepos = this.truepos+1
        }else{
          this.falsepos= this.falsepos+1
        }
      }
      for (let n = 0; n < negative.length; n++) {
        if (negative[n].statustestid == 2) {
          this.falseneg = this.falseneg+1
        }else{
          this.trueneg= this.trueneg+1
        }
      }
      // this.truepos = 43
      // this.falsepos = 7
      // this.trueneg = 3
      // this.falseneg = 47
      this.recall.true = ((this.truepos/(this.truepos+this.falsepos))*100).toFixed(2)
      this.recall.false = ((this.falseneg/(this.falseneg+this.trueneg))*100).toFixed(2)
      this.precision.true = ((this.truepos/(this.truepos+this.trueneg))*100).toFixed(2)
      this.precision.false = ((this.falseneg/(this.falseneg+this.falsepos))*100).toFixed(2)
      this.accuracy = (((this.truepos+this.falseneg)/(this.truepos+this.falsepos+this.trueneg+this.falseneg))*100).toFixed(2)
      // console.log(this.truepos,this.falsepos);
      // console.log(this.trueneg,this.falseneg);
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
    gettest() {
      this.listtest = []
      this.statustest = false
      this.alltest = ((this.testno / 100) * this.list.length).toFixed(0);
      ProductsService.findAlltest(this.alltest).then(async (test) => {
        // console.log(res.data);
        // this.listtest = res.data;
        for (let l = 0; l < test.data.length; l++) {
          var selectpro = {
        // url: this.data.url,
        id: test.data[l].id,
      };
      MapRuleBasedService.getproducttest(selectpro).then(async (res) => {
        // console.log(res.data);
        if (res.data.keyword != 1) {
          test.data[l].statustest = this.getstatuscheck(res.data.keyword[0].statustrue,res.data.keyword[0].statusfalse)
          test.data[l].sen = res.data.keyword[0].sen
if (this.getstatuscheck(res.data.keyword[0].statustrue,res.data.keyword[0].statusfalse) == 'เกินจริง') {
  test.data[l].statustestid = 1
}else{
  test.data[l].statustestid = 2
}
        }else{
          test.data[l].statustest = 'ไม่พบข้อความโฆษณา'
          test.data[l].statustestid = 2
          test.data[l].sen = 'ไม่พบรูปประโยค'

        }
        this.listtest.push(test.data[l])
        this.listtest= this.listtest.sort(function(a, b){
    return a.url - b.url;
});
        if (l+1 == test.data.length) {
      // console.log(this.listtest);
      this.gettp()
          this.statustest = true
        }
      })

        //   var getprotoken = {
        //     url: this.listtest[l].id,
        //   };
        //   await MapRuleBasedService.getproductkeyword(getprotoken).then(
        //     async (pro) => {
        //       console.log(pro.data);
        //        await this.tokendata(pro.data);
        //     }
        //   );
        }
      });
    },
    getMax(arr, prop) {
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
        var arrtest = []
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
                      arrtest.push(rulebased)
                      // console.log(l + 1, list.keyword.length);
                      if (l + 1 == list.keyword.length) {
                        // var maxvaluetest = this.getMax(arrtest, "allcount");
                        // var i = this.getAllMaxArray(arrtest, maxvaluetest.allcount);
              // console.log(i);
              // var bestdata = this.getMax(i, "length");
              // console.log(bestdata);
              }
                    }
                  );
                });
              // list.keyword[l].rulebase = res.data;
              
            });
          }

          // }
        }
      }
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
      window.scrollTo(0, 0);
    },
    deleteScopus() {
      console.log(this.pro_id);
      var data = {
        status: 0,
      };
      MapRuleBasedService.deletemap_rule_based(this.pro_id, data).then(
        () => {
          // console.log(res.data);
          document.getElementById("closedDeleteScopus").click();
          this.getcategory();
          alert("บันทึกสำเร็จ");
        }
      );
    },
    save() {
      console.log(this.data);
      if (this.data.name == null || this.data.cat_id == "") {
        alert("กรุณากรอกข้อความ");
      } else {
        var prodata = {
          id: this.data.id,
          name: this.data.name,
          status: 1,
        };
        console.log(prodata);
        if (this.pro_id == 0) {
          KeywordService.createkeyword(prodata).then(() => {
            DictService.createdict(prodata).then((res) => {
              // console.log(res.data );
              RuleBasedService.createdcolumnrule_based(res.data.id).then(() => {
                document.getElementById("closedcategory").click();
                this.getcategory();
                alert("บันทึกสำเร็จ");
              });
            });
          });
        } else {
          KeywordService.updatekeyword(this.pro_id, prodata).then(() => {
            document.getElementById("closedcategory").click();
            this.getcategory();
            alert("บันทึกสำเร็จ");
          });
        }
      }
    },
    token(text) {
      var tokenize = "";
      axios
        .get(LinkService.getpythonlink() + "/tokenkeyword?text=" + text)
        .then((res) => {
          // this.tokenize = res.data
          // console.log(res.data);
          tokenize = res.data;
        });
      return tokenize;
    },
    updatetoken(data, type) {
      // console.log(data);
      var tokenize = "";
      // data.name = data.name.replaceAll(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
      // data.name = data.name.replaceAll(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');

      axios
        .get(LinkService.getpythonlink() + "/tokenkeyword?text=" + data.name)
        .then((res) => {
          this.tokenize = res.data;
          // console.log(res.data);
          tokenize = res.data.replaceAll(" ", "");
          tokenize = tokenize.replaceAll(".", "");
          tokenize = tokenize.replaceAll("''", "");
          tokenize = tokenize.replaceAll(",,", ",");
          tokenize = tokenize.replaceAll("[", "");
          tokenize = tokenize.replaceAll("]", "");
          tokenize = tokenize.replaceAll("'", "");
          tokenize = tokenize.replaceAll(",", " | ");
          var tokendata = {
            name: data.name,
            token: tokenize,
          };
          // console.log(tokendata);
          // console.log(data.id);
          KeywordService.updatekeyword(data.id, tokendata).then(() => {
            // console.log(res.data);
            if (type == "update") {
              document.getElementById("closedcategory").click();
              this.getcategory();
              alert("บันทึกสำเร็จ");
            }
          });
        });
    },
    getcategory() {
      ProductsService.getproductstoken("").then((res) => {
        // console.log(res.data);
        this.list = res.data;

        // this.gettest();
      });
    },
    getid(id) {
      // console.log(id);
      this.pro_id = id;
    },
  },
  mounted() {
    this.getcategory();
    this.statustest = false
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
.table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th {
  background-color: #cfd5ea;
  /* color: white; */
}
.table-striped > tbody > tr:nth-child(even) > td,
.table-striped > tbody > tr:nth-child(even) > th {
  background-color: #e7ebf5;
  /* color: white; */
}
</style>
