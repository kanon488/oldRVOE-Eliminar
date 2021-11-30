<template>
  <v-app>
    <Loading ref="loading" />
    <v-container fluid class="fill-heigth">
      <v-row class="d-flex justify-center">
        <v-col cols="12" xl="10" lg="12" md="12" sm="12" xs="12">
          <v-card>
            <v-card-title>
              Solicitudes
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="mdi-search"
                label="Buscar"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :footer-props="{
                'items-per-page-options': [5, 10, 25, 50, 100, -1],
              }"
              :options="options"
              v-model="selected"
              :headers="headers"
              :items="solicitudes"
              item-key="idSolicitud"
              @click:row="rowClick"
            >
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12">
          <transition name="fade">
            <template v-if="showOpciones">
              <v-bottom-navigation class="blue-grey lighten-4" horizontal>
                <v-btn  :to="{ name: 'DetalleSolicitud',params: {id: selected[0].idSolicitud } }">
                  <span>Detalle</span>
                  <v-icon>mdi-text-box-search</v-icon>
                </v-btn>
                <v-btn :to="{ name: 'AsignarArea', params: { id: selected[0].idSolicitud } }">
                  <span>Asignar</span>
                  <v-icon>mdi-file-move</v-icon>
                </v-btn>
              </v-bottom-navigation>
            </template>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Loading from "@/components/Partial/Loading.vue";
import axios from "axios";

export default {
  data() {
    return {
      showOpciones: false,
      selected: [],
      search: "",
      headers: [
        {
          text: "IdSolicitud",
          value: "idSolicitud",
          align: " d-none ",
          sortable: false,
        },
        { text: "Solicitud", value: "numSolicitud" },
        { text: "Solicitante", value: "idSolicitante" },
        { text: "Inst. Educativa", value: "nombreInstEducativa" },
        {
          text: "IdNivel",
          value: "nivel",
          align: " d-none ",
          sortable: false,
        },
        { text: "Nivel", value: "nivelDescripcion" },
        { text: "Plan o Programa", value: "planyPrograma" },
        { text: "Estatus", value: "estatus" },
        { text: "Fecha", value: "fechaSolicitud" },
      ],
      solicitudes: [],
      options: {
        itemsPerPage: 5,
      },
    };
  },
  mounted() {
    this.listarSolicitudes();
  },
  methods: {
    mostrarCargando() {
      this.$refs.loading.mostrarCargando();
    },
    ocultarCargando() {
      this.$refs.loading.ocultarCargando();
    },
    listarSolicitudes() {
      let me = this;
      me.mostrarCargando();
      axios
        .get("api/Solicitudes/Listar")
        .then((response) => {
          console.log(response);
          me.solicitudes = response.data;
          me.ocultarCargando();
        })
        .catch((err) => {
          console.log(err);
          me.ocultarCargando();
        });
    },
    rowClick(item) {
      console.log(item.idSolicitud);
      if (this.selected.length > 0) {
        console.log(this.selected[0]);
        if (item.idSolicitud === this.selected[0].idSolicitud) {
          this.selected.pop(item);
          this.showOpciones = false;
        } else {
          this.selected = [];
          this.selected.push(item);
          this.showOpciones = true;
        }
      } else {
        this.selected.push(item);
        this.showOpciones = true;
      }
    },
  },
  components: {
    Loading,
  },
};
</script>

<style>
tr.v-data-table__selected {
  background: #fedfa7 !important;
}
thead.v-data-table-header {
  background: #6a6a6a !important;
}
thead.v-data-table-header > tr {
  color: #ffff !important;
}
.opciones {
  background-color: "#7b7c7c" !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style> 