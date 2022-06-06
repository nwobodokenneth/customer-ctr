<template>
  <div>
    <div style="background-color: white; border-radius: 10px" class="pa-2 mb-2">
      <div class="px-3 d-flex justify-space-between">
        <div>
          <span class="remain text-uppercase">{{ title }}</span>
        </div>
        <div class="d-flex">
          <div class="mr-2">
            <v-text-field @input="updateValue" :disabled="disabled" hide-spin-buttons :min-height="20" style="width: 45px;" outlined v-model="number" type="number"></v-text-field>
          </div>
          <div>
            <span class="remain">%</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "CTRInputForm",
  data(){
    return{
      number:''
    }
  },
  props:{
    title: String,
    disabled: Boolean
  },
  methods:{
    updateValue(number){
      this.$emit('value', number)
    }
  }

}
</script>

<style scoped lang="scss">
::v-deep {
  .v-input__slot {
    min-height: 18px!important;
    border-radius: 10px!important;
  }
  .v-text-field__details{
    display: none;
  }

}
.remain{
  font-family: DM Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;

  color: #475661;
}
</style>