<template>
  <div class="container mt-5">
    <div style="text-align:right"> <button @click="getid(0)"
          data-bs-toggle="modal"
          data-bs-target="#AddProduct"
           type="submit" class="mb-3 btn btn-success">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button></div>
      <table class="table" v-if="list.length > 0" width="100%">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">หมวด</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in list" :key="i">
            <td :style="l.bg">{{ i + 1 }}</td>
            <td :style="l.bg">{{ l.name }}</td>
            <td>
            <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#AddProduct"
              >
                <i class="fa fa-edit"></i></button
            ></a>&nbsp;
            <a @click="getid(l.id)">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#DeleteCategory"
              >
                <i class="fa fa-trash"></i></button
            ></a>
          </td>
          </tr>
        </tbody>
      </table>
      <div v-if="list.length == 0" class="mt-5">
<h3 style="text-align:center">ไม่พบข้อมูล</h3>
      </div>
  <!-- Modal -->
  <div
      class="modal fade"
      id="AddProduct"
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
                  <label>หมวด</label>
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
      id="DeleteCategory"
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
            <button type="button" class="btn btn-success" @click="deletecategory()">
              ยืนยัน
            </button>
            <button
            id="closeddeletecategory"
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

import CategoryService from '../services/CategoryService'

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
      category:[]
    };
  },
  methods: {
    deletecategory(){
      CategoryService.deletecategory(this.pro_id).then((res)=>{
        console.log(res.data);
        document.getElementById("closeddeletecategory").click();
        this.getcategory();
        alert('บันทึกสำเร็จ')
      })
    },
    save() {
      console.log(this.data);
      if (this.data.name == null || this.data.cat_id == "") {
        alert("กรุณากรอกชื่อหมวด");
      } else {
        var prodata = {
          name: this.data.name,
          status:1,
        };
        console.log(prodata);
        if (this.pro_id == 0) {
          CategoryService.createcategory(prodata).then(() => {
            document.getElementById("closedcategory").click();
            this.getcategory();
            alert('บันทึกสำเร็จ')
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        } else {
          CategoryService.updatecategory(this.pro_id, prodata).then(() => {
            // console.log(res.data);
            document.getElementById("closedcategory").click();
            this.getcategory();
            alert('บันทึกสำเร็จ')
            //       setTimeout(function () {
            //   location.reload();
            // }, 500);
            // window.scrollTo(0, 0);
          });
        }
      }
    },
    getcategory(){
      CategoryService.getcategorys(1).then((res)=>{
        this.list = res.data
      })
    },
    getid(id) {
      this.pro_id = id;
      if (this.pro_id != 0) {
        this.title = "แก้ไขข้อมูลหมวดสินค้า";
        // console.log(this.user_id);
        CategoryService.getcategory(this.pro_id).then((res) => {
          // console.log(res.data);
          this.data = res.data;
        });
      } else {
        this.title = "เพิ่มข้อมูลหมวดสินค้า";
        this.data = [];
      }
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
}</style>
