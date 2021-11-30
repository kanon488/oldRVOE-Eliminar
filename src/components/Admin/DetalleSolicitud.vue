<template>
  <v-app>
    <Loading ref="loading" />
    <v-container fluid class="fill-heigth">
      <v-row>
        <h3 class="numSolicitud">Solicitud - {{ detalleSolicitud.numSolicitud }}</h3>
      </v-row>
      <v-row>
        <v-col cols="12" xl="10" lg="12" md="12" sm="12" xs="12">
          <v-card>
            <section>
              <v-row>
                <v-col class="d-flex align-content-start seccionDetalle">
                  <h6>Información del particular</h6>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex align-content-start" cols="4" xl="4" lg="4" md="4">
                  <label class="lblDetalle">Solicitante: </label> <small class="infoDetalle"> {{ detalleSolicitud.solicitante }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Tipo Persona: </label> <small class="infoDetalle"> {{ detalleSolicitud.tipoPersona }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Representante Legal: </label> <small class="infoDetalle"> {{ detalleSolicitud.representanteLegal }}</small>
                </v-col>
              </v-row>
            </section>
            <section>
              <v-row>
                <v-col class="d-flex align-content-start seccionDetalle">
                  <h6>Información del programa educativo</h6>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Tipo Educativo: </label> <small class="infoDetalle"> {{ detalleSolicitud.tipoEducativo }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Nivel: </label> <small class="infoDetalle"> {{ detalleSolicitud.nivelEducativo }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Modalidad: </label> <small class="infoDetalle"> {{ detalleSolicitud.modalidad }}</small>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex align-content-start" cols="6">
                  <label class="lblDetalle">Plan de Estudios: </label> <small class="infoDetalle"> {{ detalleSolicitud.planDeEstudios }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="6">
                  <label class="lblDetalle">Turno: </label> <small class="infoDetalle"> {{ detalleSolicitud.turno }}</small>
                </v-col>
              </v-row>
            </section>
            <section>
              <v-row>
                <v-col class="d-flex align-content-start seccionDetalle">
                  <h6>Información del plantel</h6>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Datos de inmueble: </label> <small class="infoDetalle"> {{ detalleSolicitud.datosdelInmueble }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Localidad: </label> <small class="infoDetalle"> {{ detalleSolicitud.localidad }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Municipio: </label> <small class="infoDetalle"> {{ detalleSolicitud.municipio }}</small>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Estado: </label> <small class="infoDetalle"> {{ detalleSolicitud.estado }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Teléfono:  </label> <small class="infoDetalle"> {{ detalleSolicitud.telefono }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="4">
                  <label class="lblDetalle">Correo:  </label> <small class="infoDetalle"> {{ detalleSolicitud.email }}</small>
                </v-col>
              </v-row>
            </section>
            <section>
              <v-row>
                <v-col class="d-flex align-content-start seccionDetalle">
                  <h6>Información de contacto</h6>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex align-content-start" cols="6">
                  <label class="lblDetalle">Personas Authorizadas:  </label><small class="infoDetalle"> {{ detalleSolicitud.personasAuthorizadas }}</small>
                </v-col>
                <v-col class="d-flex align-content-start" cols="6">
                  <label class="lblDetalle"
                    >Domicilio para recibir notificaciones:   
                  </label> 
                  <small class="infoDetalle"> {{ detalleSolicitud.domicilioRecibieNotificaciones }}</small>
                </v-col>
              </v-row>
            </section>
            <section>
              <v-row>
                <v-col class="d-flex align-content-start seccionDetalle">
                  <h6>Áreas de Opinión Asignadas</h6>
                </v-col>
              </v-row>
              <v-row class="ml-4">
                <v-col class="d-flex align-content-center" cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                <TblAreasAsignadas v-bind:id="detalleSolicitud.idSolicitud" />
                </v-col>
              </v-row>
            </section>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Loading from "@/components/Partial/Loading.vue";
import TblAreasAsignadas from "@/components/Partial/TblAreasAsignadas";
import axios from "axios";


export default {
  data() {
    return {
      idSolicitud: 0,
      detalleSolicitud: {
        idSolicitud: "",
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
  mounted() {
    this.ObtIdSolicitudFromRoute();
  },
  methods: {
    ObtIdSolicitudFromRoute() {
      this.idSolicitud = this.$route.params.id;
      axios.get(`/api/Solicitudes/DetalleSolicitud/${this.idSolicitud}`).then((response) =>{
        console.log(response);
        this.detalleSolicitud  = response.data;
        
      }).catch((err) =>{
        console.log(err);
      });
    },
  },
  components: {
    Loading,
    TblAreasAsignadas
  },
};
</script>
<style>
.seccionDetalle {
  background-color: #616161 !important;
  color: white;
  margin-left: 10px;
  margin-right: 10px;
}
.lblDetalle {
  color: #979797;
  font-weight: bold;
}
h3.numSolicitud{
  color: #bdbdbd !important;
}
small.infoDetalle {
  margin-top: 0.2rem;
  font-weight: bold;
}
</style>