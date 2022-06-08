<template>
  <div>
    <v-btn @click="showModal">
      Create Form
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

<style scoped>

</style>