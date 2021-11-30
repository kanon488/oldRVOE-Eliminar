<template>
  <v-app>
    <Loading ref="loading" />
    <v-container fluid class="fill-heigth">
      <v-row>
        <h3 class="numSolicitud">Asignación de Áreas de Opinión</h3>
      </v-row>
      <v-row class="d-flex justify-center mb-6">
        <v-col cols="12" xl="12" lg="12" md="12" sm="10" xs="10">
          <CardInfoSolicitud v-bind:id="idSolicitud" />
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center dvAreasAsignadas">
        <v-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
          sm="10"
          xs="10"
        >
          <TblSolicitudesAsignadas v-bind:id="idSolicitud" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Loading from "@/components/Partial/Loading.vue";
import CardInfoSolicitud from "@/components/Partial/CardInfoSolicitud";
import TblSolicitudesAsignadas from "@/components/Partial/TblSolicitudesAsignadas";
import axios from "axios";

export default {
  data() {
    return {
      idSolicitud: 0,
      // SolicitudAsignada: {
      //   idsolicitud: 0,
      //   numsolicitud: "",
      //   idarea: 0,
      //   idestatusasignado: 0,
      //   rutaOficioAsignacion: "",
      //   fechaAsignacion: moment().format("YYYY-MM-DD"),
      //   fechalimiteopinion: "",
      //   OficioAsignado: [],
      // },
      // file: [],
      // archivoRules: [(file) => !!file || "El Archivo es requerido"],
      // mostrarFormularioAsignacion: false,
      // areasOp: [],
      // estadosAsig: [],
      // asignarAreaLoader: false,
      idAreaSelect: "",
      idEdoAsignadoSelect: "",
      fecLimOpinion: "",
    };
  },
  mounted() {
    let me = this;
    me.ObtIdSolicitudFromRoute();
  },
  methods: {
    validate() {
      let me = this;
      me.valid = this.$refs.formAsignarArea.validate();
    },
    ObtIdSolicitudFromRoute() {
      this.idSolicitud = this.$route.params.id;
    },
    AsignarSolicitudArea() {
      let me = this;
      console.log("btn Asignar");
      console.log(me.file);
      me.asignarAreaLoader = true;
      me.validate();
      if (me.valid) {
        const formData = new FormData();
        formData.append("idsolicitud", me.SolicitudAsignada.idsolicitud);
        formData.append("idarea", me.SolicitudAsignada.idarea);
        formData.append(
          "rutaOficioAsignacion",
          me.SolicitudAsignada.rutaOficioAsignacion
        );
        formData.append(
          "idestatusasignado",
          me.SolicitudAsignada.idestatusasignado
        );
        formData.append(
          "fechaAsignacion",
          me.SolicitudAsignada.fechaAsignacion
        );
        formData.append(
          "fechalimiteopinion",
          me.SolicitudAsignada.fechalimiteopinion
        );
        formData.append("OficioAsignado", me.file);
        axios
          .post("/api/Solicitudes/AsignaraArea", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            me.asignarAreaLoader = false;
            if (response.status == 200) {
              me.$toast.success(`Se asigno la solicitud al área seleccionada.`);
            } else {
              me.$toast.error(
                `Ocurrio un error, intente nuevamente o contacte con el equipo de soporte.`
              );
            }
          })
          .catch((err) => {
            console.log(err);
            me.asignarAreaLoader = false;
          });
      } else {
        alert("Faltan campos por llenar.");
      }
    },
    mostrarCargando() {
      this.$refs.loading.mostrarCargando();
    },
    ocultarCargando() {
      this.$refs.loading.ocultarCargando();
    }
  },
  components: {
    CardInfoSolicitud,
    Loading,
    TblSolicitudesAsignadas
  },
};
</script>
<style>
.v-progress-circular {
  margin: 1rem;
}
.dvAreasAsignadas{
  margin-top: 5rem !important;
}
</style>