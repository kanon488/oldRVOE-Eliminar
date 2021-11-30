<template>
    <v-app id="inspire">
    <v-navigation-drawer
    class="blue-grey lighten-5"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
    >
      <v-list dense>
        <template>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                BIENVENIDO:<br>
                <p class="mt-3">Sandra Adams</p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'AdminPanel' }">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-title> Inicio </v-list-item-title>
          </v-list-item>
        </template>
        <template>
          <v-list-group >
            <v-list-item slot="activator">
              <v-list-item-action>
              <v-icon>mdi-file-document-multiple-outline </v-icon>
            </v-list-item-action>
            <v-list-item-title> Solicitudes </v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'AdminSolicitudes' }">
              <v-list-item-action>
                <v-icon>mdi-text-box-search-outline </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                 Listar Solicitudes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'AdminSolventacion' }">
              <v-list-item-action>
                <v-icon>mdi-paperclip</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                 Solventacion
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'AdminSolicitudAcuerdo' }">
              <v-list-item-action>
                <v-icon>mdi-handshake-outline </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                 Solicitud de Acuerdo
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>            
          </v-list-group>
        </template>
        <template>
          <v-list-group >
            <v-list-item slot="activator">
              <v-list-item-action>
                <v-icon>mdi-account-group </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'AdminUsuarios' }">
              <v-list-item-action>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                 Listar Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>           
          </v-list-group>
        </template>
        <template>
          <v-list-group >
            <v-list-item slot="activator">
              <v-list-item-action>
                <v-icon>mdi-certificate</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  RVOES
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'AdminRVOES' }">
              <v-list-item-action>
                <v-icon>mdi-file-certificate</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  RVOES Otorgados
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>           
          </v-list-group>
        </template>
        <template>
          <v-list-item :to="{ name: 'Login' }">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-title> Salir </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      app
      class="bg-dark"  
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link tag="span" class="hidden-sm-and-down text-white" to="/AdminPanel"
          >Plataforma RVOE 2021</router-link
        >
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid fill-height>
        <v-row class="fill-height d-flex justify-center">
          <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12" class="fill-height">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template> 

<script>
export default ({
    data() {
        return {
            drawer: false,
            group: null,
            name: "inspire",
        };
    },
    methods:{

    }
})
</script>
<style>

@media all and (max-width: 1024px) and (min-width: 700px) {
  .v-main {
   padding-left: 80px !important;
  }
}
</style>