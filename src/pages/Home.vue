<template>
  <div id="container">
  <header>
    <img src="/img/logo.png" width="35">
  </header>
    <div id="overlay">
      <div id="loginWrapper">
        <img src="/img/logo.png" id="logo">
        <div class="inputWrapper"><input class="input_cell" v-model="login" placeholder="Login"></div>
        <div class="inputWrapper"><input class="input_cell" v-model="passw" placeholder="Password"></div>
        <div id="button" v-on:click="signIn()">Sign In</div>
      </div>
    </div>
    <img id="background" src="/img/bg1.png">

  </div>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import router from 'vue-router'

  Vue.use(VueResource);
  Vue.use(router);

  const siema = "siema";

  export default {
      data () {
          return {
              login: "",
              passw: "",
              signIn: function () {
                  console.log(this.login);
                  console.log(this.passw);

                  this.$http.post('http://192.168.43.65:8082/auth',[], {password: this.passw, login: this.login}).then(response => {
                      this.someData = response.body;
                      window.open("/about","_self")

                  }, response => {
                      window.open("/about","_self")
                  });
              }
          }
      }
  }
</script>

<style>

  #container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  header {
    position: absolute;
    top:0;
    left:0;
    right:0;
    padding:5px 20px;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 10;
  }

  #overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
  }

  #loginWrapper {
    width: 400px;
    margin: 50px auto;
    z-index: 10;
    text-align: center;
  }

  #background {
    position: absolute;
    top: 48px;
    left: 0;
    width: 100vw;
    z-index: 1;
  }

  .input_cell {
    background-color: rgba(255,255,255, 0.7);
    padding: 10px 15px;
    width: 250px;
    box-shadow: 2px 3px 1px #AAA;
  }

  #logo {
    margin: 40px 20px;
    width: 140px;
  }

  #button {
    background-color: #dbd512;
    padding: 20px;
    font-size: larger;
    font-weight: bold;
    font-family: 'Raleway', sans-serif;
    width: 100px;
    margin: 40px auto;
  }

  .inputWrapper {
    margin: 20px;
  }
</style>
