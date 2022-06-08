<template>
  <div>
    <v-dialog
        v-bind="{ ...$props, ...$attrs }"
        v-on="$listeners"
        max-width="450"
        transition="scale-transition"
        origin="center center"
        persistent>
      <v-card class="pa-5 rounded-lg" elevation="0">
        <div class="d-flex justify-space-between mb-5">
          <div>
            <h4 class="card-Title mb-n2">
              Custom CTR Values
            </h4>
            <span class="sub-head">The sum of all positions must be 100%</span>
          </div>
          <v-btn
              icon
              @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div>
          <div class="py-4 rounded color__card">
            <div class="px-8 d-flex justify-space-between">
              <div>
                <span class="remain">UNATTRIBUTED VALUE REMAINING</span>
              </div>
              <div class="d-flex">
                <div class="text-center mx-auto mr-2 total__percentage" @click="populateForm">
                  <span class="remain">{{ formatValue(total_percentage) }}</span>
                </div>
                <div>
                  <span class="remain">%</span>
                </div>
              </div>
            </div>
            <v-divider class="mt-3 mb-5"/>
            <div class="px-3 mb-2" v-for="(item, index) in formData" :key="item.id">
              <CTRFormInput
                  :index="index"
                  :basket-length="formData.length"
                  @input="onFieldInput($event, index, item)"
                  @value="updateForm($event, index, item)"
                  @delete="deleteItem(index)"
                  @blur="changeItem(true, item)"
                  @focus="changeItem(false, item)"
                  :item="item"/>
            </div>
            <div class="px-3 mt-5">
              <v-btn depressed @click="addNewField" color="white" block class="text-capitalize rounded-pill">
                <v-icon>mdi-plus</v-icon>
                Add Another Field
              </v-btn>
            </div>
          </div>
          <div class="d-flex justify-center align-center mx-auto mt-5 ">
            <v-btn :disabled="checkValue()" depressed min-width="200" color="#B1B0B5" class="white--text rounded-pill text-capitalize">Apply</v-btn>
          </div>
        </div>

      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import CTRFormInput from "@/components/CTRFormInput";

export default {
  name: "CTRModal",
  components: {CTRFormInput},
  data() {
    return {
      formData: [
        {
          value: '',
          disabled: false,
          error: "",
          id: 1,
          blur: true,
        },
        {
          value: '',
          disabled: true,
          error: "",
          id: 2,
          blur: true
        },
        {
          value: '',
          disabled: true,
          error: "",
          id: 3,
          blur: true,

        },
        {
          value: '',
          disabled: true,
          error: "",
          id: 4,
          blur: true,

        },
        {
          value: '',
          disabled: true,
          error: "",
          id: 5,
          blur: true,

        },
        {
          value: '',
          disabled: true,
          error: "",
          id: 6,
          blur: true,
        },

      ]
    }
  },
  computed: {
    total_percentage() {
      const diff = 100 - this.attributedValue
      return diff < 0 ? 0 : diff
    },
    attributedValue() {
      return this.formData
          .filter(item => !!item.value)
          .map(item => +item.value)
          .reduce((acc, curr) => curr + acc, 0)
    }
  },
  methods: {
    changeItem(val, item){
      item.blur = val
    },
    formatValue(num){
      let text;
      let displayText;
      text = num.toString().split(".")
      if(text[0].length > 1 && text[1]){
        displayText = text[0] + '.' + text[1].substring(0, 1)
      }else if(text[0].length <= 1  && text[1]) {
        displayText = text[0] + '.' + text[1].substring(0, 2)
      } else {
        displayText = text[0]
      }
      return displayText
    },
    closeModal() {
      this.$emit('closeModal')
    },
    setNextItemState(index, _state) {
      const nextItem = this.formData[index + 1]
      nextItem.disabled = _state
    },
    onFieldInput(value, index, item) {
      // resets error state, in case there was an error previously
      item.error = ""
      if (index !== 0) {
        const previousValue = this.formData[index - 1].value
        if (+value > +previousValue) {
          item.error = `Must be lower than Position ${index}`
          this.setNextItemState(index, !!item.error)
          return
        }
      }
    },
    updateForm(value, index, item) {
      item.value = value
      if (index !== this.formData.length - 1) {
        (this.attributedValue < 100 && !item.error) && this.setNextItemState(index, !value)
      }
    },
    addNewField() {
      const lastField = this.formData[this.formData.length - 1]
      if (lastField.value) {
        this.formData.push({
          value: "",
          disabled: false,
          error: "",
          id: lastField.id + 1,
          blur: true,

        })
      }
    },
    deleteItem(index) {
      this.$delete(this.formData, index)
    },
    checkValue() {
      return this.formData.some(field => {
          return field.value === '' || field.error
      })
    },
    populateForm(){
      const lastField = this.formData[this.formData.length - 1]
      if(lastField.value){
        this.formData.push({
          value: "",
          disabled: false,
          error: "",
          id: lastField.id + 1,
          blur: true,
        })
        const newField = this.formData[this.formData.length - 1]
        newField.value = this.total_percentage
        if(newField.value > lastField.value){
          newField.error = `Must be lower than Position ${this.formData.length - 1}`
        }

      }

    }

  }

}
</script>

<style scoped>
.card-Title {
  font-family: DM Sans !important;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #001343;
}

.sub-head {
  font-family: DM Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;

  color: #475661;
}

.remain {
  font-family: DM Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;

  color: #475661;
}
.color__card{
  background-color: #F4F5F5
}
.total__percentage{
  border-radius: 10px;
  background-color: white;
  width: 50px
}
</style>