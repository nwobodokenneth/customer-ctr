<template>
  <div class="d-flex justify-center create">
    <v-btn @click="showModal">
      Create Custom CTR
    </v-btn>
    <CTRModal v-model="open" @closeModal="open = false"/>
  </div>
</template>

<script>
import CTRModal from "@/components/CTRModal";
export default {
  name: "CustomCTRForm",
  components: {CTRModal},
  data(){
    return{
      open: false
    }
  },
  methods:{
    showModal(){
      this.open = true
    }
  }
}
</script>

<style scoped lang="scss">
.create {
  margin: 10rem auto;
@media (min-width: 768px) {
  align-items: center;
  justify-content: center;
  max-width: 400px;
}
}

</style>