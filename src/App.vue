<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
  border: 1px solid #9CABB5;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: none !important;

  &:before {
    display: none;
  }
}

.v-input--is-focused .v-input__slot {
  border: 1px solid #008EEF !important;
}

.v-input--is-disabled.v-text-field--solo .v-input__slot {
  background: #F7F9FC !important;
  border: 1px solid #D0DCE4 !important;
  box-sizing: border-box !important;
  border-radius: 6px !important;
}
</style>