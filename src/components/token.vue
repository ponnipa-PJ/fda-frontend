<template>
  <div class="container mt-5">
    
    <div>
        <div class="form-group mt-5">
          <label for="exampleFormControlTextarea1">ข้อความ</label>
          <textarea
            v-model="data.text"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button @click="search()" type="submit" class="mb-3 btn btn-success">
          ตัดคำ
        </button>
      </div>
      <div>
        <div class="card" v-if="token.length > 0">
         
         <div class="card-boby mt-3 mb-3" >{{token}}</div> 
      </div>
  </div>
  </div>
</template>

<script>

import LinkService from "../services/LinkService";
import axios from "axios";

export default {
  name: "App",
  components: {},
  data() {
    return {
      data:{},
      token:[]
    };
  },
  methods: {
    search(){
       axios
              .get(LinkService.getpythonlink() + "/token?text="+ this.data.text)
              .then(async (res) => {
                // console.log(res.data);
                this.token = res.data
              })
    }
  },
  mounted() {
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
}</style>
