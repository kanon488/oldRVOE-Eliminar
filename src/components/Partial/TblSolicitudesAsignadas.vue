<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
        <v-data-table
          :headers="headers"
          :items="areasAsignadas"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Áreas Asignadas</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:items="props">
            <td>{{ props.item.idsolicitudArea }}</td>
            <td>{{ props.item.idsolicitud }}</td>
            <td>{{ props.item.numsolicitud }}</td>
            <td>{{ props.item.idarea }}</td>
            <td>{{ props.item.abrevArea }}</td>
            <td>{{ props.item.rutaOficioAsignacion }}</td>
            <td>{{ props.item.modalidad }}</td>
            <td>{{ props.item.idestatusasignado }}</td>
            <td>{{ props.item.descripcionEstatus }}</td>
            <td>{{ props.item.fechaasignacion }}</td>
            <td>{{ props.item.fechalimiteopinion }}</td>
          </template>
          <template v-slot:item.opciones="props">
            <div class="d-flex flex-row">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                 v-bind="attrs"
                    v-on="on"
                class="mr-2"
                @click="ObtSolicitudAsignadaToEdit(props.item)"
              >
                mdi-pencil
              </v-icon>
              </template>
              <span>Editar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-if="props.item.rutaOficioAsignacion !== ''"
                     v-bind="attrs"
                    v-on="on"
                    small
                    @click="descagarOficioAsignado(props.item)"
                  >
                    mdi-file-document
                  </v-icon>
                </template>
                <span>Descargar Oficio</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="eliminar(props.item)"
                  >
                    mdi-cancel
                  </v-icon>
                </template>
                <span>Eliminar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    small
                    v-if="props.item.indOpinionReg === 'SI'"
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    @click="MostrarModalOpiniones(props.item)"
                  >
                    mdi-comment-eye
                  </v-icon>
                </template>
                <span>Opinión</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-col>
      <!-- Cinta de Opciones -->
      <v-row class="mt-5">
        <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12">
          <v-row class="d-flex justify-center">
            <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12">
              <transition name="fade">
                <template>
                  <div class="d-flex justify-end">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="#6a6a6a"
                          dark
                          right
                          fab
                          v-bind="attrs"
                          v-on="on"
                          class="mr-2"
                          @click="dialog = true"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <span class="text-h5">Asignar a Área</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="#6a6a6a"
                          v-bind="attrs"
                          v-on="on"
                          dark
                          right
                          fab
                        >
                          <v-icon>mdi-handshake-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Requerimiento de Acuerdo</span>
                    </v-tooltip>
                  </div>
                </template>
              </transition>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
    <!-- Dialogo de Agregar o Editar -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
          <v-form
            id="asignarAreaForm"
            ref="formAsignarArea"
            v-model="valid"
            lazy-validation
          >
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-file-input
                      label="Adjuntar documento pdf*:"
                      accept="application/pdf"
                      @change="fileChanged($event)"
                      :rules="archivoRules"
                      v-model="file"
                      filled
                      prepend-icon="mdi-paperclip"
                      required
                    ></v-file-input>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      item-text="abreviatura"
                      item-value="idAreaOpinion"
                      v-model="SolicitudAsignada.idarea"
                      :items="areasOp"
                      :rules="[(v) => !!v || 'Seleccione una opción']"
                      label="Área de Opinión*:"
                      outlined
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      item-text="descripcion"
                      item-value="idEdoAsignado"
                      v-model="SolicitudAsignada.idestatusasignado"
                      :items="estadosAsig"
                      :rules="[(v) => !!v || 'Seleccione una opción']"
                      label="Estado a Asignar*:"
                      outlined
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-row justify="center">
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="true"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="SolicitudAsignada.fechaAsignacion"
                            label="Fecha asignación"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            :rules="[(v) => !!v || 'Seleccione una opción']"
                            v-on="on"
                            required
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="fechaAsignadaSeleccionada"
                          locale="es-ES"
                          no-title
                          required
                          @change="cambioFechaAsignacion()"
                          @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-row justify="center">
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="SolicitudAsignada.fechalimiteopinion"
                            label="Fecha límite opinión*:"
                            prepend-icon="mdi-calendar"
                            readonly
                            :rules="[(v) => !!v || 'Seleccione una opción']"
                            v-bind="attrs"
                            v-on="on"
                            required
                          ></v-text-field>
                        </template>
                      </v-menu>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicador de campos requeridos</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey darken-2" text @click="close()">
                Cerrar
              </v-btn>
              <v-btn
                color="grey darken-2"
                :loading="asignarAreaLoader"
                :disabled="asignarAreaLoader"
                text
                @click="Guardar()"
                >GUARDAR
                <v-icon right dark> mdi-cloud-upload </v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Dialogo de Eliminar -->
    <v-row justify="center">
      <v-dialog v-model="dialogDelete" max-width="600px">
        <v-card>
          <v-card-title class="text-h5"
            >¿Estas seguro(a) de eliminar este elemento?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancelar</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >Aceptar</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
       <v-dialog persistent v-model="dialogOpiniones" max-width="600px">
         <v-card>
           <v-card-text>
             <TblOpinionesRegistradas v-bind:id="idSolicitudAsignada"/>
           </v-card-text>
           <v-card-actions>
              <v-btn
            color="green darken-1"
            text
            @click="dialogOpiniones = false"
          >
            Cerrar
          </v-btn>
             </v-card-actions>
         </v-card>
       </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import TblOpinionesRegistradas from "@/components/Partial/TblOpinionesRegistradas";
export default {
  props: ["id"],
  data() {
    return {
      valid: true,
      idSolicitud: this.id,
      idSolicitudAsignada: 0,
      dialog: false,
      dialogDelete: false,
      dialogOpiniones: false,
      headers: [
        {
          text: "Id",
          align: " d-none ",
          sortable: false,
          value: "idsolicitudArea",
        },
        {
          text: "Id Solicitud",
          align: " d-none ",
          sortable: false,
          value: "idsolicitud",
        },
        {
          text: "Num Solicitud",
          align: " d-none ",
          sortable: false,
          value: "numsolicitud",
        },
        {
          text: "id area",
          align: " d-none ",
          sortable: false,
          value: "idarea",
        },
        {
          text: "id estatus asignado",
          align: " d-none ",
          sortable: false,
          value: "idestatusasignado",
        },
        { text: "Área de Opinión", value: "abrevArea" },
        { text: "Oficio", value: "rutaOficioAsignacion" },
        { text: "Estatus", value: "descripcionEstatus" },
        { text: "Fecha de Registro", value: "fechaasignacion" },
        { text: "Fecha límite de Opinión", value: "fechalimiteopinion" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      SolicitudAsignada: {
        idsolicitudArea: 0,
        idsolicitud: this.id,
        numsolicitud: "",
        idarea: 0,
        idestatusasignado: 0,
        rutaOficioAsignacion: "",
        fechaAsignacion: "",
        fechalimiteopinion: "",
        OficioAsignado: [],
      },
      editSolicitudAsignada: {
        idsolicitudArea: 0,
        idsolicitud: "",
        numsolicitud: "",
        idarea: 0,
        idestatusasignado: 0,
        rutaOficioAsignacion: "",
        fechaAsignacion: "",
        fechalimiteopinion: "",
        OficioAsignado: [],
      },
      fechaAsignadaSeleccionada: "",
      areasAsignadas: [],
      file: [],
      archivoRules: [(file) => !!file || "El Archivo es requerido"],
      mostrarFormularioAsignacion: false,
      areasOp: [],
      estadosAsig: [],
      asignarAreaLoader: false,
      menu1: false,
      menu2: false,
      editedIndex: -1,
      idsolicitudAreaDelete: 0,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Asignacion" : "Editar Asignación";
    },
  },
  watch: {
    id(val) {
      this.idSolicitud = val;
      this.SolicitudAsignada.idSolicitud = val;
      this.ListarAreasAsignadas();
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    let me = this;
    me.ObtCtlgAreas();
    me.ObtCtlgEstadoOp();
  },
  methods: {
    validate() {
      let me = this;
      me.valid = this.$refs.formAsignarArea.validate();
    },
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
    ObtCtlgAreas() {
      let me = this;
      axios
        .get(`/api/AreasOpinion/Select`)
        .then((response) => {
          me.areasOp = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ObtCtlgEstadoOp() {
      let me = this;
      axios
        .get(`/api/EstadosAsignacion/Select`)
        .then((response) => {
          me.estadosAsig = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cambioFechaAsignacion() {
      let me = this;
      this.SolicitudAsignada.fechaAsignacion = me.fechaAsignadaSeleccionada;
      axios
        .get(
          `/api/Solicitudes/CalcularFechaOpinion/${this.SolicitudAsignada.fechaAsignacion}`
        )
        .then((response) => {
          this.SolicitudAsignada.fechalimiteopinion = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fileChanged(event) {
      let me = this;
      me.file = event;
      console.log("file in data: " + me.file);
    },
    EditarAsignacionArea() {
      let me = this;
      me.asignarAreaLoader;
      me.validate();
      if (me.valid) {
        const editFormData = new FormData();
        editFormData.append("idSolArea", me.SolicitudAsignada.idsolicitudArea);
        editFormData.append("idsolicitud", me.id);
        editFormData.append("idarea", me.SolicitudAsignada.idarea);
        editFormData.append(
          "rutaOficioAsignacion",
          me.SolicitudAsignada.rutaOficioAsignacion
        );
        editFormData.append(
          "idestatusasignado",
          me.SolicitudAsignada.idestatusasignado
        );
        editFormData.append(
          "fechaAsignacion",
          me.SolicitudAsignada.fechaAsignacion
        );
        editFormData.append(
          "fechalimiteopinion",
          me.SolicitudAsignada.fechalimiteopinion
        );
        editFormData.append("OficioAsignado", me.file);
        axios
          .put("/api/Solicitudes/EditarAsignacionArea", editFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            me.asignarAreaLoader = false;
            if (response.status === 200) {
              me.ListarAreasAsignadas();
              me.close();
              me.$toast.success(`Se actualizó la información exitosamente.`);
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
        me.$toast.warning(`Faltan campos por llenar.`);
      }
    },
    AsignarSolicitudArea() {
      let me = this;
      me.asignarAreaLoader = true;
      me.validate();
      if (me.valid) {
        const formData = new FormData();
        formData.append("idsolicitud", me.id);
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
            if (response.status === 200) {
              me.ListarAreasAsignadas();
              me.close();
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
        me.$toast.warning(`Faltan campos por llenar.`);
      }
    },
    Guardar() {
      let me = this;
      if (me.editedIndex === -1) {
        me.AsignarSolicitudArea();
      } else {
        me.EditarAsignacionArea();
      }
    },
    ObtSolicitudAsignadaToEdit(item) {
      let me = this;
      me.dialog = true;
      me.editedIndex = me.areasAsignadas.indexOf(item);
      me.SolicitudAsignada.idsolicitudArea = item.idsolicitudArea;
      // me.SolicitudAsignada.idsolicitudArea = 0;
      me.SolicitudAsignada.idsolicitud = item.idsolicitud;
      me.SolicitudAsignada.numsolicitud = item.numsolicitud;
      me.SolicitudAsignada.idarea = item.idarea;
      me.SolicitudAsignada.idestatusasignado = item.idestatusasignado;
      me.SolicitudAsignada.rutaOficioAsignacion = "";
      me.SolicitudAsignada.fechaAsignacion = item.fechaasignacion;
      me.SolicitudAsignada.fechalimiteopinion = item.fechalimiteopinion;
      me.SolicitudAsignada.OficioAsignado = me.file;
    },
    close() {
      let me = this;
      me.dialog = false;
      me.$nextTick(() => {
        me.SolicitudAsignada = Object.assign({}, me.editSolicitudAsignada);
        me.file = [];
        me.editedIndex = -1;
        console.log("close edit: " + me.editSolicitudAsignada);
      });
    },
    descagarOficioAsignado(item) {
      console.log(item.idsolicitudArea);
      axios
        .get(
          `/api/Solicitudes/DescargaOficioAsignacion/${item.idsolicitudArea}`,
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response);
          let link = document.createElement("a");
          // var binaryData = [];
          // binaryData.push(response.data);
          // link.href = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}))
          let fileURL = window.URL.createObjectURL(new Blob([response.data]));
          link.href = fileURL;
          const d = new Date();
          const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
            d
          );
          const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
            d
          );
          const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
            d
          );

          // link.download =
          let nombrePdf =
            "Oficioasignado_" +
            item.numsolicitud +
            "_" +
            item.idarea +
            "_" +
            item.idestatusasignado +
            "_" +
            da +
            "" +
            mo +
            "" +
            ye +
            ".pdf";
          link.setAttribute("download", nombrePdf);
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    eliminar(item) {
      let me = this;
      me.dialogDelete = true;
      me.idsolicitudAreaDelete = item.idsolicitudArea;
      console.log(me.idsolicitudAreaDelete);
    },
    closeDelete() {
      let me = this;
      me.dialogDelete = false;
      me.idsolicitudAreaDelete = 0;
    },
    deleteItemConfirm() {
      let me = this;
      axios
        .put(
          `/api/Solicitudes/EliminarSolicitudAsignada/${me.idsolicitudAreaDelete}`
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            me.ListarAreasAsignadas();
            me.dialogDelete = false;
            me.$toast.success(`Se eliminó el registro seleccionado.`);
          }
        })
        .catch((err) => {
          console.log(err);
          me.$toast.warning(`Ocurrio un error inesperado, intente nuevamente.`);
        });
    },
    MostrarModalOpiniones(item) {
      let me = this;
      me.dialogOpiniones = true;
      me.idSolicitudAsignada = item.idsolicitudArea;
    },
  },
  components: {
    TblOpinionesRegistradas,
  },
};
</script>