<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
      <v-data-table
        :headers="headers"
        :items="OpinionesRegistradas"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Opiniones Registradas</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:items="props">
            <td>{{ props.item.idOpinion }}</td>
            <td>{{ props.item.idSolicitudArea }}</td>
            <td>{{ props.item.idEdoOpinion }}</td>
            <td>{{ props.item.edoOpDescripcion }}</td>
            <td>{{ props.item.rutaOficioNotificacion }}</td>
            <td>{{ props.item.rutaOficioSemsys }}</td>
            <td>{{ props.item.fechaRegistro }}</td>
          </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>


<script>
import axios from 'axios';

export default {
  props: ["id"],
  data: () => {
    return {
      idSolicitudAsignada: 0,
      headers: [
         {
          text: "Id Op",
          align: " d-none ",
          sortable: false,
          value: "idOpinion",
        },
        {
          text: "Id Solicitud Area",
          align: " d-none ",
          sortable: false,
          value: "idSolicitudArea",
        },
        {
          text: "IdEdoOpinion",
          align: " d-none ",
          sortable: false,
          value: "idEdoOpinion",
        },
        {
          text: "Estado Opinión",
          sortable: true,
          value: "edoOpDescripcion",
        },
        {
          text: "Fecha de Registro",
          sortable: true,
          value: "fechaRegistro",
        },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      OpinionesRegistradas: [],
    };
  },
  watch: {
    id(val) {
      console.log(val);
      this.idSolicitudAsignada = val;
    },
  },
  methods:{
    ListarOpiniones(){
      console.log("tbl opiniones");
     this.idSolicitudAsignada =  this.$props.id; 
        axios
        .get(`/api/Opiniones/Listar/${this.idSolicitudAsignada}`)
        .then((response) => {
          console.log(response);
          this.OpinionesRegistradas = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted(){
     this.ListarOpiniones();
  }
};
</script>