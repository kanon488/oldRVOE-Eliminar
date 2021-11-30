<template>
    <div v-if="loading" class="loader">
      <div class="loader-wheel"></div>
      <div class="loader-text"></div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            loading: false
        };
    },
    methods:{
        mostrarCargando(){
            this.loading = true;
        },
        ocultarCargando(){
            this.loading = false;
        }
    }
}
</script>


<style>
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

</style>