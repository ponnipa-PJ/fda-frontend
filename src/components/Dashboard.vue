<template>
  <div class="container-fluid row mt-3" style="padding: 30px">
     <div class="col-md-6">
<TypeOneGraph/>
    </div>
  </div>
</template>

<script>
import TypeOneGraph from './TypeOneGraph.vue'

export default {
  name: "Nav",
  props: {
    msg: String,
  },
  components:{
    TypeOneGraph,
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
