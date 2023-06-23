<template>
  <div class="hello mt-5">
    <h3 class="card-title" style="text-align:center">เลขที่ใบอนุญาต {{ fda }}</h3><br />
    <div class="card" style="width: 80%" v-if="status">
      <div class="card-body">
        <p class="card-text">สถานะ : {{ data.cncnm }}</p>
        <p class="card-text">ประเภทผลิตภัณฑ์ : {{ data.typepro }}</p>
        <p class="card-text">ใบสำคัญ/เลขที่อนุญาต : {{ data.lcnno }}</p>
        <p class="card-text">ชื่อผลิตภัณฑ์ (TH) : {{ data.productha }}</p>
        <p class="card-text">ชื่อผลิตภัณฑ์ (EN) : {{ data.produceng }}</p>
        <p class="card-text">ชื่อผู้รับอนุญาต : {{ data.licen }}</p>
        <p class="card-text">สถานที่ผลิต : {{ data.Addr }}</p>
        <p class="card-text">Newcode : {{ data.Newcode }}</p>
        <a :href="data.URLs" target="_blank"><button type="button" class="btn btn-primary">ข้อมูลเพิ่มเติม</button></a>
      </div>
    </div>
    <div class="card" style="width: 80%" v-else>
      <div class="card-body">
        <div v-if="statusnot">
          <h5 class="card-title" style="text-align:center">ไม่พบข้อมูลเลขที่ใบอนุญาต {{ fda }}</h5><br />
        </div>
        <div v-else>
          <h5 class="card-title" style="text-align:center">กำลังโหลดข้อมูล</h5><br />
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  data() {
    return {
      data: [],
      fda: '',
      status:false,
      statusnot:false
    };
  },
  props: {
    msg: String,
  },
  computed: {
  },
  mounted() {
    this.fda = this.$route.params.fda;
    this.loaddata();
  },
  methods: {
    loaddata() {
      const url = "https://tawaiforhealth.org/api/oryor/check-product";
      const data = { "number_src": this.fda };

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
          console.log(data);
          if (data.message) {
            this.statusnot = true
          } else {
            this.data = data
            this.status = true
          }
        });
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
p{
  font-size: 14px;
}</style>
