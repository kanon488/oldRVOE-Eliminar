<template>
    <v-card class="cardDetalleSolicitud">
        <v-row>
            <v-col class="d-flex align-content-start" cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                <label class="lblDetalle">No. Solicitud: </label> <small class="infoDetalle"> {{ detalleSolicitud.numSolicitud }}</small>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex align-content-start" cols="6" xl="6" lg="6" md="6" sm="12" xs="12">
                <label class="lblDetalle">Solicitante: </label> <small class="infoDetalle"> {{ detalleSolicitud.solicitante }}</small>
            </v-col>
            <v-col class="d-flex align-content-start" cols="6" xl="6" lg="6" md="6" sm="12" xs="12">
                <label class="lblDetalle">Tipo Persona: </label> <small class="infoDetalle"> {{ detalleSolicitud.tipoPersona }}</small>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex align-content-start" cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                <label class="lblDetalle">Representante Legal: </label> <small class="infoDetalle"> {{ detalleSolicitud.representanteLegal }}</small>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex align-content-start" cols="4" xl="4" lg="4" md="4" sm="12" xs="12">
                <label class="lblDetalle">Tipo Educativo: </label> <small class="infoDetalle">{{ detalleSolicitud.tipoEducativo }}</small>
            </v-col>
            <v-col class="d-flex align-content-start" cols="4" xl="4" lg="4" md="4" sm="12" xs="12">
                <label class="lblDetalle">Nivel Educativo: </label> <small class="infoDetalle"> {{ detalleSolicitud.nivelEducativo }}</small>
            </v-col>
            <v-col class="d-flex align-content-start" cols="4" xl="4" lg="4" md="4" sm="12" xs="12">
                <label class="lblDetalle">Modalidad: </label> <small class="infoDetalle"> {{ detalleSolicitud.modalidad }}</small>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex align-content-start" cols="6" xl="6" lg="6" md="6" sm="12" xs="12">
                <label class="lblDetalle">Plan de Estudios: </label> <small class="infoDetalle"> {{ detalleSolicitud.planDeEstudios }}</small>
            </v-col>
            <v-col class="d-flex align-content-start" cols="6" xl="6" lg="6" md="6" sm="12" xs="12">
                <label class="lblDetalle">Opinión Educativa: </label> <small class="infoDetalle"> {{ detalleSolicitud.opcionEducativa }}</small>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex align-content-start" cols="6" xl="6" lg="6" md="6" sm="12" xs="12">
                <label class="lblDetalle">Turno: </label> <small class="infoDetalle"> {{ detalleSolicitud.turno }}</small>
            </v-col>
            <v-col class="d-flex align-content-start" cols="6" xl="6" lg="6" md="6" sm="12" xs="12">
                <label class="lblDetalle">Fecha de Solicitud: </label> <small class="infoDetalle"> {{ detalleSolicitud.fechaSolicitud }}</small>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import axios from "axios";

export default {
props: ["id"],
  data() {
    return {
        detalleSolicitud: {
        idSolicitud: "",
        fechaSolicitud: "",
        numSolicitud: "",
        solicitante: "",
        representanteLegal: "",
        tipoPersona: "",
        tipoEducativo: "",
        nivelEducativo: "",
        modalidad: "",
        planDeEstudios: "",
        turno: "",
        datosdelInmueble: "",
        localidad: "",
        municipio: "",
        estado: "",
        telefono:"",
        email: "",
        personasAuthorizadas: "",
        domicilioRecibieNotificaciones:"",
        opcionEducativa: ""
      }
    };
  },
   watch: {
    id(val) {
      let me = this;
      me.detalleSolicitud.idSolicitud = val;
      me.ObtInfoSolicitud();
    },
  },
  methods:{
      ObtInfoSolicitud(){
        let me = this;
        let idSol = me.detalleSolicitud.idSolicitud;
        axios.get(`/api/Solicitudes/DetalleSolicitud/${idSol}`).then((response) =>{
        console.log(response);
        me.detalleSolicitud  = response.data;
        
      }).catch((err) =>{
        console.log(err);
      });
      }
  }
};
</script>

<style>
.cardDetalleSolicitud {
    background-color: #f8f8f8 !important;
    color: #6a6a6a !important;
    border-block-color: #4b515d !important;
}
.cardDetalleSolicitud > .row{
    margin-left: 10px;
}
.lblDetalle {
  color: #979797;
  font-weight: bold;
}
small.infoDetalle {
  margin-top: 0.2rem;
  font-weight: bold;
}
</style>