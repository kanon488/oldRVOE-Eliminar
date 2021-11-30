<template>
  <v-app>
    <Loading ref="loading" />
    <v-container fluid class="fill-heigth">
      <v-row>
        <h3 class="numSolicitud">Opiniones Registradas</h3>
      </v-row>
      <v-row class="d-flex justify-center mb-6">
        <v-col cols="12" xl="12" lg="12" md="12" sm="10" xs="10">
          <CardInfoSolicitud v-bind:id="idSolicitud" />
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center dvAreasAsignadas">
        <v-col cols="12" xl="12" lg="12" md="12" sm="10" xs="10"> </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script>
import Loading from "@/components/Partial/Loading.vue";
import CardInfoSolicitud from "@/components/Partial/CardInfoSolicitud";

export default {
  name: "AdminOpiniones",
  data: () => {
    return {
        idSolicitud: ""
    };
  },
  mounted() {
    let me = this;
    me.ObtIdSolicitudFromRoute();
  },
  methods: {
    ObtIdSolicitudFromRoute() {
      this.idSolicitud = this.$route.params.id;
    },
  },
  components: {
    CardInfoSolicitud,
    Loading,
  },
};
</script>