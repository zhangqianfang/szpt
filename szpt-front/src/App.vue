<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <IndexPage></IndexPage>
    <router-view/>
  </div>
</template>

<script>
  import IndexPage from './components/IndexPage'
export default {
  name: 'App',
  components:{
    IndexPage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
}
</style>
