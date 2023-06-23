<template>
  <div class="hello container mt-5">
    <div class="row">
      <div class="col-md-12" style="text-align:center" v-if="registration_status == 'ดำเนินกิจการ'">โรงงานอุตสาหกรรมดำเนินการอยู่ ณ วันที่ {{ date }} จำนวน {{list.length}} ราย</div>
      <div class="col-md-12" style="text-align:center" v-else>โรงงานอุตสาหกรรมที่ปิดกิจการ ณ วันที่ {{ date }} จำนวน {{list.length}} ราย</div>

      <div class="col-6">
        <label for="exampleInputEmail1" class="form-label"
          >ชื่อผู้ประกอบอุตสาหกรรม</label
        >
        <input
          v-model="excise_name"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="col-6">
        <label for="exampleInputEmail1" class="form-label">โดย</label>
        <input
          v-model="excise_by"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="col-6"></div>
       <div class="col-6 mt-3" style="text-align: right">
          <div class="form-check">
            <input
            v-model="registration_status"
            @change="search()"
              class="form-check-input"
              id="true"
              value="ดำเนินกิจการ"
              type="radio"
              name="true"
            />
            <label class="form-check-label" for="true">ดำเนินกิจการ</label>
          </div>&nbsp;&nbsp;
           <div class="form-check">
            <input
            v-model="registration_status"
            @change="search()"
              class="form-check-input"
              id="false"
              value="ปิดกิจการ"
              type="radio"
              name="false"
            />
            <label class="form-check-label" for="false">ปิดกิจการ</label>
          </div>
        </div>
      <div class="col-12" align="center">
        <button
          @click="search()"
          type="submit"
          class="btn btn-primary"
          style="margin-top: 10px; text-align: right"
        >
          ค้นหา
        </button>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-9"></div>
      <div class="col-3" align="right">
         <div class="form-group row">
    <label for="inputEmail3" class="col-sm-6 col-form-label">Order By</label>
    <div class="col-sm-6">
      <select class="custom-select" id="inputGroupSelect01" v-model="sortid"  @change="orderby">
    <option value="0">อำเภอ</option>
    <option value="1">ตำบล</option>
    <option value="2">เลขทะเบียนสรรพสามิต</option>
  </select>
    </div>
  </div>
      </div> -->
      <div class="col-12 mt-3">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" class="table-secondary">ลำดับที่</th>
              <th scope="col" class="table-secondary">เลขทะเบียนสรรพสามิต</th>
              <th scope="col" class="table-secondary">รหัสโรงอุตสาหกรรม</th>
              <th scope="col" class="table-secondary">
                ชื่อผู้ประกอบอุตสาหกรรม
              </th>
              <th scope="col" class="table-secondary">โดย</th>
              <th scope="col" class="table-secondary">ชื่อโรงอุตสาหกรรม</th>
              <th scope="col" class="table-secondary">
                เลขที่ตั้งโรงอุตสาหกรรม
              </th>
              <th scope="col" class="table-secondary">หมู่ที่</th>
              <th scope="col" class="table-secondary">ตำบล</th>
              <th scope="col" class="table-secondary">อำเภอ</th>
              <th scope="col" class="table-secondary">จังหวัด</th>
              <th scope="col" class="table-secondary">รหัสไปรษณีย์</th>
              <th scope="col" class="table-secondary">วันที่จดทะเบียน</th>
              <th scope="col" class="table-secondary">วันที่สถานะ</th>
              <th scope="col" class="table-secondary">สถานะทะเบียน</th>
              <th scope="col" class="table-secondary">Latitude</th>
              <th scope="col" class="table-secondary">Longitude</th>
              <th scope="col" class="table-secondary">พิกัดที่ตั้ง</th>
              <th scope="col" class="table-secondary">สถานะพิกัด</th>
              <th scope="col" class="table-secondary">รูปภาพโรงงาน</th>
              <!-- <th scope="col">เลขที่ตั้งโรงอุตสาหกรรม</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, i) in list" :key="i+1">
              <th>
                <a
                target="_blank"
                  :href="'/edit/' + l.id"
                  style="color: black; text-decoration: none"
                  ><svg
                    width="10px"
                    height="10px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                    <path
                      d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
                    />
                  </svg>
                  {{ i + 1 }}
                </a>
              </th>
              <td scope="row">
                <a
                  :href="'/map/' + l.excise_no + '/map'"
                  target="_blank"
                  style="color: black; text-decoration: none"
                >
                  {{ l.excise_id }}
                </a>
              </td>
              <td scope="row">{{ l.excise_no }}</td>
              <td scope="row">{{ l.excise_name }}</td>
              <td scope="row">{{ l.excise_by }}</td>
              <td scope="row">{{ l.industrial_name }}</td>
              <td scope="row">{{ l.industrial_no }}</td>
              <td scope="row">{{ l.industrial_moo }}</td>
              <td scope="row">{{ l.industrial_subdistrict }}</td>
              <td scope="row">{{ l.industrial_district }}</td>
              <td scope="row">{{ l.industrial_province }}</td>
              <td scope="row">{{ l.industrial_zipcode }}</td>
              <td scope="row">{{ convertdatetothai(l.registration_date) }}</td>
              <td scope="row">{{ convertdatetothai(l.status_date) }}</td>
              <td scope="row">{{ l.registration_status }}</td>
              <td scope="row">{{ l.latitude }}</td>
              <td scope="row">{{ l.longitude }}</td>
              <td scope="row"> <a
                  :href="'//' + l.fac_url"
                  target="_blank"
                  style="color: black; text-decoration: none"
                >
                  {{ l.fac_url }}
                </a></td>
              <td scope="row" v-if="l.coordinate_status == 0">ยังไม่ยืนยัน</td>
              <td scope="row" v-if="l.coordinate_status == 1">ยืนยันแล้ว</td>
              <td scope="row"><img width="100px" :src="l.image" alt="" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <input id="file" type="file" accept="image/*" @change="onFileChange" />
    <img v-if="itemPreviewImage" :src="itemPreviewImage" /> -->
  </div>
</template>

<script>
import DetailExciseService from "../services/DetailExciseService.js";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      list: [],
      itemPreviewImage: "",
      id: "",
      item: [],
      img: "",
      image: "",
      excise_name: "",
      excise_by: "",
      sortid:0,
      date:'',
      countall:0,
      registration_status:"ดำเนินกิจการ"
    };
  },
  props: {
    msg: String,
  },
  computed: {
    dataUrl() {
      return (
        "data:image/jpeg;base64," +
        window.btoa(
          new Uint8Array(this.info.image).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )
      );
    },
  },
  mounted() {
    const date = new Date();
    this.date = date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    this.loaddata();
  },
  methods: {
    orderby(event){
this.sortid = event.target.value
DetailExciseService.getDetailExcisesByname('','',this.sortid,this.registration_status)
        .then((res) => {
          // console.log(res.data);
          this.list = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    search() {
      // console.log(this.excise_name);
      // console.log(this.excise_by);
      DetailExciseService.getDetailExcisesByname(
        this.excise_name,
        this.excise_by,
        '',
        this.registration_status
      )
        .then((res) => {
          // console.log(res.data);
          this.list = res.data
        //  for (let l = 0; l < res.data.length; l++) {
        //     if (res.data[l].registration_status != "ปิดกิจการ") {
        //       this.list.push(res.data[l])
        //     }        
        //   }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getid(id) {
      this.id = id;
    },
    loaddata() {
      DetailExciseService.getDetailExcisesByname('','',this.sortid,this.registration_status)
        .then((res) => {
          // console.log(res.data);
          for (let l = 0; l < res.data.length; l++) {
            // console.log(res.data[l].registration_status);
            if (res.data[l].registration_status != "ปิดกิจการ") {
              this.list.push(res.data[l])
            }        
          }
          this.countall = this.list.length
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getTypebase64(data) {
      return data.substring("data:image/".length, data.indexOf(";base64"));
    },
    onFileChange(evt) {
      const files = evt.target.files || evt.dataTransfer.files;
      // const selectedImage = evt.target.files[0]; // get first file
      // this.createBase64Image(selectedImage);
      if (!files.length) return;
      this.createImage(files[0]);
      // this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.image = evt.target.result;
        this.uploadImage();
      };
      reader.readAsDataURL(fileObject);
    },
    createImage(file) {
      const reader = new FileReader();

      reader.onload = (evt) => {
        this.itemPreviewImage = evt.target.result;
        this.item.image = evt.target.result;
        // var buf = Buffer.from(this.item.image, "base64"); // Ta-da
        // console.log(buf);
        var blob = window.URL.createObjectURL(
          new Blob([this.item.image], { type: "image/jpeg" })
        );
        console.log(blob);
        // console.log(this.item.image);
        var img = {
          image: this.item.image,
        };
        console.log(img);
        DetailExciseService.updateImageDetailExcise(this.id, img)
          .then((res) => {
            console.log(res.data);
            this.loaddata();
          })
          .catch((err) => {
            console.log(err);
          });
      };

      reader.readAsDataURL(file);
    },
    uploadImage() {
      const { image } = this;
      console.log(image);
      axios
        .post("http://127.0.0.1:8080/api/upload", { image })
        .then((response) => {
          this.remoteUrl = response.data.url;
          console.log(this.remoteUrl);
        })
        .catch((err) => {
          return new Error(err.message);
        });
    },
    convertdatetothai(datetimes) {
      if (datetimes) {
        var d = new Date(datetimes);
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var yy = d.getFullYear();

        var myDateString = dd + "/" + mm + "/" + yy; //(US)
        // console.log(myDateString);
        return myDateString;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.form-check {
      display: inline;
}
</style>
