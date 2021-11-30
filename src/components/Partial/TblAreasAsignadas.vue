<template>
  
    <v-data-table
      :footer-props="{
        'items-per-page-options': [5, 10, 25, 50, 100, -1],
      }"
      :options="options"
      :headers="headers"
      :items="areasAsignadas"
    >
    </v-data-table>
  
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      idSolicitud: this.id,
      headers: [
        { text: "Área de Opinión", value: "abrevArea" },
        { text: "Oficio", value: "rutaOficioAsignacion" },
        { text: "Estatus", value: "descripcionEstatus" },
        { text: "Fecha de Registro", value: "fechaasignacion" },
        { text: "Fecha límite de Opinión", value: "fechalimiteopinion" },
      ],
      areasAsignadas: [],
      options: {
        itemsPerPage: 5,
      },
    };
  },
  mounted() {
  },
  watch: {
    id(val) {
      this.idSolicitud = val;
      this.ListarAreasAsignadas();
    },
  },
  methods: {
    ListarAreasAsignadas() {
      axios
        .get(`/api/Solicitudes/ListarAreasAsignadas/${this.idSolicitud}`)
        .then((response) => {
          console.log(response);
          this.areasAsignadas = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
thead.v-data-table-header > tr > th {
    color: #ffff !important;
}
</style>