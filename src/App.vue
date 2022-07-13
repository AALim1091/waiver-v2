<template>
    <div id = "app">
      <!--<WaiverForm />-->
    </div>
  <nav>
    <router-link to="/WaiverForm">Waiver Form </router-link> |
    <router-link to="/waiverList">Waiver List (Admin Portal)</router-link>
  </nav>
  <router-view/>
</template>
<!-- Comment-->>

<script>
//import WaiverForm from './components/WaiverForm.vue'

export default 
{
  name: "App",
  components:
  {
    //WaiverForm
  }
};
</script>

<!--
Create -> POST
Read -> GET ALL waivers ***(DONE) ***
Read by ID -> GET {id}
Update -> PUT
Delete -> DELETE
-->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top:60px;
}

body {
  margin: 0;
  background: #eee;
  
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
