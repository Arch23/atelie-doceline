<template>
  <v-container fill-height>
    <v-row align="center"
        justify="center">
        <v-col cols="12" sm="4">
          <v-img class="logo-full" alt="Ateliê Doceline logo" src="../resources/img/logo.png" />
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.logo-full {
  width: 100%;
  height: 100%;
}
</style>
