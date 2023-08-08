<template>
  <div class="container">
  <div class=" row mt-3">
    <div class="col-md-1">
    </div>
     <div class="card col-md-5">
<TypeOneGraph/>
    </div>
    <div class="col-md-1">
    </div>
    <div class="card col-md-5">
<TypeTwoGraph/>
    </div>
  </div>
</div>
</template>

<script>
import TypeOneGraph from './TypeOneGraph.vue'
import TypeTwoGraph from './TypeTwoGraph.vue'

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  components:{
    TypeOneGraph,
    TypeTwoGraph
  },
  data() {
    return {
     
    };
  },
  mounted() {
  
  },
  methods: {
    
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
