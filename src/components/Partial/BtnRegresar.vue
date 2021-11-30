<template>
  <v-btn rounded color="primary" dark small @click="regresar">
    <v-icon left>
      mdi-arrow-left-circle
    </v-icon>
    Regresar
  </v-btn>
</template>


<script>
export default {
  methods: {
    regresar() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style></style>