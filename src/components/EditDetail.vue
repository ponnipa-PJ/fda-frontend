<template>
  <div class="hello container mt-5">
    <h2>แก้ไขข้อมูล</h2>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"
        >เลขทะเบียนสรรพสามิต</label
      >
      <input
        v-model="data.excise_id"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"
        >รหัสโรงอุตสาหกรรม</label
      >
      <input
        v-model="data.excise_no"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"
        >ชื่อผู้ประกอบอุตสาหกรรม</label
      >
      <input
        v-model="data.excise_name"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">โดย</label>
      <input
        v-model="data.excise_by"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"
        >ชื่อโรงอุตสาหกรรม</label
      >
      <input
        v-model="data.industrial_name"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"
        >เลขที่ตั้งโรงอุตสาหกรรม</label
      >
      <input
        v-model="data.industrial_no"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">หมู่ที่</label>
      <input
        v-model="data.industrial_moo"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">ตำบล</label>
      <input
        v-model="data.industrial_subdistrict"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">อำเภอ</label>
      <input
        v-model="data.industrial_district"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">จังหวัด</label>
      <input
        v-model="data.industrial_province"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">รหัสไปรษณีย์</label>
      <input
        v-model="data.industrial_zipcode"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">วันที่จดทะเบียน</label>
      <input
        v-model="data.registration_date"
        type="date"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">วันที่สถานะ</label>
      <input
        v-model="data.status_date"
        type="date"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">สถานะทะเบียน</label>
      <select
        class="form-select form-select-sm"
        v-model="data.registration_status"
        aria-label=".form-select-sm example"
      >
      <!-- <option value="ขอเลิกกิจการ(ปกติ)">ขอเลิกกิจการ(ปกติ)</option>
        <option value="ขอใบแทนใบสรรพสามิต(ชำรุด)">
          ขอใบแทนใบสรรพสามิต(ชำรุด)
        </option>
        <option value="ขอใบแทนใบสรรพสามิต(สูญหาย)">
          ขอใบแทนใบสรรพสามิต(สูญหาย)
        </option>
        <option value="จดทะเบียนสรรพสามิตใหม่">จดทะเบียนสรรพสามิตใหม่</option>
        <option value="จดทะเบียนใหม่เนื่องจากโอนกิจการ(ปกติ)">
          จดทะเบียนใหม่เนื่องจากโอนกิจการ(ปกติ)
        </option>
        <option value="จดใหม่เนื่องจากการโอน (ปกติ)">
          จดใหม่เนื่องจากการโอน (ปกติ)
        </option>
        <option value="ยกเลิกเลขทะเบียนสรรพสามิต(กรณีการออกเลขทะเบียนมีปัญหา)">
          ยกเลิกเลขทะเบียนสรรพสามิต(กรณีการออกเลขทะเบียนมีปัญหา)
        </option>
        <option value="เปลี่ยนแปลงข้อมูลผู้ประกอบการ">
          เปลี่ยนแปลงข้อมูลผู้ประกอบการ
        </option>
        <option value="เปลี่ยนแปลงข้อมูลผู้ประกอบการ, สถานประกอบการ">
          เปลี่ยนแปลงข้อมูลผู้ประกอบการ, สถานประกอบการ
        </option>
        <option value="เปลี่ยนแปลงข้อมูลสถานประกอบการ">
          เปลี่ยนแปลงข้อมูลสถานประกอบการ
        </option> -->
        <option value="ดำเนินกิจการ">ดำเนินกิจการ</option>
        <option value="ปิดกิจการ">
          ปิดกิจการ
        </option>        
      </select>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Latitude</label>
      <input
        v-model="data.latitude"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Longitude</label>
      <input
        v-model="data.longitude"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">พิกัดที่ตั้ง</label>
      <input
        v-model="data.fac_url"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">สถานะพิกัด</label>
      <select
        class="form-select form-select-sm"
        v-model="data.coordinate_status"
        aria-label=".form-select-sm example"
      >
        <option value="0">ยังไม่ยืนยัน</option>
        <option value="1">ยืนยัน</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">รูปภาพโรงงาน </label>
      <input
        id="file"
        class="form-control"
        type="file"
        accept="image/*"
        @change="onFileChange"
      />
      <img
        width="50px"
        class="form-control"
        v-if="itemPreviewImage"
        :src="itemPreviewImage"
      />
    </div>

    <button @click="save()" type="submit" class="mb-3 btn btn-success">
      บันทึก
    </button>
  </div>
</template>

<script>
import DetailExciseService from "../services/DetailExciseService.js";

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
      data: [],
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
    this.id = this.$route.params.id;
    this.loaddata();
  },
  methods: {
    save() {
      var data = {
        excise_id: this.data.excise_id,
        excise_no: this.data.excise_no,
        excise_name: this.data.excise_name,
        excise_by: this.data.excise_by,
        industrial_name: this.data.industrial_name,
        industrial_no: this.data.industrial_no,
        industrial_moo: this.data.industrial_moo,
        industrial_subdistrict: this.data.industrial_subdistrict,
        industrial_district: this.data.industrial_district,
        industrial_province: this.data.industrial_province,
        industrial_zipcode: this.data.industrial_zipcode,
        registration_date: this.convertdateb2(this.data.registration_date),
        status_date: this.convertdateb2(this.data.status_date),
        registration_status: this.data.registration_status,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        coordinate_status: this.data.coordinate_status,
        image: this.itemPreviewImage,
        fac_url: this.data.fac_url
      };
      console.log(data);
      DetailExciseService.updateDetailExcise(this.id, data).then((res) => {
        console.log(res.data);
        alert('บันทึกสำเร็จ')
      });
    },
    convertdateb2(date) {
      var streetaddress = String(date);
      // console.log(streetaddress);
      var y = streetaddress.substring(0, streetaddress.indexOf("-"));
      var m = streetaddress.substring(7, streetaddress.indexOf("-"));
      m = m.substring(1, 3);
      var d = streetaddress.substring(8, 10);
      y = parseInt(y) + 543;
      var full = m + "/" + d + "/" + y;
      // console.log(d)
      // console.log(m)
      // console.log(y);
      // console.log(full);
      var timestamp = Date.parse(full);
      var dateObject = new Date(timestamp);
      dateObject.setDate(dateObject.getDate() + 1);
      // console.log(dateObject);
      // const result = dateObject.toLocaleDateString("en-EN");
      // console.log(result);
      return dateObject;
    },
    loaddata() {
      DetailExciseService.getDetailExcisesByID(this.id)
        .then((res) => {
          console.log(res.data);
          this.data = res.data;
          this.data.registration_date = this.convertdatetothai(
            this.data.registration_date
          );
          this.data.status_date = this.convertdatetothai(this.data.status_date);
          this.itemPreviewImage = this.data.image;
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
      };

      reader.readAsDataURL(file);
    },
    convertdatetothai(datetimes) {
      // console.log(datetimes);
      if (datetimes) {
        var d = new Date(datetimes);
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var yy = d.getFullYear();
        if (String(dd).length == 1) {
          dd = "0" + dd;
        }
        if (String(mm).length == 1) {
          mm = "0" + mm;
        }
        var myDateString = parseInt(yy - 543) + "-" + mm + "-" + dd; //(US)
        // console.log(myDateString);
        return String(myDateString);
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
</style>
