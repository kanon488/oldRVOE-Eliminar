<template>
  <v-app>
    <v-main>
      <div class="container-fluid">
        <div class="row bg-dark">
          <div class="col-12">
            <div class="row" style="box-shadow: inset 0 0 1em #616161">
              <div class="col-10 offset-1">
                <img
                  src="@/assets/Images/logos_pleca_beige.png"
                  class="dvBannerLogin img-fluid rounded mx-auto d-block"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div v-show="loading" id="loader" class="loader">
            <div class="loader-wheel"></div>
            <div class="loader-text"></div>
          </div>
        </div>
      </div>
      <div class="container-fluid mt-5 pb-5">
        <div class="row">
          <div class="col-10 offset-1">
            <div class="row mt-5">
              <div
                class="col-xl-4 col-lg-4 offset-lg-1 col-md-4 col-10 offset-1"
              >
                <img
                  src="@/assets/Images/logo_entrada_new.png"
                  style="margin-top: 0px"
                  width="400"
                  class="img-fluid"
                />
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12 pt-1">
                <div class="row text-justify text-white">
                  <h4 class="objetivo">
                    <p>
                      Con el objetivo de ofrecer un mejor seguimiento al estatus
                      en que se encuentra el registro de RVOE para los planes de
                      estudios de los particulares, la Secretaría de Educación
                      de Veracruz impulsa, a través de la Subsecretaria de
                      Educación Media Superior y Superior, el Proyecto
                      <b>"Consulta el estatus de tu RVOE"</b>.
                    </p>
                  </h4>
                </div>

                <div class="row">
                  <div
                    class="
                      col-lg-10
                      offset-lg-1
                      col-md-10
                      offset-md-1
                      col-12
                      mt-4
                    "
                  >
                    <div class="row loginBox d-flex justify-content-center">
                      <v-card-text>
                        <label><h3>Acceso al Sistema</h3></label>
                        <v-text-field
                          color="white"
                          v-model="NombreUsuario"
                          :rules="usuarioRules"
                          label="Cuenta de Usuario"
                          clearable
                          solo
                          required
                        ></v-text-field>
                        <v-text-field
                          color="white"
                          v-model="PasswordUsuario"
                          :rules="passwordRules"
                          :append-icon="showPasword ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="showPasword = !showPasword"
                          :type="showPasword ? 'text' : 'password'"
                          label="Contraseña"
                          clearable
                          solo
                          required
                        ></v-text-field>
                        <v-row class="d-flex justify-content-center">
                          <div class="col-xl-12 col-lg-8 col-md-8 col-10 pb-1">
                            <v-btn
                              @click="btnIngresarClick"
                              outlined
                              color="white"
                              class="gray accent-3"
                            >
                              Ingresar
                            </v-btn>
                          </div>
                        </v-row>
                      </v-card-text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer style="margin-top: 5%;">
    <v-row class="bg-dark pt-5">
      <v-col cols="12" xs="10" offset-xs="1">
        <v-row>
          <v-col class="text-center text-white" cols="12" lg="12" md="12" sm="12" xs="12">
            <p class="pt-4 pl-4 pr-4 footer-div font-weight-bold">
              Subsecretaría de Educación Media Superior y Superior
            </p>
            <p class="text-center pl-4 pr-4 footer-div m-0">
              Carr. Fed. Xalapa-Veracruz Km. 4.5 <br />
              Colonia SAHOP, C.P. 91190 <br />
              Xalapa-Enríquez, Veracruz, México.
            </p>
            <p class="text-center pl-4 pr-4 pt-0 footer-div m-0">
              Teléfono:<br />(228) 9800540
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </footer>
    </v-main>
  </v-app>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      showPasword: false,
      loading: false,
      valid: false,
      NombreUsuario: "",
      PasswordUsuario: "",
      usuarioRules: [
        (u) => !!u || "El campo Usuario es requerido",
        (u) => u.length <= 10 || "El Usuario debe tener almenos 8 carácteres.",
      ],
      passwordRules: [
        (p) => !!p || "El Campo Contraseña es requerido",
        (p) =>
          p.length <= 10 || "La Contraseña debe tener almenos 8 carácteres.",
      ],
    };
  },
  methods: {
    btnIngresarClick() {
      let me = this;
      me.loading = true;
      axios
        .post("api/Login/Authenticar", {
          userName: me.NombreUsuario,
          password: me.PasswordUsuario,
        })
        .then((respuesta) => {
          return respuesta.data;
        })
        .then((data) => {
          me.loading = false;
          console.log(data);
          this.$store.dispatch("guardarToken", data.token);
          this.$router.push({ name: "AdminPanel" });
        })
        .catch((err) => {
          me.loading = false;
          console.log(err);
        });
    },
  },
};
</script>

<style>
.dvBannerLogin {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 40%;
}
.objetivo {
  font-size: 1rem;
  color: #000000;
  margin-right: 40px;
  margin-left: 40px;
}

.loginBox {
  background-color: #7b7c7c !important;
  border-radius: 10px;
}
#btnIngresar {
  height: 70px;
  width: 70px;
  background-color: white;
  border-radius: 37px;
}

.loader {
  /* width: 60px; */
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0.7;
  background-color: #fff;
  z-index: 99;
}

.loader-wheel {
  animation: spin 1s infinite linear;
  border: 2px solid rgba(158, 16, 16, 0.5);
  border-left: 4px solid rgb(190, 8, 8);
  border-radius: 50%;
  height: 50px;
  margin-bottom: 10px;
  width: 50px;
  position: absolute;
  top: 50%;
  left: 48%;
  z-index: 100;
}

.loader-text {
  margin-top: 20%;
  color: rgb(173, 15, 15);
  font-family: arial, sans-serif;
}

.loader-text:after {
  content: "Loading...";
  animation: load 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes load {
  0% {
    content: "Loading";
  }

  33% {
    content: "Loading.";
  }

  67% {
    content: "Loading..";
  }

  100% {
    content: "Loading...";
  }
}

#footer {
  background-color: rgb(156, 64, 64);
}
</style>
