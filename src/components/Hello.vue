<template>
  <div class="hello">

    <h1> Tophairwigs & Barerslook </h1>

    <router-link class="top-menu" to="/orders">Orders</router-link>
    <!-- <router-link class="top-menu" to="/brands">Brands</router-link> -->
    <router-link class="top-menu" to="/products">Product List</router-link>
    <router-link class="top-menu" to="/find">Find Items</router-link>
    <router-link class="top-menu" to="/search">Search</router-link>
    <router-link class="top-menu" to="/create">Create</router-link>
    <router-link class="top-menu" to="/prds">Product Table</router-link>
    <router-link class="top-menu" to="/doc">Document</router-link>
    <router-link class="top-menu" to="/social"> Social </router-link>
    <router-link class="top-menu" to="/diag"> Diag </router-link>
    
    <div class="proposal">
      <h2> Proposal </h2>
      <p> Instagram Integration </p>
      <p> Connect Link to actual product</p>
      <p> Connect Link to actual product</p>


      <h2> Progress </h2>
      <p> Product Image process </p>
      <p> Color module </p>
      <p> Length modeul </p>
      <p> Decision making module (statistics model) </p>

      <ul>
        <li>http://harlem125.com</li>
      </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  
  color: #35495E;
  text-decoration: none;
}
.top-menu{
  font-weight: bold;
  padding: 8px;
}

.hello{
  padding-top: 12px;
}

.proposal{
  text-align: left;
  padding: 10px;
  width:100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
</style>
