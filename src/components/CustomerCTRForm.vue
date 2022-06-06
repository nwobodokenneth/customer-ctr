<template>
  <div>
    <v-btn @click="showModal">
      Create Form
    </v-btn>
    <CTRModal v-model="open" @closeModal="open = false" :open="open"/>
  </div>
</template>

<script>
import CTRModal from "@/components/CTRModal";
export default {
  name: "CustomerCTRForm",
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

<style scoped>

</style>