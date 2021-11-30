import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null
  },
  mutations: {
    setToken(state,token){
      state.token = token
    },
    setUsuario(state,tokenDecode){
      if(tokenDecode !== null){
        const { nombre } = tokenDecode;
        state.usuario = nombre;
        localStorage.setItem("RVOEUser",nombre);
      }
      else{
        state.usuario = null;
      }
    }
  },
  actions: {
    guardarToken({commit},token){
      commit("setToken",token)
        commit("setUsuario", decode(token))
        console.log(this.state.usuario);
        localStorage.setItem("tokenRVOE",token)
    },
    salir({commit}){
      commit("setToken",null)
      commit("setUsuario", null)
      localStorage.removeItem("tokenRVOE")
      localStorage.removeItem("RVOEUser")
      router.push({ name: 'login'})
    }
  },
  modules: {
  }
})
