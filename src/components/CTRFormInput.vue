<template>
  <div>
    <v-hover v-slot="{hover}">
      <div class="pa-2 mb-2 d-flex align-center wrapper" :class="item.error ? 'error__card': ''">
        <div class="px-3 d-flex justify-space-between align-center" style="width: 100%">
          <div>

            <div>
              <span class="remain text-uppercase">Position {{ index + 1 }}</span>
            </div>
          </div>
          <div class="d-flex align-center">
            <div class="mr-2" :class="item.value ? 'tooltip' : ''">
              <v-text-field @change="updateValue" @input="callInput" :disabled="item.disabled"
                            hide-spin-buttons hide-details style="width: 45px;" outlined :value="formatValue(item.value)"
                            type="number">

              </v-text-field>
<!--              <div v-if="item.blur && item.value" @click="callFocus" class="text-center mx-auto total__percentage">-->
<!--                {{formatValue(item.value)}}-->
<!--              </div>-->
              <span class="tooltip__text black--text">{{item.value}}</span>
            </div>
            <div>
              <span class="remain">%</span>
            </div>
            <v-fade-transition>
              <div class="deleteBtn d-flex justify-center align-center ml-2" v-if="basketLength > 6 && hover" @click="$emit('delete')">
                <v-icon size="15" color="red">mdi-delete-outline</v-icon>
              </div>
            </v-fade-transition>
          </div>
        </div>
      </div>
    </v-hover>
    <div v-if="item.error" class="px-2 mt-n2">
      <v-icon size="15" color="red">mdi-alert-circle-outline</v-icon>
      <span class="error--text err ml-1">{{ item.error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CTRInputForm",
  data() {
    return {
      number: '',
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    },
    basketLength: {
      type: Number,
    },
  },
  methods: {
    updateValue(number) {
      this.$emit('value', number)
    },
    callInput(number){
      this.$emit('input', number)
    },
    callBlur(){
      this.$emit('blur')
    },
    callFocus(){
      this.$emit('focus')
    },
    formatValue(num){
      let text;
      let displayText;
      text = num.toString().split(".")
      if(text[0].length > 1 && !text[0].includes('-')  && text[1]){
        displayText = text[0] + '.' + text[1].substring(0, 1)
      }else if(text[0].length <= 1 && text[1]) {
        displayText = text[0] + '.' + text[1].substring(0, 2)
      } else if(text[0].includes('-')  && text[1]) {
        displayText = text[0] + '.' + text[1].substring(0, 2)
      } else {
        displayText = text[0]
      }
      return displayText
    }
  }

}
</script>

<style scoped lang="scss">
.wrapper{
  background-color: white;
  border-radius: 10px;
  height: 52px
}
::v-deep {
  .v-input__slot {
    max-height: 25px !important;
    min-height: 25px !important;
    border-radius: 10px !important;
    background: #F4F5F5 !important;
    padding: 1px 8px !important;

  }

  .v-text-field__details {
    display: none;
  }
  .v-text-field input{
    font-family: DM Sans !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    line-height: 24px !important;

    color: #475661 !important;

  }

}

.remain {
  font-family: DM Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;

  color: #475661;
}
.deleteBtn {
  background-color: #F9F1EF;
  border-radius: 50%;
  height: 28px;
  width: 28px;
  cursor: pointer;
}
.err{
  font-family: DM Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;
}
.error__card{
  border: red 1px solid;
}
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltip__text {
  visibility: hidden;
  background-color: white;
  border-radius: 10px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  border: ghostwhite 3px solid;
  height: 30px;
  padding: 2px;
  width: 120px;
  top: 100%;
  left: 50%;
  margin-left: -60px;
  font-family: DM Sans !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 14px !important;
  line-height: 24px !important;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltip__text {
  visibility: visible;
}
.total__percentage{
  border-radius: 10px;
  background-color: #F4F5F5 !important;
  width: 50px;
  border:1px solid rgb(192, 192, 192);
  font-family: DM Sans !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 14px !important;
  line-height: 24px !important;

}
input.showText{
  font-family: 'IBM Plex Serif' !important;
  font-style: normal;
  font-weight: 600;
  font-size: 41px;
  line-height: 53px;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  border: none!important;
  &:focus{
    border: 0!important;
    outline: none!important;
  }
  &:active{
    border: 0!important;
    outline: none!important;
  }
}

</style>