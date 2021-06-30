<template>
  <div id="app">
    <Nav></Nav>
    <br>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
  import Nav from './Nav';
  import Foot from './Foot';

  export default {
    name: 'app',
    components: {
      'Nav': Nav,
      'Foot':Foot
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
  background-color: #d7dade;
  min-height: 100vh;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
