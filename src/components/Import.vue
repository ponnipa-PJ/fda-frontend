<template>
  <div class="container" style="height: 600px">
    <div class="form-group mt-5">

      <label for="exampleFormControlTextarea1">URL</label>
      <textarea v-model="url" class="form-control" id="exampleFormControlTextarea1" rows="7"></textarea>
    </div>
    <button @click="search()" type="submit" class="mb-3 btn btn-success">
      ค้นหา
    </button>
    <!-- <div class="form-group mt-5">
        <label for="exampleFormControlFile1">นำเข้าไฟล์&nbsp;</label>
        <input type="file" @change="onChangeA1" class="form-control-file" id="exampleFormControlFile1" />
      </div> -->
      <table class="table table-bordered" v-if="list.length > 0">
      <thead>
        <tr>
          <th scope="col" style="text-align:center">เงื่อนไขการตรวจสอบข้อที่ 1</th>
          <th scope="col" style="text-align:center">ข้อมูลจากฐานข้อมูลอย.</th>
          <th scope="col" style="text-align:center">ข้อมูลจากเว็บไซต์</th>
          <th scope="col" style="text-align:center">ผลการตรวจสอบ</th>
          <th scope="col" style="text-align:center">ข้อสรุป</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td :style="colorfda">เลขที่อนุญาต</td>
          <td :style="colorfda">{{ list[0].fda }}</td>
          <td :style="colorfda">{{ list[0].fda }}</td>
          <td :style="colorfda">{{ list[0].list.cncnm }}</td>
          <td v-if="statusfda && statuscat && statusname" rowspan="3" style="text-align: center;vertical-align: middle;background-color:#a3e9a4">
          <span>ผ่าน</span></td>
          <td v-else rowspan="3" style="text-align: center;vertical-align: middle;background-color:#f9bdbb">
          <span>ไม่ผ่าน</span></td>
        </tr>
        <tr>
          <td :style="colorcat">ประเภทผลิตภัณฑ์</td>
          <td :style="colorcat">{{ type}}</td>
          <td :style="colorcat"><span v-html="matchcategory"></span></td>
          <td :style="colorcat"><span v-if="statuscat">ผ่าน</span><span v-else>ไม่ผ่าน</span></td>
        </tr>
        <tr>
          <td :style="colorname">ชื่อผลิตภัณฑ์</td>
          <td :style="colorname">{{ list[0].list.productha }}<br/>{{ list[0].list.produceng }}</td>
          <td :style="colorname"><span v-html="matchname"></span></td>
          <td :style="colorname"><span v-if="statusname">ผ่าน</span><span v-else>ไม่ผ่าน</span></td>
        </tr>
      </tbody>
      </table>
    <table class="table mt-3" v-if="list.length > 0">
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
        <tr v-for="(l, i) in list" :key="i">
          <td :style="l.bg"><img :src="imagelists" style="width:100%">{{ l.name }}</td>
          <td :style="l.bg">{{ l.detail }}</td>
          <!-- <td :style="l.bg">
              <div class="row">
          <div class="col-md-2" v-for="(im ,i) in imagelists" :key="i">
            <img :src="im" width="100%"/>
          </div>
        </div>
            </td> -->
          <td :style="l.bg" style="width:300px"><div >เลขที่อนุญาต : <span style="color:red">{{ l.fda }}</span><br/>
            ชื่อผลิตภัณฑ์: <span v-html="matchname"></span>
           </div></td>
          <td :style="l.bg"><div v-html="cut(tokenize)"></div></td>
          <td style="background-color:#BDEDFF" v-if="l.status == 1">
            <p class="card-text">สถานะ : {{ l.list.cncnm }}</p>
            <p class="card-text">ประเภทผลิตภัณฑ์ :<span style="color:red"> {{ l.list.typepro }}</span></p>
            <p class="card-text">ใบสำคัญ/เลขที่อนุญาต : <span style="color:red"> {{ l.list.lcnno }}</span></p>
            <p class="card-text">ชื่อผลิตภัณฑ์ (TH) : <span style="color:red"> {{ l.list.productha }}</span></p>
            <p class="card-text">ชื่อผลิตภัณฑ์ (EN) : <span style="color:red"> {{ l.list.produceng }}</span></p>
            <p class="card-text">ชื่อผู้รับอนุญาต : {{ l.list.licen }}</p>
            <p class="card-text">สถานที่ผลิต : {{ l.list.Addr }}</p>
            <p class="card-text">Newcode : {{ l.list.Newcode }}</p>
          </td>
          <td :style="l.bg" v-else> ไม่พบข้อมูล</td>
          <!-- <td :style="l.bg">
            <i class="fa fa-circle" :style="l.icon" aria-hidden="true"></i>
          </td> -->
        </tr>
      </tbody>
    </table>
    <!-- <div v-if="status" >
<h3 style="text-align:center">กรุณารอสักครู่ ระบบกำลังโหลดข้อมูล</h3>
      </div> -->
  </div>
</template>

<script>
import readXlsxFile from "read-excel-file";
// import moment from 'moment'
import axios from "axios";
import ProductsService from '../services/ProductsService.js'
import FDATypesService from '../services/FDATypesService'

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
    };
  },
  methods: {
    checkfdamatch(name,name_real) {
      this.matchname = ''
      this.statusname = 0
          this.colorname = "background-color:#f9bdbb"
       this.matchname = ''
      axios.get('http://127.0.0.1:5000/matchname?name=' + name+'&&name_real=' + name_real).then((res) => {
        // console.log(res.data);
        this.matchname = res.data
        this.matchnamesum = this.matchname.replaceAll('red','black')
        if(this.matchname.includes('red')){
          this.statusname = 1
          this.colorname = "background-color:#a3e9a4"
        }


      });
    },
    checkcategorymatch(category,category_real) {
      // console.log(category_real);
      // console.log(category);
       this.matchcategory = ''
       this.statuscat = 0
          this.colorcat = "background-color:#f9bdbb"
          
          if (category_real) {
      //  console.log('http://127.0.0.1:5000/matchcategory?category=' + category+'&&category_real=' + category_real);
      axios.get('http://127.0.0.1:5000/matchcategory?category=' + category+'&&category_real=' + category_real).then((res) => {
        // console.log(res.data);
        this.matchcategory = res.data
        // console.log(this.matchcategory.includes('red'));
        if(this.matchcategory.includes('red')){
          this.statuscat = 1
          this.colorcat = "background-color:#a3e9a4"
        }
      
      });
    }
    },
    cut(word) {
      var wo = word.toString()
      // wo = wo.replaceAll(' ', ' | ')
      return wo
    },
    async gettokenize(words,namereal_result) {
      // console.log(words);
      // console.log(namereal_result);
      axios.get('http://127.0.0.1:5000/worktoken?namereal_result=' + namereal_result+'&&text='+words).then((res) => {
        // console.log(res.data);
        this.tokenize = res.data
      });
    },
    getimagefile(id) {
      this.imagelists = ''
      axios.get('http://127.0.0.1:5000/base64?id=' + id).then((res) => {
        // console.log(res.data);
        this.imagelists = 'data:image/jpeg;base64,'+res.data
      });
      
      // axios.get('http://localhost:8081/getimage?path=' + folder).then((res) => {
      //   // console.log(res.data);
      //   for (let im = 0; im < res.data.length; im++) {
      //     axios.get('http://localhost:8081/img?name=' + res.data[im]).then((res) => {
      //       // console.log(res.data.base64);
      //       this.imagelists.push(res.data.base64)

      //     });

      //   }
        // console.log(this.imagelists);
        return this.imagelists
      // })
    },
    downloadHtml() {
      let url = this.urlInput;
      fetch(url)
        .then((res) => res.text())
        .then((html) => this.downloadAsFile("report.html", html));
    },
    downloadAsFile(name, text) {
      const link = this.createDownloadableLink(name, text);
      const clickEvent = new MouseEvent('click');
      link.dispatchEvent(clickEvent);
    },
    createDownloadableLink(fileName, content) {
      let link = document.createElement("a");
      link.download = fileName;
      link.href = `data:application/octet-stream,${content}`;
      return link;
    },
    //     search(){
    //       this.list = []
    //       MenuService.getproduct(this.url).then().then((res)=>{
    //         console.log(res.data);

    //         var fdalist = []
    //         var detail = res.data
    //         // var detail = 'ข้อมูลจำเพาะของสินค้าหมวดหมู่Shopeeกลุ่มผลิตภัณฑ์เพื่อสุขภาพอาหารเสริมเพื่อความงามผิวยี่ห้อGlobal White(โกลบอลไวท์)หน้าที่ของอาหารเสริมสำหรับความงามคอลลาเจน, ผม ผิว และเล็บหมายเลขใบอนุญาต/อย.70-1-27160-5-0268จำนวนสินค้า258ส่งจากจังหวัดปทุมธานีรายละเอียดสินค้าหมายเลขใบอนุญาต/อย.🌼70-1-27160-5-0268อายุการเก็บรักษา 24 เดือน'
    //             var fda = this.findfda(detail)

    //             fdalist.push({
    //               detail: detail,
    //               fda: fda
    //             })
    //             for (let f = 0; f < fdalist.length; f++) {

    // const url = "https://tawaiforhealth.org/api/oryor/check-product";
    // const data = { "number_src": fdalist[f].fda };

    // const options = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    //   body: JSON.stringify(data),
    // };

    // fetch(url, options)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data);
    //     if (data.message) {
    //       fdalist[f].status = 0
    //       fdalist[f].list = []
    //       fdalist[f].bg = 'background-color:#f9bdbb'
    //     } else {
    //       fdalist[f].list = data
    //       fdalist[f].status = 1
    //       fdalist[f].bg = 'background-color:#a3e9a4'
    //       // console.log(data.STATUS_ID.includes(7))
    //       if (data.cncnm == "คงอยู่") {
    //       fdalist[f].icon = 'color: green'

    //       }else{
    //       fdalist[f].icon = 'color: red'
    //       fdalist[f].bg = 'background-color:#f9bdbb'
    //       }
    //     }

    //     // console.log(f+1, fdalist.length);
    //     if (f+1 == fdalist.length) {
    //  console.log(fdalist); 
    //  this.list = fdalist

    // }
    //   });


    // }
    //       })
    //     },
    search() {
      this.statusname=0,
      this.statuscat=0,
      this.statusfda=0,
      this.colorname='background-color:#f9bdbb',
      this.colorfda='background-color:#f9bdbb',
      this.colorcat='background-color:#f9bdbb',
      this.list = []
      var data = {
        url: this.url
      }
      ProductsService.findproduct(data).then(async (res) => {
        // console.log();
        if (res.data[0].content == '' || res.data.length == 0) {
          alert('ไม่พบข้อมูลในระบบ')
        } else {
          // console.log(res.data[0].content);
          // console.log(this.tokenize);
          this.getimagefile(res.data[0].id)
          var detail = res.data[0].content
          // var detail = 'ข้อมูลจำเพาะของสินค้าหมวดหมู่Shopeeกลุ่มผลิตภัณฑ์เพื่อสุขภาพอาหารเสริมเพื่อความงามผิวยี่ห้อGlobal White(โกลบอลไวท์)หน้าที่ของอาหารเสริมสำหรับความงามคอลลาเจน, ผม ผิว และเล็บหมายเลขใบอนุญาต/อย.70-1-27160-5-0268จำนวนสินค้า258ส่งจากจังหวัดปทุมธานีรายละเอียดสินค้าหมายเลขใบอนุญาต/อย.🌼70-1-27160-5-0268อายุการเก็บรักษา 24 เดือน'
          var fda = res.data[0].fda
          // console.log(fda);
          var fdalist = []
          // console.log(res.data[0]);
// if (fda.length != 12) {
//   alert('หมายเลขใบอนุญาตไม่ถูกต้อง')
// }else{
          fdalist.push({
            name: res.data[0].name,
            detail: detail,
            fda: fda,
            cat_name:res.data[0].cat_name
          })
          for (let f = 0; f < fdalist.length; f++) {

            const url = "https://tawaiforhealth.org/api/oryor/check-product";
            const data = { "number_src": fdalist[f].fda };
// console.log(data);
            const options = {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
              body: JSON.stringify(data),
            };

            fetch(url, options)
              .then((response) => response.json())
              .then((data) => {
                // console.log(data);
                // productha
                // console.log(data.message);
                if (data.message) {
                  data.produceng = ''
                  data.productha = ''
                  data.typepro = ''
                }
                if (data.length > 1) {
                  alert('ไม่พบเลขอย.ในเว็บไซต์ของผลิตภัณฑ์นี้')
                }
                  this.checkfdamatch(fdalist[f].name,data.productha+data.produceng)

                // console.log(fdalist[f].detail);
                var cat = this.findcategory(fdalist[f].detail)
                // console.log(cat);
                var fdatype = this.fdatype(data.typepro)
                fdatype = fdatype.replaceAll(' ','')
                // console.log(fdatype);    
                var name = data.productha.replaceAll('ผลิตภัณฑ์','')
                this.type = fdatype
                // console.log(this.type);
                // console.log(data.typepro);
                if (this.type == '') {
                  if (data.typepro) {
                    this.type = data.typepro
                    fdatype = data.typepro
                  }
                }
                // console.log(fdatype);
                FDATypesService.getfdatypes(fdatype).then(()=>{
                  // console.log(res.data);
                  if (res.data.length == 0) {
                    var cattype = {
                      name:fdatype
                    }
                    FDATypesService.createfdatype(cattype).then(()=>{
                      // console.log(res.data);
                    })
                  }
                })
                this.checkcategorymatch(cat,fdatype)
                this.gettokenize(res.data[0].content,fdatype+name+data.produceng)
                if (!data.lcnno) {
                  fdalist[f].status = 0
                  fdalist[f].list = []
                  fdalist[f].bg = 'background-color:#f9bdbb'
                } else {
                  fdalist[f].list = data
                  fdalist[f].status = 1
                  fdalist[f].bg = 'background-color:#a3e9a4'
                  // console.log(data.STATUS_ID.includes(7))
                  if (data.cncnm == "คงอยู่") {
                    this.statusfda = 1
                    this.colorfda = "background-color:#a3e9a4"
                    fdalist[f].icon = 'color: green'

                  } else {
                    fdalist[f].icon = 'color: red'
                    fdalist[f].bg = 'background-color:#f9bdbb'
                  }
                }

                // console.log(f+1, fdalist.length);
                if (f + 1 == fdalist.length) {
                  // console.log(fdalist);
                  this.list = fdalist

                
                }
                
                // console.log(this.list);
              });


          }
        }
      // }
      })
    },
    onChangeA1(event) {
      this.list = []
      this.file = event.target.files ? event.target.files[0] : null;
      // var c = '☕️[พร้อมส่ง] Cal s Coffee by Primaya กาแฟแคลเอส โกโก้แคลเอส ชาไทยแคลเอส 1 กล่อง 10 ซองน้ำหนักรักษาสัดส่วนหมายเลขอย./ใบอนุญาต1310176020080ลักษณะผงจำนวนสินค้า392ส่งจากเขตดอนเมือง, จังหวัดกรุงเทพมหานคร'
      // console.log(this.findfda(c))
      var fdalist = []
      if (this.file) {
        this.status = true
        readXlsxFile(event.target.files[0]).then(async (excel) => {
          // console.log(excel);
          for (let i = 1; i < excel.length; i++) {
            // console.log(data[i][0]);
            var detail = excel[i][0]
            var fda = this.findfda(detail)

            fdalist.push({
              detail: detail,
              fda: fda
            })
            if (i + 1 == excel.length) {
              // console.log(fdalist);
              for (let f = 0; f < fdalist.length; f++) {

                const url = "https://tawaiforhealth.org/api/oryor/check-product";
                const data = { "number_src": fdalist[f].fda };

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
                  .then((data) => {
                    // console.log(data);
                    if (data.message) {
                      fdalist[f].status = 0
                      fdalist[f].list = []
                      fdalist[f].bg = 'background-color:#f9bdbb'
                    } else {
                      fdalist[f].list = data
                      fdalist[f].status = 1
                      fdalist[f].bg = 'background-color:#a3e9a4'
                      // console.log(data.STATUS_ID.includes(7))
                      if (data.cncnm == "คงอยู่") {
                        fdalist[f].icon = 'color: green'

                      } else {
                        fdalist[f].icon = 'color: red'
                        fdalist[f].bg = 'background-color:#f9bdbb'
                      }
                    }

                    // console.log(f+1, fdalist.length);
                    if (f + 1 == fdalist.length) {
                      // console.log(fdalist);
                      this.list = fdalist
                      this.status = false
                    }
                  });


              }
            }
          }
        });
      }
      this.file = ''
    },
    findcategory(data){
      // console.log(data);
      var text = ['หมวดหมู่']
      var end = ['ยี่ห้อ','ประเทศ']
      var findfda = data
      for (let t = 0; t < end.length; t++) {
        if (findfda.indexOf(end[t]) != -1) {
          findfda = findfda.substring(findfda.indexOf(text[0]),findfda.indexOf(end[t]));    
        }

      }
      // if (findfda == 'อาหาร') {
      //   findfda = findfda+ findfda+'เสริม'
      // }
      // console.log(findfda);
      return findfda
    },
    fdatype(data){
      // console.log(data);
      if (data) {
        var text = ['(']
      var findfda = data
      for (let t = 0; t < text.length; t++) {
        findfda = findfda.substring(findfda.indexOf(0),findfda.indexOf(text[0]));

      }
      }else{
        findfda = ''
      }
      return findfda
    },
    findfda(data) {
      var text = ['หมายเลขใบอนุญาต/อย.']
      var end = ['จำนวน']
      var findfda = data
      for (let t = 0; t < text.length; t++) {
        findfda = findfda.substring(findfda.indexOf(text[t]),findfda.indexOf(end[0]));

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
    loaddata(fda) {
      const url = "https://tawaiforhealth.org/api/oryor/check-product";
      const data = { "number_src": fda };

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          return data
        });
    },
    async checkfda(fda) {
      window.open(
        "/detail/" + fda,
        "_blank" // <- This is what makes it open in a new window.
      );
    }
  },
  mounted() {
    // console.log(this.findcategory('ข้อมูลจำเพาะของสินค้าหมวดหมู่Shopeeอาหารและเครื่องดื่มเครื่องดื่มกาแฟยี่ห้อBe Easy(บีอีซี่)เครื่องดื่ม3-in-1 และกาแฟสำเร็จรูปอายุการเก็บรักษา24 เดือนน้ำหนัก150gวันหมดอายุ08-12-2023หมายเลขใบอนุญาต/อย.13-2-03657-2-0054จำนวนสินค้า95ส่งจากจังหวัดปทุมธานีรายละเอียดสินค้าBe Easy ที่สุดของกาแฟควบคุมน้ำหนัก เพียง 70 Kcal - กระชับสัดส่วน ไขมันส่วนเกิน - ดีท๊อกซ์ของเสียออกจากร่ายกาย - ผิวพรรณเปล่งปลั่ง กระจ่างใส - บำรุงร่างกาย บำรุงวมอง มีของพร้อมส่งตลอด สั่งได้เลยจ้า อย. เลขที่ 13-2-03657-2-0054 กาแฟบีอีซี่ กลิ่นหอม รสชาติ กลมกล่อม “คาปูชิโน่”นุ่มๆละมุนลิ้น 1 ห่อ มี 10 ซอง ให้ตายเถอะ! กาแฟบ้าอะไรยิ่งดื่มยิ่งหุ่นดี! น้ำหนักลด เอวนี่หดลงทุกวันๆ! โครตหอม โครตอร่อย โครตกลมกล่อม ลองสิแล้วคุณจะติดใจ! #กาแฟบีอีซี่ #กาแฟนางบี #Beeasycappuccino'))
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
</style>
