<template>
  <div>
    <v-dialog
        v-bind="{ ...$props, ...$attrs }"
        v-on="$listeners"
        max-width="600"
        transition="scale-transition"
        origin="center center"
        persistent>
      <v-card class="pa-8" style="border-radius: 8px;" elevation="0" >
        <div class="d-flex justify-space-between mb-5">
          <div>
            <h4 class="card-Title mb-n2">
              Customer CTR Values
            </h4>
            <span class="sub-head">The sum of all positions must be 100%</span>
          </div>
            <v-btn
                text
                @click="closeModal">
              <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
        <div>
          <div style="background-color: #F4F5F5" class="py-4 rounded">
            <div class="px-8 d-flex justify-space-between">
              <div>
                <span class="remain">UNATTRIBUTED VALUE REMAINING</span>
              </div>
              <div class="d-flex">
                <div style="border-radius: 10px; background-color: white; width: 50px" class="text-center mx-auto mr-2">
                  <span class="remain">{{total_percentage}}</span>
                </div>
                <div>
                  <span class="remain">%</span>
                </div>
              </div>
            </div>
            <v-divider class="mt-3 mb-5"/>
            <div class="px-3" v-for="(item, index) in formData" :key="index">
              <CTRFormInput @value="updateForm($event, index, item)" :title="item.title" :disabled="item.disabled"/>
            </div>
            <div class="px-3 mt-5">
              <v-btn depressed color="white" block class="text-capitalize rounded-pill">
                <v-icon>mdi-plus</v-icon>
                Add Another Field
              </v-btn>
            </div>
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
  data(){
    return{
      formData: [
        {
          title: 'Position 1',
          value:'',
          disabled: false,
        },
        {
          title: 'Position 2',
          value:'',
          disabled: true,
        },
        {
          title: 'Position 3',
          value:'',
          disabled: true,

        },
        {
          title: 'Position 4',
          value:'',
          disabled: true,

        },
        {
          title: 'Position 5',
          value:'',
          disabled: true,

        },
        {
          title: 'Position 6',
          value:'',
          disabled: true,

        },

      ]
    }
  },
  computed: {
    total_percentage() {
      const diff = 100 - this.formData
          .filter(item => !!item.value)
          .map(item => +item.value)
          .reduce((acc, curr) => curr + acc, 0)
      return diff < 0 ? 0 : diff
    }
  },
  methods:{
    closeModal(){
      this.$emit('closeModal')
    },
    updateForm(value, index, item){
      const itemFromArray = this.formData.find(_item => _item.title === item.title)
      itemFromArray.value = value
      if (index !== this.formData.length - 1) {
        const nextItemTitle = this.formData[index + 1].title
        const nextItem = this.formData.find(_item => _item.title === nextItemTitle)
        nextItem.disabled = !value
      }
    }
  }

}
</script>

<style scoped>
.card-Title{
  font-family: DM Sans !important;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: #001343;
}
.sub-head{
  font-family: DM Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;

  color: #475661;
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